const { default: mongoose } = require("mongoose");
var Schema = mongoose.Schema;

var schMascota = new Schema({
  nombre: { type: String, Required: "nombre es obligatorio" },
  edad: { type: String, Required: "edad es obligatorio" },
  raza: { type: String, Required: "raza es obligatoria" },
  genero: { type: String, Required: "genero es obligatorio" },
  recomendaciones: { type: String, Required:"recomendacion es obligatorio"}
});

module.exports = mongoose.model("Mascota", schMascota);
