import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_INSCRIPCIONES } from "../../graphql/enrollments/queries";
import { APROBAR_INSCRIPCION } from "../../graphql/enrollments/mutaciones";
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "@sweetalert2/theme-bootstrap-4/bootstrap-4.css";

const IndexEnrollments = () => {
  const history = useNavigate();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_INSCRIPCIONES);
  useEffect(() => {
    console.log("data servidor", queryData);
  }, [queryData]);

  const [aprobarInscripcion, { data, loading, error }] =
    useMutation(APROBAR_INSCRIPCION);

  useEffect(() => {
    if (data) {
      toast.success("Inscripcion aprobada con exito");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error aprobando la inscripcion");
    }
    if (queryError) {
      toast.error("Error consultando la inscripción");
    }
  }, [queryError, error]);

  const cambiarEstadoInscripcion = (approveEnrollmentId) => {
    aprobarInscripcion({
      variables: { approveEnrollmentId },
    });
  };

  return (
    <Container>
      <div className="self-start">
        <Link to="/modulos">
          <i className="fas fa-arrow-left" />
          HOME
        </Link>
      </div>
      <Link to="/proyectos">
        <i className="fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
        PROYECTOS
      </Link>
      <h2 className="text-center mt-3">INSCRIPCIONES</h2>
      <hr />
      <br />
      <br />

      <Table striped hover fluid className="text-center">
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
                      {e.status === "rejected" && (
                        <Button
                          variant="secondary me-md-1 "
                          size="sm"
                          onClick={() => {
                            console.log(e._id);
                            cambiarEstadoInscripcion(e._id);
                            //window.location.reload(false);
                            //window.alert("La inscripción ha sido aprobada");
                            Swal.fire({
                              position: "center",
                              icon: "success",
                              title: `La inscripción ha sido aprobada!`,
                              showConfirmButton: true,
                              //timer: 1500,
                            });
                            history("/proyectos");
                          }}
                        >
                          Aprobar
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
