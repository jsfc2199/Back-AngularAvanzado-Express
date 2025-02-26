//Creando servidor
const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

//crear servidor de express
const app = express();

//Configuración de Cors
app.use(cors()); //Middleware(Interceptor) donde cada que se haga una petición siempre pasará primero por el Cors

//carpeta publica
app.use(express.static('public'))

//Lectura y parseo del body, para leer el body de postman en cualquier petición
app.use(express.json()) 

//Llamando la conexión a Base de datos de mongo
dbConnection();

//rutas
app.use("/api/usuarios", require("./routes/usuarios.route")); //cualquier petición que pase por api/usuarios, será interceptada aquí
app.use("/api/login", require("./routes/auth.route")); //cualquier petición que pase por api/usuarios, será interceptada aquí
app.use("/api/hospitales", require("./routes/hospitales.route"));
app.use("/api/medicos", require("./routes/medicos.route"));
app.use("/api/todo", require("./routes/todo.route"));
app.use("/api/upload", require("./routes/upload.route"));





app.listen(6321, () => {
  console.log("Servidor corriendo");
});
