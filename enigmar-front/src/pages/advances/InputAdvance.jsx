import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Input from '../../components/Input';
import { Link, useParams } from 'react-router-dom';
import ButtonLoading from '../../components/ButtonLoading';
import useFormData from '../../hooks/useFormData';
import { GET_PROJECT } from '../../graphql/projects/queries' 
import { CREAR_AVANCE } from '../../graphql/advances/mutations';
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";

const InputAdvances = () => {
    const { form, formData, updateFormData } = useFormData();
    const { _id } = useParams();
    const { data, loading, error } = useQuery(GET_PROJECT, { variables: { id: _id } }); 
    useEffect(() => {
        console.log("datos proyectos", data);
      }, [data]);

const [inputAdvance, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CREAR_AVANCE);

useEffect(() => {
    console.log(data);
    }, [data]);

useEffect(() => {
    console.log('data mutation', mutationData);
    });

const submitForm = (e) => {
    e.preventDefault();

    inputAdvance({
        variables: {project_id:data.Project._id, ...formData},
    });
    window.location.reload(false);

    };

    if (loading) return <div>...Loading</div>;

    return (
      <Container>
        <div className='p-10 flex flex-col items-center'>
          <div className='self-start'>
            <Link to='/proyectos'>
              <i className='fas fa-arrow-left' />
              PROYECTOS
            </Link>
          </div>
          <h1 className='text-2xl font-bold text-gray-900'>Crear Avance</h1>
          <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
            <input label='Proyecto' defaultValue ={data.Project.name} name='name' disabled />
            <hidden label='Proyecto' defaultValue ={data.Project._id} name='project_id'/>
            <Input name='addDate' label='Fecha de Avance' required={true} type='date' />
            <Input name='description' label='Descripción' required={true} type='text' />
            <Input name='observations' label='Observaciones' required={false} type='text' />
            <ButtonLoading text='Crear Avance' loading={false} disabled={false} />
          </form>
        </div>
        </Container>
      );

};

export default InputAdvances;