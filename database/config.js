const mongoose = require("mongoose");
require("dotenv").config(); //instalamos dotenv para leer la data
const dbConnection = async () => {
  try {
    //conexión a mongo con nuestro cluster
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@omegacentauri.ujjbp.mongodb.net/hospital`
    );
    console.log("db online");
  } catch (error) {
    throw new Error("Error al conectarse a la base de datos");
  }
};

module.exports = {
  dbConnection,
};
