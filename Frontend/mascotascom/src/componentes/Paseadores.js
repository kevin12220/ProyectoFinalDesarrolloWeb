import { Alert, Button, Form, FormGroup, Table } from "react-bootstrap";
import iAX from "../ConfigAXIOS";
import { useDispatch, useSelector } from "react-redux";
import { setInfoPase } from "../reducers";
import "bootstrap/dist/css/bootstrap.css";

function Paseadores() {
  const disp = useDispatch();
  const aPas = useSelector((state) => state.app.infoPase);

  async function getAllPase() {
    try {
      const rta = await iAX.get(`http://localhost:2001/pase/getAllPase`);

      disp(setInfoPase(rta.data.info));
    } catch (error) {
      Alert("Error");
    }
  }

  async function insPase(data) {
    try {
      const rta = await iAX.post("http://localhost:2001/pase/insPase", {
        info: data,
      });
      alert("creado con exito");
    } catch (error) {
      alert("ERR:" + error.message);
    }
  }
  const validaForma = (event) => {
    try {
      event.preventDefault();
      const form = event.currentTarget;

      if (form.checkValidity() === false) {
        alert("Formulario presenta errores");
      } else {
        const data = {
          nompas: form.elements.nompas.value,
          tipide: form.elements.tipide.value,
          numide: form.elements.numide.value,
          numcelpas: form.elements.numcelpas.value,
          email: form.elements.email.value,
          numcelemp: form.elements.numcelemp.value,
          diremp: form.elements.diremp.value,
          dirpas: form.elements.dirpas.value,
          imgpas: form.elements.imgpas.value,
          tarifa: form.elements.tarifa.value,
          calpas: form.elements.calpas.value,
        };

        insPase(data);
      }
    } catch (error) {
      alert("ERR:" + error.message);
    }
  };

  async function getPase() {
    var eid = document.querySelector('input[name="_id"]');
    var enompas = document.querySelector('input[name="nompas"]');
    var etipide = document.querySelector('input[name="tipide"]');
    var enumide = document.querySelector('input[name="numide"]');
    var enumcelpas = document.querySelector('input[name="numcelpas"]');
    var eemail = document.querySelector('input[name="email"]');
    var enumcelemp = document.querySelector('input[name="numcelemp"]');
    var ediremp = document.querySelector('input[name="diremp"]');
    var edirpas = document.querySelector('input[name="dirpas"]');
    var eimgpas = document.querySelector('input[name="imgpas"]');
    var etarifa = document.querySelector('input[name="tarifa"]');
    var ecalpas = document.querySelector('input[name="calpas"]');

    const data = {
      numide: enumide.value,
    };

    try {
      const rta = await iAX.post("http://localhost:2001/pase/getPase", {
        info: data,
      });

      alert("Consultado con exito");

      eid.value = rta.data.info[0]._id;
      enompas.value = rta.data.info[0].nompas;
      etipide.value = rta.data.info[0].tipide;
      enumide.value = rta.data.info[0].numide;
      enumcelpas.value = rta.data.info[0].numcelpas;
      eemail.value = rta.data.info[0].email;
      enumcelemp.value = rta.data.info[0].numcelemp;
      ediremp.value = rta.data.info[0].diremp;
      edirpas.value = rta.data.info[0].dirpas;
      eimgpas.value = rta.data.info[0].imgpas;
      etarifa.value = rta.data.info[0].tarifa;
      ecalpas.value = rta.data.info[0].calpas;
    } catch (error) {
      alert("ERR:" + error.message);
    }
  }

  async function updPase() {
    var eid = document.querySelector('input[name="_id"]');
    var enompas = document.querySelector('input[name="nompas"]');
    var etipide = document.querySelector('input[name="tipide"]');
    var enumide = document.querySelector('input[name="numide"]');
    var enumcelpas = document.querySelector('input[name="numcelpas"]');
    var eemail = document.querySelector('input[name="email"]');
    var enumcelemp = document.querySelector('input[name="numcelemp"]');
    var ediremp = document.querySelector('input[name="diremp"]');
    var edirpas = document.querySelector('input[name="dirpas"]');
    var eimgpas = document.querySelector('input[name="imgpas"]');
    var etarifa = document.querySelector('input[name="tarifa"]');
    var ecalpas = document.querySelector('input[name="calpas"]');

    const data = {
      _id: eid.value,
      nompas: enompas.value,
      tipide: etipide.value,
      numide: enumide.value,
      numcelpas: enumcelpas.value,
      email: eemail.value,
      numcelemp: enumcelemp.value,
      diremp: ediremp.value,
      dirpas: edirpas.value,
      imgpas: eimgpas.value,
      tarifa: etarifa.value,
      calpas: ecalpas.value,
    };

    try {
      const rta = await iAX.post("http://localhost:2001/pase/updPase", {
        info: data,
      });

      alert("Actualizado");
    } catch (error) {
      alert("ERR:" + error.message);
    }
  }

  async function eliPase() {
    var eid = document.querySelector('input[name="_id"]');

    const data = {
      _id: eid.value,
    };

    try {
      const rta = await iAX.post("http://localhost:2001/pase/eliPase", {
        info: data,
      });

      alert("Eliminado");
    } catch (error) {
      alert("ERR:" + error.message);
    }
  }

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ minHeight: "50vh" }}
      >
        <Form
          className="bg-light p-4 rounded shadow"
          style={{ width: "80%", maxWidth: "400px" }}
          noValidate
          onSubmit={validaForma}
        >
          <FormGroup>
            <Form.Label>_id</Form.Label>
            <Form.Control type="text" name="_id" placeholder="_id" />
          </FormGroup>
          <FormGroup>
            <Form.Label>Nombre y Apellidos </Form.Label>
            <Form.Control
              type="text"
              name="nompas"
              placeholder="nombres y apellidos del paseador"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Tipo de dentificacion</Form.Label>
            <Form.Control
              type="text"
              name="tipide"
              placeholder="tipo de identificacion del paseador"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Numero de identificación</Form.Label>
            <Form.Control
              type="text"
              name="numide"
              placeholder="numero de identificacion del paseador"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              name="numcelpas"
              placeholder="telefono del paseador"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="correo del paseador"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Telefono empresa</Form.Label>
            <Form.Control
              type="text"
              name="numcelemp"
              placeholder="telefono de la empresa"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Direccion empresa</Form.Label>
            <Form.Control
              type="text"
              name="diremp"
              placeholder="direccion de la empresa"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Direccion del paseador</Form.Label>
            <Form.Control
              type="text"
              name="dirpas"
              placeholder="tdireccion del paseador"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Foto del paseador</Form.Label>
            <Form.Control
              type="text"
              name="imgpas"
              placeholder="Foto del paseador"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Tarifa por hora </Form.Label>
            <Form.Control
              type="text"
              name="tarifa"
              placeholder="tarifa por hora "
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Calificacion del paseador</Form.Label>
            <Form.Control
              type="text"
              name="calpas"
              placeholder="Calificacion 1-10 / 1=baja  10=alta"
              required
            />
          </FormGroup>
          <div className="mt-5">
            <Button type="submit" variant="info">
              Crear
            </Button>
            <Button type="button" variant="secondary" onClick={getAllPase}>
              Paseadores
            </Button>
            <Button type="button" variant="success" onClick={getPase}>
              Consultar
            </Button>
            <Button type="button" variant="warning" onClick={updPase}>
              Actualizar
            </Button>
            <Button type="button" variant="danger" onClick={eliPase}>
              Eliminar
            </Button>
          </div>
        </Form>
      </div>

      <br />
      <br />

      <div className="container py-5">
        <div className="d-flex justify-content-center">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombres y Apellidos</th>
                <th>Tipo de identificacion</th>
                <th>Numero de identificacion</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Telefono empresa</th>
                <th>Direccion empresa</th>
                <th>Direccion paseador</th>
                <th>Foto paseador</th>
                <th>Tarifa</th>
                <th>Calificacion</th>
              </tr>
            </thead>
            <tbody>
              {aPas.map((d, i) => (
                <tr key={i}>
                  <td>{d._id}</td>
                  <td>{d.nompas}</td>
                  <td>{d.tipide}</td>
                  <td>{d.numide}</td>
                  <td>{d.numcelpas}</td>
                  <td>{d.email}</td>
                  <td>{d.numcelemp}</td>
                  <td>{d.diremp}</td>
                  <td>{d.dirpas}</td>
                  <td>{d.imgpas}</td>
                  <td>{d.tarifa}</td>
                  <td>{d.calpas}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Paseadores;
