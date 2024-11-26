import { Button, Form, FormGroup, Table } from "react-bootstrap";
import iAX from "../ConfigAXIOS";
import { useDispatch, useSelector } from "react-redux";
import { setInfoMascota } from "../reducers";
import "bootstrap/dist/css/bootstrap.css";

function Mascotas() {
  const disp = useDispatch();
  const aMascota = useSelector((state) => state.app.infoMasc);

  async function getAllMasc() {
    try {
      const rta = await iAX.get(`http://localhost:2001/masc/getAllMasc`);

      disp(setInfoMascota(rta.data.info));
    } catch (error) {
      alert("ERROR:" + error.message);
    }
  }

  async function insMasc(data) {
    try {
      const rta = await iAX.post("http://localhost:2001/masc/insMasc", {
        info: data,
      });
      alert("creado");
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
          nombre: form.elements.nombre.value,
          edad: form.elements.edad.value,
          raza: form.elements.raza.value,
          genero: form.elements.genero.value,
          recomendaciones: form.elements.recomendaciones.value,
        };

        insMasc(data);
      }
    } catch (error) {
      alert("ERR:" + error.message);
    }
  };

  async function getMasc() {
    var eid = document.querySelector('input[name="_id"]');
    var enombre = document.querySelector('input[name="nombre"]');
    var eedad = document.querySelector('input[name="edad"]');
    var eraza = document.querySelector('input[name="raza"]');
    var egenero = document.querySelector('input[name="genero"]');
    var erecomendaciones = document.querySelector(
      'input[name="recomendaciones"]'
    );

    const data = {
      nombre: enombre.value,
    };

    try {
      const rta = await iAX.post("http://localhost:2001/masc/getMasc", {
        info: data,
      });

      alert("Consultado con exito");

      eid.value = rta.data.info[0]._id;
      enombre.value = rta.data.info[0].nombre;
      eedad.value = rta.data.info[0].edad;
      eraza.value = rta.data.info[0].raza;
      egenero.value = rta.data.info[0].genero;
      erecomendaciones.value = rta.data.info[0].recomendaciones;
    } catch (error) {
      alert("ERR:" + error.message);
    }
  }

  async function updMasc() {
    var eid = document.querySelector('input[name="_id"]');
    var enombre = document.querySelector('input[name="nombre"]');
    var eedad = document.querySelector('input[name="edad"]');
    var eraza = document.querySelector('input[name="raza"]');
    var egenero = document.querySelector('input[name="genero"]');
    var erecomendaciones = document.querySelector(
      'input[name="recomendaciones"]'
    );

    const data = {
      _id: eid.value,
      nombre: enombre.value,
      edad: eedad.value,
      raza: eraza.value,
      genero: egenero.value,
      recomendaciones: erecomendaciones.value,
    };

    try {
      const rta = await iAX.post("http://localhost:2001/masc/updMasc", {
        info: data,
      });

      alert("Actualizado");
    } catch (error) {
      alert("ERR:" + error.message);
    }
  }

  async function eliMasc() {
    var eid = document.querySelector('input[name="_id"]');

    const data = {
      _id: eid.value,
    };

    try {
      const rta = await iAX.post("http://localhost:2001/masc/eliMasc", {
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
              name="nombre"
              placeholder="nombre de la mascota"
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>edad</Form.Label>
            <Form.Control
              type="text"
              name="edad"
              placeholder="edad de la mascota"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>raza</Form.Label>
            <Form.Control
              type="text"
              name="raza"
              placeholder="raza de la mascota"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>genero</Form.Label>
            <Form.Control
              type="text"
              name="genero"
              placeholder="genero de la mascota"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>recomendaciones</Form.Label>
            <Form.Control
              type="text"
              name="recomendaciones"
              placeholder="recomendacion del cliente"
              required
            />
          </FormGroup>
          <div className="mt-5">
            <Button type="submit" variant="success">
              Crear
            </Button>
            <Button type="button" variant="warning" onClick={getAllMasc}>
               Mascotas
            </Button>
            <Button type="button" variant="secondary" onClick={getMasc}>
              Consultar
            </Button>
            <Button type="button" variant="info" onClick={updMasc}>
              Actualizar
            </Button>
            <Button type="button" variant="danger" onClick={eliMasc}>
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
                <th>edad</th>
                <th>raza</th>
                <th>genero</th>
                <th>recomendaciones</th>
              </tr>
            </thead>
            <tbody>
              {aMascota.map((d, i) => (
                <tr key={i}>
                  <td>{d._id}</td>
                  <td>{d.nombre}</td>
                  <td>{d.edad}</td>
                  <td>{d.raza}</td>
                  <td>{d.genero}</td>
                  <td>{d.recomendaciones}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Mascotas;
