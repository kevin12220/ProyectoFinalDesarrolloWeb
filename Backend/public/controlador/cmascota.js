const { default: mongoose } = require("mongoose");
var Mascota = require("../modelo/mmascota");

exports.getAllMasc = function (req, res) {
  try {
    Mascota.find({})
      .then((rta) => {
        console.log("Rta del servidor bbdd:" + rta);
        res.send({ msg: "OK", info: rta });
      })
      .catch((err) => {
        console.log("ERR:" + err);
        res.send({ msg: "ER", info: "no disponible" });
      });
  } catch (error) {
    console.log("ERR: buscando Mascotas - " + error);
  }
};

exports.insMasc = function (req, res) {
  console.log("hola");

  try {
    var nMasc = new Mascota({
      nombre: req.body.info.nombre,
      edad: req.body.info.edad,
      raza: req.body.info.raza,
      genero: req.body.info.genero,
      recomendaciones: req.body.info.recomendaciones,
    });

    nMasc
      .save()
      .then(() => {
        res.send({ msg: "OK", info: "Mascota creada" });
      })
      .catch((err) => {
        res.send({ msg: "ER", info: "Creacion de la mascota" });
      });
  } catch (error) {
    res.send({ msg: "ER", info: "Creacion de las mascotas" });
  }
};

exports.getMasc = function (req, res) {
  try {
    Mascota.find({ nombre: req.body.info.nombre })
      .then((rta) => {
        console.log(
          "Rta del servidor bbdd consultar mascpta por nombre:" + rta
        );
        res.send({ msg: "OK", info: rta });
      })
      .catch((err) => {
        console.log("ERR:" + err);
        res.send({ msg: "ER", info: "Informacion no disponible" });
      });
  } catch (error) {
    console.log("ERR: consultando mascota por nombre " + error);
  }
};

exports.updMasc = function (req, res) {
  try {
    console.log("nombre:" + req.body.info.edad);
    const idMasc = new mongoose.Types.ObjectId(req.body.info._id);

    Mascota.updateOne(
      { _id: idMasc },
      {
        $set: {
          nombre: req.body.info.nombre,
          edad: req.body.info.edad,
          raza: req.body.info.raza,
          genero: req.body.info.genero,
          recomendaciones: req.body.info.recomendaciones,
        },
      }
    )
      .then((rta) => {
        console.log("rta:::>" + rta);

        res.send({ msg: "OK", info: rta });
      })
      .catch((err) => {
        res.send({ msg: "ER", info: "Actualizacion de la mascota" });
      });
  } catch (error) {
    console.log("ER: en la actualizacion de la mascota");
  }
};

exports.eliMasc = function (req, res) {
  try {
    const idMasc = new mongoose.Types.ObjectId(req.body.info._id);

    Mascota.deleteOne({ _id: idMasc })
      .then((rta) => {
        console.log("rta:::>" + rta);

        res.send({ msg: "OK", info: rta });
      })
      .catch((err) => {
        res.send({ msg: "ER", info: "Eliminación de la mascota" });
      });
  } catch (error) {
    console.log("ER: en la eliminacion de la  mascota");
  }
};
