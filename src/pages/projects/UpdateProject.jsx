import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import useFormData from "../../hooks/useFormData";
import { toast } from "react-toastify";
import ButtonLoading from "../../components/ButtonLoading.jsx";
import DropDown from "../../components/Dropdown";
import Input from "../../components/Input";
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";
import { EDITAR_PROYECTO } from "../../graphql/projects/mutations";
import { GET_PROJECT } from "../../graphql/projects/queries";

import Swal from "sweetalert2";
import "@sweetalert2/theme-bootstrap-4/bootstrap-4.css";

const UpdateProject = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROJECT, {
    variables: { _id },
  });

  useEffect(() => {
    console.log("data project", queryData);
  }, [queryData]);

  const [
    editarProyecto,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_PROYECTO);
  const history = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();
    formData.budget = parseFloat(formData.budget);
    editarProyecto({
      variables: { id: _id, ...formData },
    });
    //window.location.reload(false);
    //window.alert("El proyecto ha sido modificado con éxito");
    Swal.fire({
      position: "center",
      icon: "success",
      title: `El proyecto ha sido modificado exitosamente!`,
      showConfirmButton: true,
      //timer: 1500,
    });
    history("/proyectos");
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("Proyecto modificado correctamente");
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error modificando el proyecto");
    }

    if (queryError) {
      toast.error("Error consultando el proyecto");
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <Container>
      <div className="flew flex-col w-full h-full items-center justify-center p-10">
        <Link to="/proyectos">
          <i className="fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
          PROYECTOS
        </Link>
        <h1 className="m-4 text-3xl text-gray-800 font-bold text-center">
          EDITAR PROYECTO
        </h1>
        <hr />
        <br />
        <form
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}
          className="flex flex-col items-center justify-center text-center"
        >
          <Input
            label="Nombre del Proyecto: "
            type="text"
            name="name"
            defaultValue={queryData.Project.name}
            required={true}
          />
          <br />
          <Input
            label="Objetivos Generales: "
            type="text"
            name="generalObjective"
            defaultValue={queryData.Project.generalObjective}
            required={true}
          />
          <br />
          <Input
            label="Objetivos Específicos: "
            type="text"
            name="specificObjectives"
            defaultValue={queryData.Project.specificObjectives}
            required={true}
          />
          <br />
          <Input
            label="Presupuesto: "
            type="number"
            name="budget"
            defaultValue={queryData.Project.budget}
            required={true}
          />
          <br />
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={mutationLoading}
            text="Confirmar"
          />
        </form>
      </div>
    </Container>
  );
};

export default UpdateProject;
