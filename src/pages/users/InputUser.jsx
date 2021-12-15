import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import DropDown from '../../components/Dropdown';
import ButtonLoading from '../../components/ButtonLoading';
import useFormData from '../../hooks/useFormData';
import { CREAR_USUARIO } from '../../graphql/users/mutations';
import { Enum_Role } from '../../utils/enums';
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

const InputUser = () => {
    const { form, formData, updateFormData } = useFormData();

const [inputUser, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CREAR_USUARIO);

useEffect(() => {
    console.log('data mutation', mutationData);
    });

const submitForm = (e) => {
    e.preventDefault();
    inputUser({
        variables: formData,
    });
    window.location.reload(false);
    window.alert("Ha sido registrado con éxito");
    };


    return (
      <Container> 
        <div className='p-10 flex flex-col'>
          <div className='self-start'>
            <Link to='/usuarios'>
              <i className='fas fa-arrow-left' />
            </Link>
          </div>
          <h1 className='text-2xl font-bold text-gray-900 text-center'>REGISTRARSE</h1>
          <hr/><br/>
          <form ref={form} onChange={updateFormData} onSubmit={submitForm} className='text-center'>
            <Input name='email' label='Correo electrónico: ' required={true} type='text' /><br/>
            <Input name='documentId' label='Documento de Identidad: ' required={true} type='text' /><br/>
            <Input name= 'name' label='Nombre: ' required={true} type='text'/><br/>
            <Input name='lastName' label='Apellidos: ' required={true} type='text' /><br/>
            <Input name='password' label='Contraseña: ' required={true} type='text' /><br/>
            <DropDown label='Rol: ' options={Enum_Role} name='role' required={true} /><br/>
            <ButtonLoading text='Registrarse' loading={false} disabled={false}/>
            <hidden label= 'Estado' defaultValue= 'pending' name='status'/>
          </form>
        </div>
        </Container>
      );

};

export default InputUser;

