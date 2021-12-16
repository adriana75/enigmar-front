import React from 'react'
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";
import Input from '../../components/Input';
import ButtonLoading from '../../components/ButtonLoading';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Container className='text-center'>
                <form>
                    <div>
                        <h1 className='text-center'>SISTEMA DE GESTIÓN PARA PROYECTOS DE INVESTIGACIÓN</h1><hr/><br/><br/>
                        <h2 className='text-center'>INGRESAR</h2><br/><br/>
                        <p>Correo Electrónico:</p><input name='email' label='Correo electrónico: ' required={true} type='text' value="admin@enigma.com"/><br/><br/>
                        <p>Contraseña:</p><input name='password' label='Contraseña: ' required={true} type='password' value="admin"/><br/><br/>
                        <Link to={"/modulos/"} className='font-bold text-lg py-3 px-6  rounded-xl hover:bg-indigo-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700 btn btn-secondary mt-3 ms-3 mb-3'>Iniciar Sesión</Link>
                        <Link to={"/usuarios/crear"} className='font-bold text-lg py-3 px-6  rounded-xl hover:bg-indigo-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700 btn btn-secondary mt-3 ms-3 mb-3'>Registrarse</Link>
                    </div>
                </form>
            </Container>
        </div>
    )
}

export default Home
