import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Input from "../../components/Input";
import { Link, useParams } from "react-router-dom";
import ButtonLoading from "../../components/ButtonLoading";
import useFormData from "../../hooks/useFormData";
import { GET_PROJECT } from "../../graphql/projects/queries";
import { CREAR_AVANCE } from "../../graphql/advances/mutations";
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "@sweetalert2/theme-bootstrap-4/bootstrap-4.css";

const InputAdvances = () => {
  const { form, formData, updateFormData } = useFormData();
  const { _id } = useParams();
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: { _id: _id },
  });
  useEffect(() => {
    console.log("datos proyectos", data);
  }, [data]);

  const [
    inputAdvance,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREAR_AVANCE);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log("data mutation", mutationData);
  });
  const history = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();

    inputAdvance({
      variables: { project_id: data.Project._id, ...formData },
    });
    //window.location.reload(false);
    //window.alert("El avance ha sido creado con éxito");
    Swal.fire({
      position: "center",
      icon: "success",
      title: `El avance ha sido creado exitosamente!`,
      showConfirmButton: true,
      //timer: 1500,
    });
    history("/proyectos");
  };

  if (loading) return <div>...Loading</div>;

  return (
    <Container>
      <div className="p-10 flex flex-col items-center">
        <div className="self-start">
          <Link to="/proyectos">
            <i className="fas fa-arrow-left" />
            PROYECTOS
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">CREAR AVANCE</h1>
        <hr />
        <br />
        <form
          ref={form}
          onChange={updateFormData}
          onSubmit={submitForm}
          className="text-center"
        >
          <input
            label="Proyecto: "
            defaultValue={data.Project.name}
            name="name"
            disabled
          />
          <br />
          <hidden
            label="Proyecto"
            defaultValue={data.Project._id}
            name="project_id"
          />
          <Input
            name="addDate"
            label="Fecha de Avance: "
            required={true}
            type="date"
          />
          <br />
          <Input
            name="description"
            label="Descripción: "
            required={true}
            type="text"
          />
          <br />
          <Input
            name="observations"
            label="Observaciones: "
            required={false}
            type="text"
          />
          <br />
          <ButtonLoading text="Crear Avance" loading={false} disabled={false} />
        </form>
      </div>
    </Container>
  );
};

export default InputAdvances;
