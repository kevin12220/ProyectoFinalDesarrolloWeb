import { Button, Form, FormGroup, Table } from "react-bootstrap";
import iAX from "../ConfigAXIOS";
import { useDispatch, useSelector } from "react-redux";
import { setInfoPaseo } from "../reducers";
import "bootstrap/dist/css/bootstrap.css";

function Paseos() {
  const disp = useDispatch();
  const aPaseo = useSelector((state) => state.app.infoPaseo);

  async function getAllPaseo() {
    try {
      const rta = await iAX.get(`http://localhost:2001/paseo/getAllPaseo`);

      disp(setInfoPaseo(rta.data.info));
    } catch (error) {
      console.log("ERROR:" + error.message);
      alert("ERROR:" + error.message);
    }
  }

  async function getAllPaseoMascota() {
    try {
      const rta = await iAX.get(
        `http://localhost:2001/paseo/getAllPaseoMascota`
      );

      disp(setInfoPaseo(rta.data.info));
    } catch (error) {
      console.log("ERROR:" + error.message);
      alert("ERROR:" + error.message);
    }
  }

  async function insPaseo(data) {
    try {
      const rta = await iAX.post("http://localhost:2001/paseo/insPaseo", {
        info: data,
      });
      alert("Creado con exito");
    } catch (error) {
      alert("ERR:" + error.messag);
    }
  }
  const validaForma = (event) => {
    try {
      event.preventDefault();
      const form = event.currentTarget;

      if (form.checkValidity() === false) {
        alert("Presenta errores");
      } else {
        const data = {
          fecpas: form.elements.fecpas.value,
          horpas: form.elements.horpas.value,
          tiepas: form.elements.tiepas.value,
          masid: form.elements.masid.value,
          pasid: form.elements.pasid.value,
          duenid: form.elements.duenid.value,
          novpas: form.elements.novpas.value,
        };

        insPaseo(data);
      }
    } catch (error) {
      alert("Error");
    }
  };

  async function getPaseo() {
    var eid = document.querySelector('input[name="_id"]');
    var efecpas = document.querySelector('input[name="fecpas"]');
    var ehorpas = document.querySelector('input[name="horpas"]');
    var etiepas = document.querySelector('input[name="tiepas"]');
    var emasid = document.querySelector('input[name="masid"]');
    var epasid = document.querySelector('input[name="pasid"]');
    var eduenid = document.querySelector('input[name="duenid"]');
    var enovpas = document.querySelector('input[name="novpas"]');

    const data = {
      fecpas: efecpas.value,
    };

    try {
      const rta = await iAX.post("http://localhost:2001/paseo/getPaseo", {
        info: data,
      });

      alert("Consutado con exito");

      eid.value = rta.data.info[0]._id;
      efecpas.value = rta.data.info[0].fecpas;
      ehorpas.value = rta.data.info[0].horpas;
      etiepas.value = rta.data.info[0].tiepas;
      emasid.value = rta.data.info[0].masid;
      epasid.value = rta.data.info[0].pasid;
      eduenid.value = rta.data.info[0].duenid;
      enovpas.value = rta.data.info[0].novpas;
    } catch (error) {
      alert("Error");
    }
  }

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "72vh" }}
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
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="Date"
              name="fecpas"
              placeholder="fecha del paseo"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Hora de inicio</Form.Label>
            <Form.Control
              type="text"
              name="horpas"
              placeholder="hora de inicio del paseo"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Tiempo (horas)</Form.Label>
            <Form.Control
              type="text"
              name="tiepas"
              placeholder="Direccion del dueno"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Id Mascota</Form.Label>
            <Form.Control
              type="text"
              name="masid"
              placeholder="Id de la mascota"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Id Paseador</Form.Label>
            <Form.Control
              type="text"
              name="pasid"
              placeholder="Id del paseador"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Id dueno</Form.Label>
            <Form.Control
              type="text"
              name="duenid"
              placeholder="Id del dueno"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Novedades</Form.Label>
            <Form.Control
              type="text"
              name="novpas"
              placeholder="Novedades del paseo"
              required
            />
          </FormGroup>
          <div className="mt-5">
            <Button type="submit" variant="primary">
              Crear
            </Button>
            <Button type="button" variant="success" onClick={getPaseo}>
              Consultar
            </Button>
            <Button variant="info" type="button" onClick={getAllPaseoMascota}>
              Paseos
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
                <th>_id</th>
                <th>Fecha</th>
                <th>Hora de inicio</th>
                <th>Tiempo "Horas"</th>
                <th>Nombre Mascota </th>
                <th>Edad </th>
                <th>Raza </th>
                <th>Nombre Paseador</th>
                <th>Identificacion</th>
                <th>Telefono</th>
                <th>Tarifa * hora</th>
                <th>Nombre dueño</th>
                <th>Telefono</th>
                <th>Direccion</th>
                <th>Novedades</th>
              </tr>
            </thead>
            <tbody>
              {aPaseo.map((d, i) => (
                <tr key={i}>
                  <td>{d._id}</td>
                  <td>{d.fecpas}</td>
                  <td>{d.horpas}</td>
                  <td>{d.tiepas}</td>
                  <td>{d.infoPaseo.nombre}</td>
                  <td>{d.infoPaseo.edad}</td>
                  <td>{d.infoPaseo.raza}</td>
                  <td>{d.infoPaseos.nompas}</td>
                  <td>{d.infoPaseos.numide}</td>
                  <td>{d.infoPaseos.numcelpas}</td>
                  <td>{d.infoPaseos.tarifa}</td>
                  <td>{d.infoPaseoos.nomdue}</td>
                  <td>{d.infoPaseoos.teldue}</td>
                  <td>{d.infoPaseoos.dirdue}</td>
                  <td>{d.novpas}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Paseos;
