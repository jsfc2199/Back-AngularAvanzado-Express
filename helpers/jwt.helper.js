const jwt = require("jsonwebtoken");

const generarJWT = (uuid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uuid,
    };
    jwt.sign(payload, process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      },
      //el callback del sign tiene el err y el token
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el token')
        }else{
            resolve(token)
        }
      }
    );
  });
};

module.exports = {
    generarJWT
}