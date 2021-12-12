import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import DropDown from '../../components/Dropdown';
import ButtonLoading from '../../components/ButtonLoading';
import useFormData from '../../hooks/useFormData';
import { GET_PROYECTOS } from '../../graphql/projects/queries';
import { CREAR_AVANCE } from '../../graphql/advances/mutations';

const InputAdvances = () => {
    const { form, formData, updateFormData } = useFormData();
    const [listProjects, setListProjects] = useState({});
    const { data, loading, error } = useQuery(GET_PROYECTOS); 
    useEffect(() => {
        console.log("datos proyectos", data);
      }, [data]);

const [inputAdvance, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CREAR_AVANCE);

useEffect(() => {
    console.log(data);
    if (data) {
        const lu = {};
        data.Projects.forEach((elemento) => {
        lu[elemento._id] = elemento.name;
        });

        setListProjects(lu);
    }
    }, [data]);

useEffect(() => {
    console.log('data mutation', mutationData);
    });

const submitForm = (e) => {
    e.preventDefault();

    inputAdvance({
        variables: formData,
    });
    };

    if (loading) return <div>...Loading</div>;

    return (
        <div className='p-10 flex flex-col items-center'>
          <div className='self-start'>
            <Link to='/avances'>
              <i className='fas fa-arrow-left' />
            </Link>
          </div>
          <h1 className='text-2xl font-bold text-gray-900'>Crear Avance</h1>
          <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
            <DropDown label='Proyecto' options={listProjects} name='project_id' required={true} />
            <Input name='addDate' label='Fecha de Avance' required={true} type='date' />
            <Input name='description' label='Descripción' required={true} type='text' />
            <Input name='observations' label='Observaciones' required={false} type='text' />
            <ButtonLoading text='Crear Avance' loading={false} disabled={false} />
          </form>
        </div>
      );

};

export default InputAdvances;