import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROYECTOS } from "../../graphql/projects/queries";
import { GET_AVANCES } from "../../graphql/advances/queries";
import { EDITAR_PROYECTO } from "../../graphql/projects/mutations";
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";
import useFormData from '../../hooks/useFormData';
import { Enum_statusProject } from "../../utils/enums";
import DropDown  from '../../components/Dropdown';
import ButtonLoading from '../../components/ButtonLoading'

const IndexProjects = () => {

  const { data: queryData, error, loading } = useQuery(GET_PROYECTOS);
  useEffect(() => {
    console.log("data servidor", queryData);
  }, [queryData]);

  return (
    <Row>
      <h2 className="text-center mt-3">Datos proyectos</h2>
      <hr />
      <Table striped hover fluid>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Objetivo General</th>
            <th>Objetivos Específicos</th>
            <th>Presupuesto</th>
            <th>Fecha de Inicio</th>
            <th>Fecha Final</th>
            <th>Nombre del Líder</th>
            <th>Apellido del Líder</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Fase</th>
            <th>Avances</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {queryData && queryData.Projects ? (
            <>
              {queryData.Projects.map((p) => {
                return (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>{p.generalObjective}</td>
                    <td>{p.specificObjectives}</td>
                    <td>{p.budget}</td>
                    <td>{p.startDate}</td>
                    <td>{p.endDate}</td>
                    <td>{p.leader_id.name}</td>
                    <td>{p.leader_id.lastName}</td>
                    <td>{p.leader_id.role}</td>
                    <td>{p.status}</td>
                    <td>{p.phase}</td>
                    <td>{JSON.stringify(p.advances)}</td>
                    <td>
                    <FormEditProyecto _id={p._id} />
                    </td>

                  </tr>
                );
              })}
            </>
          ) : (
            <div>No autorizado</div>
          )}
        </tbody>
      </Table>
    </Row>
  );
};

const FormEditProyecto = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarProyecto, { data: dataMutation, loading, error }] = useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    editarProyecto({
      variables: {
        id: _id,
        status:formData.status,
      },
    });
  };

  useEffect(() => {
    console.log('data mutation', dataMutation);
    if(formData.status != undefined)
    {
      window.location.reload(false);
    }
  }, [dataMutation]);

  return (
    <div className='p-4'>
      <h1 className='font-bold'>Estado</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-center'
      >
        <DropDown name='status' options={Enum_statusProject} />
        <ButtonLoading disabled={false} loading={loading} text='Confirmar' />
      </form>
    </div>
  );
};

export default IndexProjects;
