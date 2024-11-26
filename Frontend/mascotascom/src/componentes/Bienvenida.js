import "bootstrap/dist/css/bootstrap.css";
import miImagen from "../img/perrito.jpg";

function Bienevenida() {
  return (
    <>
      
      <div
        className="d-flex justify-content-center align-items-center vh-100 w-100"
        style={{
          backgroundImage: `url(${miImagen})`,
          backgroundSize: "cover", // Hace que la imagen cubra toda la pantalla
          backgroundPosition: "center", // Centra la imagen
        }}
      ></div>
    </>
  );
}

export default Bienevenida;
