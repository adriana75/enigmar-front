import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USUARIOS } from "../../graphql/users/queries";
import { Enum_Role, Enum_statusUser } from "../../utils/enums";
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";

const IndexUsers = () => {
  const { data, error, loading } = useQuery(GET_USUARIOS);
  useEffect(() => {
    console.log("data servidor", data);
  }, [data]);

  return (
    <Container>
      <h2 className="text-center mt-3">Datos usuarios</h2>
      <hr />
      <Table striped hover fluid>
        <thead>
          <tr>
            <th>email</th>
            <th>Identificación</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Contraseña</th>
            <th>Editar</th>
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
                    <td>{Enum_Role[u.role]}</td>
                    <td>{Enum_statusUser[u.status]}</td>
                    <td>{u.password}</td>
                    <td>
                      <Link
                        to={`/usuarios/editar/${u._id}`}
                        className="btn btn-secondary mt-3 ms-3 mb-3"
                      >
                        Editar
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
      <br />
      <br />
      <h2 className="text-center mt-3">Datos Estudiantes</h2>
      <hr />
      <Table striped hover fluid>
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
          {data && data.Students ? (
            <>
              {data.Students.map((s) => {
                return (
                  <tr key={s._id}>
                    <td>{s.email}</td>
                    <td>{s.documentId}</td>
                    <td>{s.name}</td>
                    <td>{s.lastName}</td>
                    <td>{s.role}</td>
                    <td>{s.status}</td>
                    <td>{s.password}</td>
                  </tr>
                );
              })}
            </>
          ) : (
            <div>No autorizado</div>
          )}
        </tbody>
      </Table>
      <br />
      <br />
      <h2 className="text-center mt-3">Datos usuarios pendientes</h2>
      <hr />
      <Table striped hover fluid>
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
          {data && data.Pending ? (
            <>
              {data.Pending.map((pe) => {
                return (
                  <tr key={pe._id}>
                    <td>{pe.email}</td>
                    <td>{pe.documentId}</td>
                    <td>{pe.name}</td>
                    <td>{pe.lastName}</td>
                    <td>{pe.role}</td>
                    <td>{pe.status}</td>
                    <td>{pe.password}</td>
                  </tr>
                );
              })}
            </>
          ) : (
            <div>No autorizado</div>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default IndexUsers;
