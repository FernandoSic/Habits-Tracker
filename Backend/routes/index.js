var express = require('express');
var router = express.Router();
//Importar el modelo de hábitos
const Habit = require('../models/Habit');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Ruta para obtener todos los hábitos
router.get('/habits', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  }
  catch (error) {
    res.status(500).json({ message: 'Error retrieving habits' });
  }
});

//Ruta para crear un hábito
router.post('/habits', async (req, res) => {
  try {
      // Crea un nuevo hábito con los datos enviados en el cuerpo de la solicitud
      const habit = new Habit(req.body);
      // Guarda el hábito en la base de datos
      await habit.save();
      // Responde con el hábito creado
      res.status(201).json(habit);
  } catch (error) {
      // Maneja errores y responde con un código de estado 400
      res.status(400).json({ message: 'Error creating habit', error: error.message });
  }
});
//Ruta para eliminar un hábito
router.delete('/habits/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) res.status(404).json({ message: 'Habit not found' });
    res.json({ message: 'Habit deleted successfully' });
  }
  catch (error) {
    res.status(500).json({ message: 'Error deleting habit' });
  }
});
//Ruta para actualizar un hábito
router.put('/habits/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate
    (req.params.id, req.body, { new: true });
    if (!habit) res.status(404).json({ message: 'Habit not found' });
    res.json(habit);
  }
  catch (error) {
    res.status(500).json({ message: 'Error updating habit' });
  }
}
);

router.patch('/habits/markasdone/:id', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    habit.lastDone = new Date();
    if (timeDifferenceInHours(habit.lastDone, habit.lastUpdate) < 24) {
      habit.days = timeDifferenceInDays(habit.lastDone, habit.startedAt);
      habit.lastUpdate = new Date();
      habit.save();
      res.status(200).json({'message': 'Habit marked as done'});
    }
    else {
      habit.days = 1;
      habit.lastUpdate = new Date();
      habit.save();
      res.status(200).json({'message': 'Habit restarted'});
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Habit not found'});
  }
}); //Ruta para marcar un hábito como hecho

const timeDifferenceInHours = (date1, date2) => {
  const differenceMs = Math.abs(date1 - date2);
  return differenceMs / (1000 * 60 * 60); // Convert milliseconds to hours
}; 

const timeDifferenceInDays = (date1, date2) => {
  const differenceMs = Math.abs(date1 - date2);
  return Math.floor(differenceMs / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
}

module.exports = router;
