import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_AVANCES, GET_ADVANCEP } from "../../graphql/advances/queries";
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";

const IndexAdvances = () => {

  const { _id } = useParams();

  const mutation = _id ? GET_ADVANCEP : GET_AVANCES;
  const nameList = _id ? 'AdvanceP' : 'Advances';

  const { data, error, loading } = useQuery(mutation, { variables: { projectId: _id } })

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
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {data && data[nameList] ? (
            <>
              {data[nameList].map((a) => {
                return (
                  <tr key={a._id}>
                    <td>{a.project_id.name}</td>
                    <td>{a.addDate}</td>
                    <td>{a.description}</td>
                    <td>{a.observations}</td>
                    <td>
                      <Link
                        to={`/avances/editar/${a._id}`}
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
    </Container>
  );
};

export default IndexAdvances;
