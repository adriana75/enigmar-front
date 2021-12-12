import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import DropDown from '../../components/Dropdown';
import ButtonLoading from '../../components/ButtonLoading';
import useFormData from '../../hooks/useFormData';
import { nanoid } from 'nanoid';
import { GET_USUARIOS, GET_LIDER } from '../../graphql/users/queries';
import { CREAR_PROYECTO } from '../../graphql/projects/mutations';

const InputProject = () => {
    const { form, formData, updateFormData } = useFormData();
    const [listUsers, setListUsers] = useState({});
    const { data, loading, error } = useQuery(GET_LIDER); 
    useEffect(() => {
        console.log("data filtrada", data);
      }, [data]);

const [inputProject, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CREAR_PROYECTO);

useEffect(() => {
    console.log(data);
    if (data) {
        const lu = {};
        data.LiderAut.forEach((elemento) => {
        lu[elemento._id] = elemento.email;
        });

        setListUsers(lu);
    }
    }, [data]);

useEffect(() => {
    console.log('data mutation', mutationData);
    });

const submitForm = (e) => {
    e.preventDefault();

    formData.budget = parseFloat(formData.budget);

    inputProject({
        variables: formData,
    });
    };

    if (loading) return <div>...Loading</div>;

    return (
        <div className='p-10 flex flex-col items-center'>
          <div className='self-start'>
            <Link to='/proyectos'>
              <i className='fas fa-arrow-left' />
            </Link>
          </div>
          <h1 className='text-2xl font-bold text-gray-900'>Crear Nuevo Proyecto</h1>
          <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
            <Input name='name' label='Nombre del Proyecto' required={true} type='text' />
            <Input name='generalObjective' label='Objetivo General' required={true} type='text' />
            <Input name= 'specificObjectives' label='Objetivos Específicos' required={true} type='text'/>
            <Input name='budget' label='Presupuesto del Proyecto' required={true} type='number' />
            <Input name='startDate' label='Fecha de Inicio' required={true} type='date' />
            <Input name='endDate' label='Fecha de Fin' required={true} type='date' />
            <DropDown label='Líder' options={listUsers} name='leader_id' required={true} />
            <ButtonLoading text='Crear Proyecto' loading={false} disabled={false} />
          </form>
        </div>
      );

};

export default InputProject;