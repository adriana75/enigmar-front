import React from "react";
import { Container, Nav, Navbar, Row } from "react-bootstrap"; //Componentes usados en la construcción de la barra de navegación
import { Link } from "react-router-dom"; //Este componente redigire en la barra de direcciones a una ruta en Router sin recargar la App como con href

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container fluid>
        <Link to="/" className="navbar-brand">
          Enigma-R
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/" className="nav-link">
              Inicio
            </Link>
            <Link to="/usuarios" className="nav-link">
              {" "}
              Usuarios
            </Link>

            <Link to="/proyectos" className="nav-link">
              Proyectos
            </Link>
            <Link to="/inscripciones" className="nav-link">
              Inscripciones
            </Link>
            <Link to="/avances" className="nav-link">
              Avances
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
