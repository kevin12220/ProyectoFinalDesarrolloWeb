import { Button, Form, FormGroup } from "react-bootstrap";
import iAX from "../ConfigAXIOS";
import { useDispatch } from "react-redux";
import { setMiToken } from "../reducers";
import "bootstrap/dist/css/bootstrap.css";

function Usuarios() {
  const disp = useDispatch();

  async function insUser(data) {
    try {
      const rta = await iAX.post("http://localhost:2001/usr/insUser", {
        info: data,
      });

      alert("Usuario creado");
    } catch (error) {
      alert("ERR:" + error.message);
    }
  }

  const validaForma = (event) => {
    try {
      event.preventDefault();
      const form = event.currentTarget;

      if (form.checkValidity() === false) {
        document.getElementById("rta").innerHTML = alert(
          "Formulario presenta errores"
        );
      } else {
        const data = {
          usuario: form.elements.usuario.value,
          contraseña: form.elements.contraseña.value,
        };

        insUser(data);
      }
    } catch (error) {
      document.getElementById("rta").innerHTML = alert("ERR:" + error.message);
    }
  };

  // LOGIN
  async function login() {
    var euser = document.querySelector('input[name="usuario"]');
    var econtraseña = document.querySelector('input[name="contraseña"]');

    const data = {
      usuario: euser.value,
      contraseña: econtraseña.value,
    };

    try {
      const rta = await iAX.post("/user/login", {
        info: data,
      });

      alert("Tu Token -------- " + JSON.stringify(rta.data.info));

      disp(setMiToken(rta.data.info));
    } catch (error) {
      alert("ERR:" + error.message);
    }
  }

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Form
          className="bg-light p-4 rounded shadow"
          style={{ width: "80%", maxWidth: "400px" }}
          noValidate
          onSubmit={validaForma}
        >
          <FormGroup>
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="email"
              name="usuario"
              placeholder="usuario"
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="contraseña"
              placeholder="constraseña"
              required
            />
          </FormGroup>
          <div className="mt-5">
            <Button type="submit" variant="danger">
              Crear Usuario
            </Button>
            <Button type="button" variant="warning" onClick={login}>
              Login
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Usuarios;
