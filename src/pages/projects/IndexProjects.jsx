import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROYECTOS } from "../../graphql/projects/queries";
import { EDITAR_PROYECTO_ESTADO, EDITAR_PROYECTO_FASE } from "../../graphql/projects/mutations";
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";
import useFormData from '../../hooks/useFormData';
import { Enum_statusProject, Enum_phaseProject } from "../../utils/enums";
import DropDown from '../../components/Dropdown';


const IndexProjects = () => {

  const { data: queryData, error, loading } = useQuery(GET_PROYECTOS);

  useEffect(() => {
    console.log("data servidor", queryData);
  }, [queryData]);

  return (
    <Container fluid>
      <div className='self-start'>
        <Link to='/modulos'>
          <i className='fas fa-arrow-left' />
          HOME
        </Link>
      </div>
    <Row>
      <div>
        <Link
        to={`/proyectos/crear/`}
        className="btn btn-secondary mt-3 ms-3 mb-3"
      >
        CREAR PROYECTO
      </Link>
      </div>
      <h2 className="text-center mt-3">PROYECTOS REGISTRADOS</h2>
      <hr /><br/><br/>
      
      <Table striped hover fluid className='text-center'>
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
            <th>Estado</th>
            <th>Fase</th>
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
                    <td>
                      <DropDownOptions id={p._id} name='status' options={Enum_statusProject} currentValue={p.status} mutation={EDITAR_PROYECTO_ESTADO} /> 
                    </td>
                    <td>
                      <DropDownOptions id={p._id} name='phase' options={Enum_phaseProject} currentValue={p.phase} mutation={EDITAR_PROYECTO_FASE} />
                    </td>
                    <td>
                    <Link
                            to={`/proyectos/editar/${p._id}`}
                            className="btn btn-secondary mt-3 ms-3 mb-3"
                          >
                            Editar Proyecto
                      </Link>
                    </td>
                    <td>
                    <Link
                          to={`/inscripciones/crear/${p._id}`}
                          className="btn btn-secondary mt-3 ms-3 mb-3"
                        >
                          Inscribirse
                    </Link>
                    </td>
                    <td>
                      {p.advances && p.advances.length > 0 ?
                        (
                          <Link
                            to={`/avances/${p._id}`}
                            className="btn btn-secondary mt-3 ms-3 mb-3"
                          >
                            Ver avances
                          </Link>
                        )
                        : ("")}
                    </td>
                    <td>
                      <Link
                            to={`/avances/crear/${p._id}`}
                            className="btn btn-secondary mt-3 ms-3 mb-3"
                          >
                            Crear avances
                      </Link>
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
    </Container>
  );
};

const DropDownOptions = ({ id, name, options, currentValue, mutation }) => {
  const { form, formData } = useFormData();
  const [editarProyecto, { data: dataMutation, loading, error }] = useMutation(mutation);

  const submitForm = (e) => {
    var newValue = e.target.options[e.target.options.selectedIndex].value;
    e.preventDefault();

    var proyectoEdit = { id: id };
    proyectoEdit[name] = newValue

    editarProyecto({
      variables: proyectoEdit,
    });
    if (name == "status") {
      window.alert("El estado del proyecto ha sido modificado con éxito");

    }
    else {
      window.alert("La fase del proyecto ha sido modificado con éxito");
    }
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
