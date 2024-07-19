//Creando servidor
const express = require("express");
const { dbConnection } = require("./database/config");

//crear servidor de express
const app = express();

//Llamando la conexión a Base de datos de mongo 
dbConnection();

//rutas
app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    msg: "Hola",
  });
});

app.listen(6321, () => {
  console.log("Servidor corriendo");
});
