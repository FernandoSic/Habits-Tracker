# Habits-Tracker-Backend

## Descripción

Según el libro “Hábitos Atómicos” de James Clear, se requieren pequeños pasos diarios para crear un hábito o deshacer un mal hábito. Cada hábito debe comenzar con una inversión de poco tiempo para acostumbrar a la mente a realizarlo. Aunque el tiempo necesario para formar un hábito varía según la persona, los estudios indican que puede tomar entre 21 y 66 días.

Como desarrolladores de software, estamos comprometidos con la creación de soluciones que ayuden al mundo a desarrollar mejores habilidades. Por ello, hemos creado un proyecto real para ayudar a las personas a crear y llevar el control de sus hábitos.

Los estudiantes desarrollarán una aplicación web en **Next.js** y **Express.js** con una base de datos **MongoDB**, que permitirá a los usuarios gestionar hábitos. El usuario podrá crear su cuenta, iniciar sesión, agregar hábitos y marcarlos como completados cada día. Si el usuario no marca el hábito en un día, el conteo se reiniciará. Una barra de progreso cambiará de rojo a verde a medida que el usuario se acerque a los 66 días.

## Prerequisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas y herramientas:

1. **Node.js**: [Descargar e instalar Node.js](https://nodejs.org/)
2. **npm**: npm se instala automáticamente con Node.js. Verifica la instalación con:
   ```sh
   npm -v
   ```
3. **MongoDB Atlas**: Asegúrate de tener acceso a la base de datos en la nube y configurar la conexión adecuadamente.

## Pasos para su ejecución

1. **Clonar el repositorio**  
   ```sh
   git clone https://github.com/FernandoSic/Habits-Tracker.git
   ```

2. **Navegar a la dirección del proyecto**  
   ```sh
   cd Habits-Tracker
   ```

3. **Instalar las dependencias**  
   ```sh
   npm install
   ```

4. **Iniciar el servidor**  
   ```sh
   npm start
   ```

Puedes probar la API desde **Postman** o **Thunder Client**. El servidor estará corriendo en el **puerto 3001**.

# API Endpoints
## Obtener todos los hábitos (Ejemplo)
### Request
```http
GET /habits 
Host: localhost:3001
```

## Crear un hábito (Ejemplo)
### Request
```http
POST /habits 
Host: localhost:3001
Content-Type: application/json

{
  "name": "Meditar",
  "description": "Meditar durante 20 minutos cada día"
}
```
## Eliminar un hábito (Ejemplo)
### Request
```http
DELETE /habits/60c72b2f9b1d8e001c8e4b8c
Host: localhost:3001
```
## Actualizar un hábito (Ejemplo)
### Request
```http
PUT /habits/60c72b2f9b1d8e001c8e4b8c
Host: localhost:3001
Content-Type: application/json

{
  "name": "Meditar",
  "description": "Meditar durante 30 minutos cada día"
}
```
## Datos del autor

- **Nombre**: Fernando Sic  
- **Correo electrónico**: fernando.sic@galileo.edu  
- **Carnet**: 24000480 