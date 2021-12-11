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
    <Container fluid>
      <h2 className="text-center mt-3">Datos inscripciones</h2>
      <hr />

      <Table striped hover fluid>
        <thead>
          <tr>
            <th>Nombre del Proyecto</th>
            <th>Nombre del Usuarios</th>
            <th>Estado</th>
            <th>Fecha de Inscripción</th>
            <th>Fecha Final</th>
            <th>Acciones</th>
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

                    <td className="text-center align-middle">
                      <Button
                        variant="secondary me-md-1 "
                        size="sm"
                        onClick={() =>
                          console.log("Cargar Proyecto específico")
                        }
                      >
                        Una acción
                      </Button>
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
    </Container>
  );
};

export default IndexEnrollments;
