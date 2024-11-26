import  Nav  from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import  Navbar  from "react-bootstrap/Navbar";

function Menu() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">MiPerrito.com</Navbar.Brand>
          <Nav activeKey="/">
            <Nav.Item>
              <Nav.Link href="/Ingresar">Usuario</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/Duen">Dueños</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/Masc">Mascotas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/Pase">Paseadores</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/Paseo">Paseos</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;
