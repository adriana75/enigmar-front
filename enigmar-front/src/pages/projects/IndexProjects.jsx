import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROYECTOS } from "../../graphql/projects/queries";
import { GET_AVANCES } from "../../graphql/advances/queries";
import { EDITAR_PROYECTO_ESTADO, EDITAR_PROYECTO_FASE } from "../../graphql/projects/mutations";
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";
import useFormData from '../../hooks/useFormData';
import { Enum_statusProject, Enum_phaseProject } from "../../utils/enums";
import DropDown from '../../components/Dropdown';
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
                      <td>
                          <DropDownOptions id={p._id} name='status' options={Enum_statusProject} currentValue={p.status} mutation = {EDITAR_PROYECTO_ESTADO} />
                      </td>
                      <td>
                          <DropDownOptions id={p._id} name='phase' options={Enum_phaseProject} currentValue={p.phase} mutation = {EDITAR_PROYECTO_FASE} />
                      </td>
                      <td>{JSON.stringify(p.advances)}</td>
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

const DropDownOptions = ({ id, name, options, currentValue, mutation }) => {
  const { form, formData } = useFormData();
  const [editarProyecto, { data: dataMutation, loading, error }] = useMutation(mutation);

  const submitForm = (e) => {
    var newValue = e.target.options[e.target.options.selectedIndex].value;
    e.preventDefault();

    var proyectoEdit = {id: id};
    proyectoEdit[name] = newValue

    editarProyecto({
      variables: proyectoEdit,
    });
  };

  useEffect(() => {
    if (formData.status != undefined) {
      window.location.reload(false);
    }
  }, [dataMutation]);

  return <form
    ref={form}
    onChange={submitForm}
    className='flex flex-col items-center'
  >
    <DropDown name={name} options={options} defaultValue={currentValue} />
  </form>;
};

export default IndexProjects;
