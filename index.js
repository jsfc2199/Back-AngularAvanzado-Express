//Creando servidor
const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

//crear servidor de express
const app = express();

//Configuración de Cors
app.use(cors()); //Middleware(Interceptor) donde cada que se haga una petición siempre pasará primero por el Cors

//Llamando la conexión a Base de datos de mongo
dbConnection();

//rutas
app.use("/api/usuarios", require("./routes/usuarios.route")); //cualquier petición que pase por api/usuarios, será interceptada aquí

app.listen(6321, () => {
  console.log("Servidor corriendo");
});
