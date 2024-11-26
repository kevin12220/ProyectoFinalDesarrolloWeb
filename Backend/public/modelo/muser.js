const { default: mongoose } = require("mongoose");
var Schema = mongoose.Schema;

var schUsers = new Schema({
  usuario: { type: String, Required: "usuario es obligatoria" },
  contraseña: { type: String, Required: "contraseña es obligatoria" },
  
});

module.exports = mongoose.model("User", schUsers);