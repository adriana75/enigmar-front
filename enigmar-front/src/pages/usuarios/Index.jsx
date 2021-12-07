import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { GET_USUARIOS } from '../../graphql/usuarios/queries'

const Index = () => {

    const { data, error, loading } = useQuery(GET_USUARIOS);
    useEffect(() => {
        console.log('data servidor', data);
    }, [data]);

    return (
        <div>
        Datos Usuarios:
        <table>
          <thead>
            <tr>
              <th>email</th>
              <th>Identificación</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Contraseña</th>
            </tr>
          </thead>
          <tbody>
            {data && data.Users ? (
              <>
                {data.Users.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u.email}</td>
                      <td>{u.documentId}</td>
                      <td>{u.name}</td>
                      <td>{u.lastName}</td>
                      <td>{u.role}</td>
                      <td>{u.status}</td>
                      <td>{u.password}</td>
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

export default Index
