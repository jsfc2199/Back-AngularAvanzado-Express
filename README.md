# Backend Node para Curso Angular Avanzado
Esta sección tiene como objetivo preparar todo lo necesario para comenzar a crear nuestro backend server: npm install express --save; npm i nodemon; npm i mongoose, npm i dotenv, npm i cors (este ultimo para aceptar las peticiones de diferentes dominios)

- Configuración de Mongo
- Robo 3T
- Conexión entre Mongo y Node
- Tip sobre colores de consola
- Aprender un poco sobre los errores de respuestas HTTP
- Configuración inicial de Express
- Establecer las bases de nuestros RESTful services

## Hospital App Backend Server
Esta sección tiene por objetivo trabajar fuertemente con Express, Mongo y Node:

- Explicación general y alcances del Backend
- Crear colección de Usuarios
- Crear modelos en Node
- POST
- Validaciones automáticas mediante Mongoose
- Encriptar contraseñas
- PUT
- Delete
- Get
- Login de Usuario
- Generación de un JWT
- Middlewares
- Optimizar Middlewares

- Nota: Para validar campos obligatorios instalamos npm i express-validator
- Nota: Para jwt instalamos npm i jsonwebtoken
- Nota: El jwt lo usamos para tener cierto tipo de protección en las rutas

## Medicos y Hospitales Crud
Esta sección tiene varias tareas e información importante sobre:

- CRUD de médicos y hospitales
- Una tarea robusta con su respectivo documento y resolución
- Códigos útiles de Mongoose
- Populate
- Gets
- Paginar resultados
- Búsquedas específicas y globales
- Subida de archivos al servidor
- Asignación de imagen a un hospital, medico o usuario
- Formas de exponer archivos a la web
- Manejo del FileSystem
- Proteger imágenes
- Generar imagen por defecto

## Autenticación con Google Sign-in
Esta sección esta especializada en implementar el Google Sign-in en nuestro backend server:

- Crear una aplicación en Google Developer Console
- Generar el ID de nuestra aplicación y un ID Secreto de servidor
- Crear un login básico de pruebas usando el API de Google
- Generar un Token desde el front-end
- Validar el Token en nuestro back-end
- Tip para generar la documentación de nuestros servicios automáticamente

Usaremos la documentación oficial https://developers.google.com/identity/gsi/web/guides/overview?hl=es-419
npm install google-auth-library --save