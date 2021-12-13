import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Input from '../../components/Input';
import { Link, useParams } from 'react-router-dom';
import DropDown from '../../components/Dropdown';
import ButtonLoading from '../../components/ButtonLoading';
import useFormData from '../../hooks/useFormData';
import { GET_STUDENTS, GET_USUARIOS } from '../../graphql/users/queries';
import { CREAR_INSCRIPCIÓN } from '../../graphql/enrollments/mutaciones';
import { GET_PROJECT } from '../../graphql/projects/queries';
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";

const InputEnrollment = () => {
    const { form, formData, updateFormData } = useFormData();
    const { _id } = useParams();
    const [listStudents, setListStudents] = useState({});
    const { dataS} = useQuery(GET_STUDENTS, {variables: {_id: _id}});
    const {data, loading} = useQuery(GET_PROJECT, {variables: { _id: _id }});
    
    useEffect(() => {
        console.log("data students", dataS);
        console.log("data proyecto", data)
    }, [dataS, data]);

    const [inputEnrollment, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CREAR_INSCRIPCIÓN);

    useEffect(() => {
        console.log(dataS);
        if (dataS) {
          const lu = {};
          dataS.Students.forEach((elemento) => {
            lu[elemento._id] = elemento.email;
          });    
          setListStudents(lu);
        }
      }, [dataS]);
    
      useEffect(() => {
        console.log('data mutation', mutationData);
      });
    
      const submitForm = (e) => {
        e.preventDefault();
        console.log('data form', formData);
        inputEnrollment({
            variables: {project_id:data.Project._id, user_id:data._id, ...formData},
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
          <h1 className='text-2xl font-bold text-gray-900 text-center'>SOLICITAR INSCRIPCIÓN</h1><hr/><br/>
          <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
              <input label='Proyecto: ' defaultValue ={data.Project.name} name='name' disabled /><br/>
              <DropDown label='Estudiante: ' options={listStudents} name='user_id' required={true} /><br/>
              <Input name='enrollmentDate' label='Fecha de Inscripción: ' required={true} type='date' /><br/>
              <Input name='egressDate' label='Fecha de Fin: ' required={true} type='date' /><br/>
              <ButtonLoading text='Solicitar Inscripción' loading={false} disabled={false} />
          </form>
        </div>
        </Container>
    );

};

export default InputEnrollment;