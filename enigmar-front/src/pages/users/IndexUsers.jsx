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
      <h2 className="text-center mt-3">USUARIOS REGISTRADOS</h2>
      <hr />
      <Table striped hover fluid>
        <thead>
          <tr>
            <th>Email</th>
            <th>Identificación</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rol</th>
            <th>Estado</th>
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
    </Container>
  );
};

export default IndexUsers;
