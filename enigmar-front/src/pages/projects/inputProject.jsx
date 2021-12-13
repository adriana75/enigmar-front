import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import DropDown from '../../components/Dropdown';
import ButtonLoading from '../../components/ButtonLoading';
import useFormData from '../../hooks/useFormData';
import { GET_USUARIOS, GET_LIDER } from '../../graphql/users/queries';
import { CREAR_PROYECTO } from '../../graphql/projects/mutations';
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";

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
    console.log('data form', formData);

    //Generar los objetivos como Array
    var objectives = formData.specificObjectives.split("\r\n");
    formData.specificObjectives = [];
    for (var i = 0; i < objectives.length; i++) {
      var objective = objectives[i];
      if (objective.length > 0) {
        formData.specificObjectives.push(objective);
      }
    }

    inputProject({
      variables: formData,
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
      <h1 className='text-2xl font-bold text-gray-900 text-center'>NUEVO PROYECTO</h1><hr/><br/>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <div>
          <Input name='name' label='Nombre del Proyecto: ' required={true} type='text' /><br/>
          <Input name='budget' label='Presupuesto del Proyecto: ' required={true} type='number' /><br/>
          <Input name='startDate' label='Fecha de Inicio: ' required={true} type='date' /><br/>
          <Input name='endDate' label='Fecha de Fin: ' required={true} type='date' /><br/>
          <DropDown label='Líder: ' options={listUsers} name='leader_id' required={true} />
        </div>

        <div>
          <Input name='generalObjective' label='Objetivo General: ' required={true} type='text' />
        </div>

        Objetivos Especificos
        <div>
          <textarea name='specificObjectives' label='Objetivos Específicos: ' required placeholder="Ingrese un objetivo por linea" rows="10" cols="50" />
        </div>

        <div>
          <ButtonLoading text='Crear Proyecto' loading={false} disabled={false} />
        </div>
      </form>
    </div>
    </Container>
  );

};

export default InputProject;