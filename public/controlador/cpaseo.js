const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
var Paseo = require("../modelo/mpaseo");

exports.getAllPaseo = function (req, res) {
  try {
    Paseo.find({})
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

exports.insPaseo = function (req, res) {
  console.log("hola");

  try {
    var nPaseo = new Paseo({
      fecpas: req.body.info.fecpas,
      horpas: req.body.info.horpas,
      tiepas: req.body.info.tiepas,
      masid: req.body.info.masid,
      pasid: req.body.info.pasid,
      duenid: req.body.info.duenid,
      novpas: req.body.info.novpas,
      masid: req.body.info.masid,
    });

    nPaseo
      .save()
      .then(() => {
        res.send({ msg: "OK", info: "Paseo creado" });
      })
      .catch((err) => {
        res.send({ msg: "ER", info: "Creacion del paseo" });
      });
  } catch (error) {
    res.send({ msg: "ER", info: "Creacion del paseo" });
  }
};

exports.getPaseo = function (req, res) {
  try {
    Paseo.find({ fecpas: req.body.info.fecpas })
      .then((rta) => {
        console.log("Rta del servidor bbdd consultar paseo por fehca:" + rta);
        res.send({ msg: "OK", info: rta });
      })
      .catch((err) => {
        console.log("ERR:" + err);
        res.send({ msg: "ER", info: "Informacion no disponible" });
      });
  } catch (error) {
    console.log("ERR: consultando paseo por fecha " + error);
  }
};

exports.getAllPaseoMascota = function (req, res) {
  try {
    Paseo.aggregate([
      {
        $lookup: {
          from: "mascotas", // LA COLECCION CON LA QUE HACEMOS EL JOIN
          localField: "masid", // CAMPO EN LA COLECC ORIGEN
          foreignField: "_id", // CAMPO EN LA COLECC DEST
          as: "infoPaseo", // NOMBRE DEL ARRAY DE SALIDA
        },
      },

      {
        $lookup: {
          from: "paseadores", // LA COLECCION CON LA QUE HACEMOS EL JOIN
          localField: "pasid", // CAMPO EN LA COLECC ORIGEN
          foreignField: "_id", // CAMPO EN LA COLECC DEST
          as: "infoPaseos", // NOMBRE DEL ARRAY DE SALIDA
        },
      },
      {
        $lookup: {
          from: "duens", // LA COLECCION CON LA QUE HACEMOS EL JOIN
          localField: "duenid", // CAMPO EN LA COLECC ORIGEN
          foreignField: "_id", // CAMPO EN LA COLECC DEST
          as: "infoPaseoos", // NOMBRE DEL ARRAY DE SALIDA
        },
      },

      {
        $unwind: "$infoPaseo", // DESGLOSE EL ARRAY EN DOCUM INDIVIDUALES
      },
      {
        $unwind: "$infoPaseos", // DESGLOSE EL ARRAY EN DOCUM INDIVIDUALES
      },
      {
        $unwind: "$infoPaseoos", // DESGLOSE EL ARRAY EN DOCUM INDIVIDUALES
      },
    ])
      .then((rta) => {
        console.log("rta===>" + rta);
        res.send({ msg: "OK", info: rta });
      })
      .catch((err) => {
        res.send({ msg: "ER", info: "Consulta paseo por mascota" });
      });
  } catch (error) {
    console.log("ERR: consultando paseadores - " + error);
  }
};
