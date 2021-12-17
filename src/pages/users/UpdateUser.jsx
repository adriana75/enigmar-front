import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import useFormData from "../../hooks/useFormData";
import { GET_USUARIO } from "../../graphql/users/queries";
import { EDITAR_USUARIO } from "../../graphql/users/mutations";
import { toast } from "react-toastify";
import ButtonLoading from "../../components/ButtonLoading.jsx";
import DropDown from "../../components/Dropdown";
import Input from "../../components/Input";
import { Enum_statusUser } from "../../utils/enums";
import { Table, Container, Button, Image, Row, Figure } from "react-bootstrap";
import Swal from "sweetalert2";
import "@sweetalert2/theme-bootstrap-4/bootstrap-4.css";

const UpdateUser = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();
  const history = useNavigate();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id },
  });

  useEffect(() => {
    console.log("data user", queryData);
  }, [queryData]);

  const [
    editarUsuario,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.role;
    editarUsuario({
      variables: { id: _id, ...formData },
    });
    //window.location.reload(false);
    //window.alert("El usuario ha sido modificado con éxito");
    Swal.fire({
      position: "center",
      icon: "success",
      title: `El cambio en el usuario ha sido guardado exitosamente!`,
      showConfirmButton: true,
      //timer: 2500,
    });
    history("/usuarios");
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("Usuario modificado correctamente");
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error modificando el usuario");
    }

    if (queryError) {
      toast.error("Error consultando el usuario");
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <Container>
      <div className="flew flex-col w-full h-full items-center justify-center p-10">
        <Link to="/usuarios">
          <i className="fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
          USUARIOS
        </Link>
        <h1 className="m-4 text-3xl text-gray-800 font-bold text-center">
          EDITAR USUARIO
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
            label="Nombre de la persona: "
            type="text"
            name="name"
            defaultValue={queryData.User.name}
            required={true}
          />
          <br />
          <Input
            label="Apellido de la persona: "
            type="text"
            name="lastName"
            defaultValue={queryData.User.lastName}
            required={true}
          />
          <br />
          <Input
            label="Correo de la persona: "
            type="email"
            name="email"
            defaultValue={queryData.User.email}
            required={true}
          />
          <br />
          <Input
            label="Contraseña: "
            type="text"
            name="password"
            defaultValue={queryData.User.password}
            required={true}
          />
          <br />
          <DropDown
            label="Estado de la persona: "
            name="status"
            defaultValue={queryData.User.status}
            required={true}
            options={Enum_statusUser}
          />
          <br />
          <span>Rol del usuario: {queryData.User.role}</span>
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

export default UpdateUser;
