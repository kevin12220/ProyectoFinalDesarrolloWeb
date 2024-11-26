const { default: mongoose } = require("mongoose");
var Schema = mongoose.Schema;

var schPaseo = new Schema({
  fecpas: { type: Date, Required: "fecha del paseo es obligatoria" },
  horpas: { type: String, Required: "hora de inicio es obligatoria" },
  tiepas: { type: Number, Required: "tiempo del paseo en horas es obligatoria" },
  masid: { type:Schema.Types.ObjectId, Required: "id de la mascota es obligatoria" },
  pasid: { type:Schema.Types.ObjectId, Required: "id del paseador  es obligatoria" },
  duenid: { type:Schema.Types.ObjectId, Required: "id del dueno  es obligatoria" },
  novpas: { type: String, Required:"novedades"}
});

module.exports = mongoose.model("Paseo", schPaseo);