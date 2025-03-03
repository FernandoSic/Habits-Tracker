const mongoose = require('mongoose');

//Define a schema de los hábitos
const HabitSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//Exporta el modelo de hábitos
module.exports = mongoose.model('Habit', HabitSchema);