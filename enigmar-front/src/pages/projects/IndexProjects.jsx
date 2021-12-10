import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { GET_PROYECTOS } from '../../graphql/projects/queries';
import { GET_AVANCES } from '../../graphql/advances/queries';

const IndexProjects = () => {

    const { data, error, loading } = useQuery(GET_PROYECTOS);
    useEffect(() => {
        console.log('data servidor', data);
    }, [data]);

    return (
        <div>
        Datos Proyectos:
        <table>
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
            {data && data.Projects ? (
              <>
                {data.Projects.map((p) => {
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
                      <td>{p.advances.description}</td>  
                    </tr>
                  );
                })}
              </>
            ) : (
              <div>No autorizado</div>
            )}
          </tbody>
        </table>
      </div>
    )
}

export default IndexProjects