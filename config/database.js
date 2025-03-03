//Importar mongoose
const mongoose=require('mongoose');
require('dotenv').config();

//Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(()=>
{
    console.log('Conectado a la base de datos'); //Si la conexión es exitosa
}).catch((error)=>
{
    console.log('Error al conectar a la base de datos'); //Si la conexión falla
    console.log(error);
});

//Exportar la conexión
module.exports = mongoose;