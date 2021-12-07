import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { GET_INSCRIPCIONES } from '../../graphql/enrollments/queries';

const IndexEnrollments = () => {

    const { data, error, loading } = useQuery(GET_INSCRIPCIONES);
    useEffect(() => {
        console.log('data servidor', data);
    }, [data]);

    return (
        <div>
        Datos Inscripciones:
        <table>
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Usuario</th>
              <th>Estado</th>
              <th>Fecha de Inscripción</th>
              <th>Fecha Final</th>
            </tr>
          </thead>
          <tbody>
            {data && data.Enrollments ? (
              <>
                {data.Enrollments.map((e) => {
                  return (
                    <tr key={e._id}>
                      <td>{e.project_id}</td>
                      <td>{e.user_id}</td>
                      <td>{e.status}</td>
                      <td>{e.enrollmentDate}</td>
                      <td>{e.egressDate}</td>  
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

export default IndexEnrollments