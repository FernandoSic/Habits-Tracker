var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs'); // Importa la librería de bcrypt para encriptar contraseñas
const User = require('../models/User'); // Importa el modelo de usuario
const jwt = require('jsonwebtoken'); // Importa la librería de JSON Web Token

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async function (req, res, next) {
  try {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(10); // Genera una sal para encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, salt); // Encripta la contraseña con bcrypt

    const newUser = new User({ username, password: hashedPassword}); // Crea un nuevo usuario con el nombre de usuario y la contraseña encriptada
    await newUser.save();
    
    res.status(201).json({ message: 'Usuario registrado correctamente' }); 
  }catch(error){
    console.error(error); 
    res.status(500).json({error: "Error en el registro", "description":error.toString()}) // Devuelve un error 500 si ocurre un error al registrar el usuario
  }
});

router.post('/login', async function (req, res, next) {
  try {
    const {username, password} = req.body; 

    const user = await User.findOne({username}); 
    if (!user) return res.status(400).json({error: "Usuario no encontrado"}); 

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({error: "Contraseña incorrecta"}); 

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET ,{expiresIn: '7d'});
    res.cookie('habitToken', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production', // Solo habilitar en producción
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días en milisegundos
    })
    res.json({message: "Incio de sesión exitoso", token}); 

  }catch(error){
    console.error(error); 
    res.status(500).json({error: "Error en el login", "description":error.toString()}) // Devuelve un error 500 si ocurre un error al iniciar sesión
  }
});
module.exports = router;
