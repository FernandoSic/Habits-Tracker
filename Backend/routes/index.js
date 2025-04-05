var express = require('express');
var router = express.Router();
const Habit = require('../models/Habit');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }
  try {
    const tokenWithoutBearer = token.replace("Bearer ", "");
    const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = verified; // Almacena el usuario verificado en la solicitud
    next(); 
  }catch{
    console.error(error);
    res.status(403).json({ error: 'Token inválido o expirado.' });
  }
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Ruta para obtener todos los hábitos
router.get('/habits', authenticateToken, async (req, res) => {
  try {
    let userId = req.user && req.user.userId ? req.user.userId : res.status(500).json({ message: 'Error retrieving habits' });
    const habits = await Habit.find({'userId': new mongoose.Types.ObjectId(userId)});
    res.json(habits);
  }
  catch (error) {
    res.status(500).json({ message: 'Error retrieving habits' });
  }
});

//Ruta para crear un hábito
router.post('/habits', authenticateToken, async (req, res) => {
  try {
      const { title, description } = req.body;
      let userId = req.user && req.user.userId ? req.user.userId : res.status(500).json({ message: 'Error adding habit' });
      userId = new mongoose.Types.ObjectId(userId);
      const habit = new Habit({title, description, userId});
      await habit.save();
      res.json(habit);
  } catch (error) {
      // Maneja errores y responde con un código de estado 400
      res.status(400).json({ message: 'Error creating habit', error: error.message });
  }
});
//Ruta para eliminar un hábito
router.delete('/habits/:id', authenticateToken, async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) res.status(404).json({ message: 'Habit not found' });
    res.json({ message: 'Habit deleted successfully' });
  }
  catch (error) {
    res.status(500).json({ message: 'Error deleting habit' });
  }
});

router.patch('/habits/markasdone/:id', authenticateToken, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Verifica si ya se marcó como "done" en las últimas 24 horas
    if (timeDifferenceInHours(new Date(), habit.lastDone) < 24) {
      return res.status(200).json({ message: 'Habit already marked as done today' });
    }

    // Actualiza los campos del hábito
    habit.lastDone = new Date();

    if (timeDifferenceInHours(habit.lastDone, habit.lastUpdate) < 24) {
      habit.days = timeDifferenceInDays(habit.lastDone, habit.startedAt);
    } else {
      habit.days = 1; // Reinicia el contador si han pasado más de 24 horas
    }

    habit.lastUpdate = new Date();
    await habit.save();

    res.status(200).json({ message: 'Habit marked as done', days: habit.days });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error marking habit as done' });
  }
});

const timeDifferenceInDays = (date1, date2) => {
  const differenceMs = Math.abs(date1 - date2);
  return Math.floor(differenceMs / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
};

const timeDifferenceInHours = (date1, date2) => {
  const differenceMs = Math.abs(date1 - date2); // Diferencia en milisegundos
  return differenceMs / (1000 * 60 * 60); // Convertir milisegundos a horas
};

module.exports = router;
