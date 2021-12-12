import React, { useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { GET_INSCRIPCIONES } from "../../graphql/enrollments/queries";
import { APROBAR_INSCRIPCION } from "../../graphql/enrollments/mutaciones"
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";
import { toast } from 'react-toastify';

const IndexEnrollments = () => {
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_INSCRIPCIONES)
  useEffect(() => {
    console.log("data servidor", queryData);
  }, [queryData]);

  //const { approveEnrollmentId } = useParams();
  const [aprobarInscripcion, { data, loading, error }] = useMutation(APROBAR_INSCRIPCION);
  
  useEffect(() => {
      if (data) {
        toast.success('Inscripcion aprobada con exito');
      }
    }, [data]);
  
    useEffect(() => {
      if (error) {
        toast.error('Error aprobando la inscripcion');
      }
      if (queryError) {
        toast.error('Error consultando la inscripción');
      }
    }, [queryError, error]);
  
    const cambiarEstadoInscripcion = ( approveEnrollmentId) => {
      aprobarInscripcion({
        variables: { approveEnrollmentId},
      });
    };
  
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
          {queryData && queryData.Enrollments ? (
            <>
              {queryData.Enrollments.map((e) => {
                return (
                  <tr key={e._id}>
                    <td>{e.project_id.name}</td>
                    <td>{e.user_id.name}</td>
                    <td>{e.status}</td>
                    <td>{e.enrollmentDate}</td>
                    <td>{e.egressDate}</td>
                    <td className="text-center align-middle">
                     {e.status === 'rejected' && (
                      <Button
                        variant="secondary me-md-1 "
                        size="sm"
                        onClick={() => {
                          console.log(e._id)
                          cambiarEstadoInscripcion(e._id);
                          window.location.reload(false);
                        }}
                      >
                        Aprobar Inscripción
                      </Button>
                      )}
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