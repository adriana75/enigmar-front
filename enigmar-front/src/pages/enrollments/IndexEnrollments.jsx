import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_INSCRIPCIONES } from "../../graphql/enrollments/queries";
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";

const IndexEnrollments = () => {
  const { data, error, loading } = useQuery(GET_INSCRIPCIONES);
  useEffect(() => {
    console.log("data servidor", data);
  }, [data]);

  return (
    <div>
      Datos Inscripciones:
      <Table striped bordered hover fluid>
        <thead>
          <tr>
            <th>Nombre del Proyecto</th>
            <th>Nombre del Usuarios</th>
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
                    <td>{e.project_id.name}</td>
                    <td>{e.user_id.name}</td>
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
      </Table>
    </div>
  );
};

export default IndexEnrollments;
