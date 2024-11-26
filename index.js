var mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const path = require("path");
const bp = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const jwt     = require("jsonwebtoken") ;
const cors = require("cors");
const app = express();
const hostname = "localhost";
const port = 2001;

app.use(cors());
app.use(bp.json());

require("./public/rutas/rduenos")(app);
require("./public/rutas/rmascota")(app);
require("./public/rutas/rpaseadores")(app);
require("./public/rutas/rpaseo")(app);
require("./public/rutas/ruser")(app);

var bdURL = "mongodb://127.0.0.1:27017";
mongoose.connect(bdURL);

mongoose.connection.on("connected", function () {
  console.log("Conexion a mongodb realizada en:" + bdURL);
});
mongoose.connection.on("error", function (err) {
  console.log("ERR - conexion a mongodb:" + err);
});
mongoose.connection.on("disconnected", function (err) {
  console.log("Desconexion a mongodb OK - " + err);
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Conexion a mongodb finalizada por el servidor");
    process.exit(0);
  });
});

const archlog = fs.createWriteStream(path.join(__dirname, "srvLOG.log"), {
  flags: "a",
});

morgan.token("xx", (req) => {
  return "--->" + req.body.nombre;
});

app.use(
  morgan(
    "{ :xx fecha: :date[web], metodo: :method url:url status:status :remote-addr :response-time :user-agent",
    { stream: archlog }
  )
);


app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  //console.log( "Cabecera:" + JSON.stringify(req.headers) ) ;
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(
    "<html><head><title>Pag-1</title></head><body>Respuesta servidor</h1></body></html>"
  );
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Servidor en ejecucion en http://${hostname}:${port}`);
});

