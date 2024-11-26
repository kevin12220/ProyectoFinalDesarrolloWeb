import { Alert, Button, Form, FormGroup, Table } from "react-bootstrap";
import iAX from "../ConfigAXIOS";
import { useDispatch, useSelector } from "react-redux";
import { setInfoDue } from "../reducers";
import "bootstrap/dist/css/bootstrap.css";

function Duenos() {
  const disp = useDispatch();
  const aDuen = useSelector((state) => state.app.infoDue);

  async function getAllDuen() {
    try {
      const rta = await iAX.get(`http://localhost:2001/due/getAllDuen`);

      disp(setInfoDue(rta.data.info));
    } catch (error) {
      alert("ERROR:" + error.message);
    }
  }

  async function insDuen(data) {
    try {
      const rta = await iAX.post("http://localhost:2001/due/insDuen", {
        info: data,
      });
      alert("Creado");
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
          nomdue: form.elements.nomdue.value,
          teldue: form.elements.teldue.value,
          dirdue: form.elements.dirdue.value,
          cordue: form.elements.cordue.value,
        };

        insDuen(data);
      }
    } catch (error) {
      alert("ERR:" + error.message);
    }
  };

  async function getDuen() {
    var eid = document.querySelector('input[name="_id"]');
    var enomdue = document.querySelector('input[name="nomdue"]');
    var eteldue = document.querySelector('input[name="teldue"]');
    var edirdue = document.querySelector('input[name="dirdue"]');
    var ecordue = document.querySelector('input[name="cordue"]');

    const data = {
      nomdue: enomdue.value,
    };

    try {
      const rta = await iAX.post("http://localhost:2001/due/getDuen", {
        info: data,
      });

      alert("Consultado con exito");

      eid.value = rta.data.info[0]._id;
      eteldue.value = rta.data.info[0].teldue;
      edirdue.value = rta.data.info[0].dirdue;
      ecordue.value = rta.data.info[0].cordue;
    } catch (error) {
      alert("ERR:" + error.message);
    }
  }

  async function updDuen() {
    var eid = document.querySelector('input[name="_id"]');
    var enomdue = document.querySelector('input[name="nomdue"]');
    var eteldue = document.querySelector('input[name="teldue"]');
    var edirdue = document.querySelector('input[name="dirdue"]');
    var ecordue = document.querySelector('input[name="cordue"]');

    const data = {
      _id: eid.value,
      nomdue: enomdue.value,
      teldue: eteldue.value,
      dirdue: edirdue.value,
      cordue: ecordue.value,
    };

    try {
      const rta = await iAX.post("http://localhost:2001/due/updDuen", {
        info: data,
      });

      alert("Actualizado");
    } catch (error) {
      alert("ERR:" + error.message);
    }
  }

  async function eliDuen() {
    var eid = document.querySelector('input[name="_id"]');

    const data = {
      _id: eid.value,
    };

    try {
      const rta = await iAX.post("http://localhost:2001/due/eliDuen", {
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
            <Form.Label>nombre</Form.Label>
            <Form.Control
              type="text"
              name="nomdue"
              placeholder="nombre del dueno"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              name="teldue"
              placeholder="telefono del dueno"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Direccion</Form.Label>
            <Form.Control
              type="text"
              name="dirdue"
              placeholder="Direccion del dueno"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              name="cordue"
              placeholder="Correo del dueno"
              required
            />
          </FormGroup>
          <div className="mt-5">
            <Button type="submit" variant="warning">
              Crear
            </Button>
            <Button type="button" variant="info" onClick={getAllDuen}>
              Dueños
            </Button>
            <Button type="button" variant="success" onClick={getDuen}>
              Consultar
            </Button>
            <Button type="button" variant="secondary" onClick={updDuen}>
              Actualizar
            </Button>
            <Button type="button" variant="danger" onClick={eliDuen}>
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
                <th>_id</th>
                <th>nombre</th>
                <th>telefono</th>
                <th>direccion</th>
                <th>correo</th>
              </tr>
            </thead>
            <tbody>
              {aDuen.map((d, i) => (
                <tr key={i}>
                  <td>{d._id}</td>
                  <td>{d.nomdue}</td>
                  <td>{d.teldue}</td>
                  <td>{d.dirdue}</td>
                  <td>{d.cordue}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Duenos;
