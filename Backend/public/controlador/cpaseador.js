const { default: mongoose } = require("mongoose");
var Paseadore = require("../modelo/mpaseador");

exports.getAllPase = function (req, res) {
  try {
    Paseadore.find({})
      .then((rta) => {
        console.log("Rta del servidor bbdd:" + rta);
        res.send({ msg: "OK", info: rta });
      })
      .catch((err) => {
        console.log("ERR:" + err);
        res.send({ msg: "ER", info: "no disponible" });
      });
  } catch (error) {
    console.log("ERR: buscando paseadores - " + error);
  }
};

exports.insPase = function (req, res) {
  try {
    var npas = new Paseadore({
      nompas: req.body.info.nompas,
      tipide: req.body.info.tipide,
      numide: req.body.info.numide,
      numcelpas: req.body.info.numcelpas,
      email: req.body.info.email,
      numcelemp: req.body.info.numcelemp,
      diremp: req.body.info.diremp,
      dirpas: req.body.info.dirpas,
      imgpas: req.body.info.imgpas,
      tarifa: req.body.info.tarifa,
      calpas: req.body.info.calpas,
    });

    npas
      .save()
      .then(() => {
        res.send({ msg: "OK", info: "paseador creado" });
      })
      .catch((err) => {
        res.send({ msg: "ER", info: "Creacion del paseador" });
      });
  } catch (error) {
    console.log("ER: en la creación del paseador");
  }
};

exports.getPase = function (req, res) {
  try {
    Paseadore.find({ numide: req.body.info.numide })
      .then((rta) => {
        console.log("Rta del servidor bbdd consultar paseador por id:" + rta);
        res.send({ msg: "OK", info: rta });
      })
      .catch((err) => {
        console.log("ERR:" + err);
        res.send({ msg: "ER", info: "Informacion no disponible" });
      });
  } catch (error) {
    console.log("ERR: consultando paseador por Id " + error);
  }
};

exports.updPase = function (req, res) {
  try {
    const idPase = new mongoose.Types.ObjectId(req.body.info._id);

    Paseadore.updateOne(
      { _id: idPase },
      {
        $set: {
          nompas: req.body.info.nompas,
          tipide: req.body.info.tipide,
          numide: req.body.info.tipide,
          numcelpas: req.body.info.numcelpas,
          email: req.body.info.email,
          numcelemp: req.body.info.numcelemp,
          diremp: req.body.info.diremp,
          dirpas: req.body.info.dirpas,
          imgpas: req.body.info.imgpas,
          tarifa: req.body.info.tarifa,
          calpas: req.body.info.calpas,
        },
      }
    )
      .then((rta) => {
        console.log("rta:::>" + rta);

        res.send({ msg: "OK", info: rta });
      })
      .catch((err) => {
        res.send({ msg: "ER", info: "Actualizacion del paseador" });
      });
  } catch (error) {
    console.log("ER: en la actualizacion del paseador");
  }
};

exports.eliPase = function (req, res) {
  try {
    const idPas = new mongoose.Types.ObjectId(req.body.info._id);

    Paseadore.deleteOne({ _id: idPas })
      .then((rta) => {
        console.log("rta:::>" + rta);

        res.send({ msg: "OK", info: rta });
      })
      .catch((err) => {
        res.send({ msg: "ER", info: "Eliminación del paseador" });
      });
  } catch (error) {
    console.log("ER: en la eliminacion del paseador");
  }
};
