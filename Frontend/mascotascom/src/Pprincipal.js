import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./componentes/Menu";
import Duenos from "./componentes/Duenos";
import "./App.css";
import Mascotas from "./componentes/Mascotas";
import Paseadores from "./componentes/Paseadores";
import Paseos from "./componentes/Paseos";
import Usuarios from "./componentes/Usuarios";
import Bienevenida from "./componentes/Bienvenida";
import Final from "./componentes/Final";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Pprincipal() {
  return (
    <>
     <div className="bg-dark text-white min-vh-100">
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Bienevenida />} />
          <Route path="/Ingresar" element={<Usuarios />} />
          <Route path="/Duen" element={<Duenos />} />
          <Route path="/Masc" element={<Mascotas />} />
          <Route path="/Pase" element={<Paseadores />} />
          <Route path="/Paseo" element={<Paseos />} />
          <Route path="*" element={<Pprincipal />} />
          <Route path="*" element={<Final />} />
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default Pprincipal;
