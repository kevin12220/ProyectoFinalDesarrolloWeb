const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
var User = require("../modelo/muser");
const secKey = "1234";

exports.miUser = function (req, res) {
  const tmpToken = req.headers["mitoken"];

  jwt.verify(tmpToken, secKey, (err, decoded) => {
    if (err) {
      res.send({ msg: "ER", info: "no autorizado" });
    } else {
      res.send({ msg: "OK", info: decoded });
    }
  });
};

exports.login = function (req, res) {
  try {
    User.find({
      $and: [
        { usuario: { $eq: req.body.info.usuario } },
        { contraseña: { $eq: req.body.info.contraseña } },
      ],
    })
      .then((rta) => {
        console.log("Rta del servidor bbdd consultar paseador x id:" + rta);
        if (!rta.length) {
          res.send({ msg: "ER", info: "Usuario / contraseña no corresponde" });
        } else {
          const miToken = jwt.sign({ id: 1 }, secKey, { expiresIn: "2h" });
          res.send({ msg: "OK", info: miToken });
        }
      })
      .catch((err) => {
        console.log("ERR:" + err);
        res.send({ msg: "ER", info: "Usuario / contraseña no corresponde" });
      });
  } catch (error) {
    res.send({ msg: "ER", info: "Usurio / contrasena no corresponden" });
  }
};

exports.insUser = function (req, res) {
  try {
    var nUser = new User({
      usuario: req.body.info.usuario,
      contraseña: req.body.info.contraseña,
    });

    nUser
      .save()
      .then(() => {
        res.send({ msg: "OK", info: "Usuario creado - OK" });
      })
      .catch((err) => {
        res.send({ msg: "ER", info: "Creacion del usuario" });
      });
  } catch (error) {
    console.log("ER: en la creación del usuario:" + error);
  }
};
