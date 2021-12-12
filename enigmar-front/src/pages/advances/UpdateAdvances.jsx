import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import useFormData from '../../hooks/useFormData';
import { GET_AVANCES, GET_ADVANCE } from '../../graphql/advances/queries';
import { toast } from 'react-toastify';
import ButtonLoading from '../../components/ButtonLoading.jsx';
import DropDown from '../../components/Dropdown';
import Input from '../../components/Input';
import { EDITAR_AVANCES} from '../../graphql/advances/mutations';
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";


const UpdateAdvances = () => {
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();

    const{
        data: queryData,
        error: queryError,
        loading: queryLoading,
    } = useQuery(GET_ADVANCE, {
        variables: {id: _id},
    });

    useEffect(() => {
        console.log('data advance', queryData);
    }, [queryData])

    const [editarAvance, {data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(EDITAR_AVANCES);
    
    const submitForm = (e) => {
        e.preventDefault();
        //delete formData.role;
        editarAvance({
            variables: { id: _id, ...formData },
        });
    };

    useEffect(() => {
        if (mutationData) {
          toast.success('Avance modificado correctamente');
        }
      }, [mutationData]);
    
    useEffect(() => {
    if (mutationError) {
        toast.error('Error modificando el avance');
    }

    if (queryError) {
        toast.error('Error consultando el avance');
    }
    }, [queryError, mutationError]);
    
    if (queryLoading) return <div>Cargando....</div>;

    return (
        <Container>
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
        <Link to='/proyectos'>
            <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            PROYECTOS
        </Link>
        <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Avance</h1>
        <form
            onSubmit={submitForm}
            onChange={updateFormData}
            ref={form}
            className='flex flex-col items-center justify-center'
        >
            <Input
            label='Fecha: '
            type='text'
            name='addDate'
            defaultValue={queryData.Advance.addDate}
            required={true}
            />
            <Input
            label='Descripción:'
            type='text'
            name='description'
            defaultValue={queryData.Advance.description}
            required={true}
            />
            <Input
            label='Observaciones:'
            name='observations'
            defaultValue={queryData.Advance.observations}
            required={true}
            />
            
            <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={mutationLoading}
            text='Confirmar'
            />
        </form>
    </div>
    </Container>
    );
};

export default UpdateAdvances;