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
    };


    return (
      <Container>
        <div className='p-10 flex flex-col items-center'>
          <div className='self-start'>
            <Link to='/usuarios'>
              <i className='fas fa-arrow-left' />
            </Link>
          </div>
          <h1 className='text-2xl font-bold text-gray-900'>Registrarse</h1>
          <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
            <Input name='email' label='Correo electrónico' required={true} type='text' />
            <Input name='documentId' label='Documento de Identidad' required={true} type='text' />
            <Input name= 'name' label='Nombre' required={true} type='text'/>
            <Input name='lastName' label='Apellidos' required={true} type='text' />
            <Input name='password' label='Contraseña' required={true} type='text' />
            <DropDown label='Rol' options={Enum_Role} name='role' required={true} />
            <ButtonLoading text='Registrarse' loading={false} disabled={false} />
            <hidden label= 'Estado' defaultValue= 'pending' name='status'/>
          </form>
        </div>
        </Container>
      );

};

export default InputUser;

