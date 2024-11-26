const { default: mongoose } = require("mongoose");
var Duen = require("../modelo/mduenos");

exports.getAllDuen = function (req, res) {
  try {
    Duen.find({})
      .then((rta) => {
        console.log("Rta del servidor bbdd:" + rta);
        res.send({ msg: "OK", info: rta });
      })
      .catch((err) => {
        console.log("ERR:" + err);
        res.send({ msg: "ER", info: "no disponible" });
      });
  } catch (error) {
    console.log("ERR: buscando duenos - " + error);
  }
};

exports.insDuen = function (req, res) {
  try {
    var nDue = new Duen({
      nomdue: req.body.info.nomdue,
      teldue: req.body.info.teldue,
      dirdue: req.body.info.dirdue,
      cordue: req.body.info.cordue,
    });

    nDue
      .save()
      .then(() => {
        res.send({ msg: "OK", info: "Dueño creado" });
      })
      .catch((err) => {
        res.send({ msg: "ER", info: "Creacion del dueño" });
      });
  } catch (error) {
    console.log("ER: en la creación del dueño");
  }
};

exports.getDuen = function (req, res) {
  try {
    Duen.find({ nomdue: req.body.info.nomdue })
      .then((rta) => {
        console.log("Rta del servidor bbdd consultar dueño por nombre:" + rta);
        res.send({ msg: "OK", info: rta });
      })
      .catch((err) => {
        console.log("ERR:" + err);
        res.send({ msg: "ER", info: "Informacion no disponible" });
      });
  } catch (error) {
    console.log("ERR: consultando dueño por Id " + error);
  }
};

exports.updDuen = function (req, res) {
  try {
    const idDuen = new mongoose.Types.ObjectId(req.body.info._id);

    Duen.updateOne(
      { _id: idDuen },
      {
        $set: {
          nomdue: req.body.info.nomdue,
          teldue: req.body.info.teldue,
          dirdue: req.body.info.dirdue,
          cordue: req.body.info.cordue,
        },
      }
    )
      .then((rta) => {
        console.log("rta:::>" + rta);

        res.send({ msg: "OK", info: rta });
      })
      .catch((err) => {
        res.send({ msg: "ER", info: "Actualizacion del dueño" });
      });
  } catch (error) {
    console.log("ER: en la actualizacion del dueño");
  }
};

exports.eliDuen = function (req, res) {
  try {
    const idDuen = new mongoose.Types.ObjectId(req.body.info._id);

    Duen.deleteOne({ _id: idDuen })
      .then((rta) => {
        console.log("rta:::>" + rta);

        res.send({ msg: "OK", info: rta });
      })
      .catch((err) => {
        res.send({ msg: "ER", info: "Eliminación del dueño" });
      });
  } catch (error) {
    console.log("ER: en la eliminacion del dueño");
  }
};
