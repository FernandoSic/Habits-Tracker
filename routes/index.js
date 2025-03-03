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
    const habit = new Habit(req.body);
    await habit.save();
    res.json(habit);
  }
  catch (error) {
    res.status(400).json({ message: 'Error creating habit' });
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

module.exports = router;
