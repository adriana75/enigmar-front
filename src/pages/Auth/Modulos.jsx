import React from 'react';
import { Link } from "react-router-dom";
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";

const Modulos = () => {
    return (

        <div className="mt-20">
            <h1 className="text-center">SISTEMA DE GESTIÓN DE PROYECTOS DE INVESTIGACIÓN</h1><hr/><br/><br/><br/>
            <ul className="list-inline text-center">
                <Row>
                <li className="mb-4 list-unstyled list-inline-item">
                    <Link to ="/usuarios">                        
                        <button className="btn btn-secondary mt-3 ms-3 mb-3">
                            <h3>GESTIÓN DE USUARIOS</h3>
                        </button>     
                    </Link>
                    <Link to ="/proyectos">                        
                        <button className="btn btn-secondary mt-3 ms-3 mb-3">
                            <h3>GESTIÓN DE PROYECTOS</h3>
                        </button>     
                    </Link>
                    <Link to ="/inscripciones">                        
                        <button className="btn btn-secondary mt-3 ms-3 mb-3">
                            <h3>GESTIÓN DE INSCRIPCIONES</h3>
                        </button>     
                    </Link>
                    <Link to ="/avances">                        
                        <button className="btn btn-secondary mt-3 ms-3 mb-3">
                            <h3>GESTIÓN DE AVANCES</h3>
                        </button>     
                    </Link>
                </li>
                <li>
                    <Link to ="/">                        
                        <button className="btn btn-secondary mt-3 ms-3 mb-3">
                            <h3>SALIR</h3>
                        </button>     
                    </Link>
                </li>
                </Row>  
            </ul>
        </div>

    )
}

export default Modulos
