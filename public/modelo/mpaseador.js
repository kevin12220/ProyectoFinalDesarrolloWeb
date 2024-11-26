const { default: mongoose } = require("mongoose");
var Schema = mongoose.Schema;

var schPaseadore = new Schema({
  nompas: { type: String, Required: "nombres y apellidos es obligatorio" },
  tipide: { type: String, Required: "Tipo de identificacion es obligatorio" },
  numide: { type: String, Required: "Numero de identificacion es obligatoria" },
  numcelpas: { type: String, Required: "telefono es obligatorio" },
  email :{ type: String, Required: "correo es obligatorio" },
  numcelemp :{ type: String, Required: "telefono de la empresa es obligatorio" },
  diremp :{ type: String, Required: "direccion de la empresa es obligatorio" },
  dirpas :{ type: String, Required: "direccion del paseador es obligatorio" },
  imgpas :{ type: String, Required: "foto del paseador es obligatorio" },
  tarifa :{ type: String, Required: "tarifa por hora  es obligatorio" },
  calpas :{ type: String, Required: "calificacion del paseador  es obligatorio 1 - 10 1=baja 10=alto" },
});

module.exports = mongoose.model("Paseadore", schPaseadore);
