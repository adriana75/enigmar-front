import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_AVANCES } from "../../graphql/advances/queries";
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";

const IndexAdvances = () => {
  const { data, error, loading } = useQuery(GET_AVANCES);
  useEffect(() => {
    console.log("data servidor", data);
  }, [data]);

  return (
    <Container>
      <h2 className="text-center mt-3">Datos avances</h2>
      <hr />
      <Table striped hover fluid>
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Fecha de Avance</th>
            <th>Descripción</th>
            <th>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {data && data.Advances ? (
            <>
              {data.Advances.map((a) => {
                return (
                  <tr key={a._id}>
                    <td>{a.project_id.name}</td>
                    <td>{a.addDate}</td>
                    <td>{a.description}</td>
                    <td>{a.observations}</td>
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

export default IndexAdvances;
