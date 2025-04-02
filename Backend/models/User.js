const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}); // Esque,a de usuario, contraseña y fecha de creación
module.exports = mongoose.model('User', userSchema); // Exporta el modelo de usuario para poder usarlo en otras partes de la aplicación
