import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import useFormData from '../../hooks/useFormData';
import { GET_USUARIO } from '../../graphql/users/queries';
import { EDITAR_USUARIO } from '../../graphql/users/mutations';
import { toast } from 'react-toastify';
import ButtonLoading from '../../components/ButtonLoading.jsx';
import DropDown from '../../components/Dropdown';
import Input from '../../components/Input';
import { Enum_statusUser } from '../../utils/enums';

const UpdateUser = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id },
  });

  useEffect(() => {
    console.log('data user', queryData);
  }, [queryData])


  const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.role;
    editarUsuario({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
    }

    if (queryError) {
      toast.error('Error consultando el usuario');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/usuarios'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Usuario</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        <Input
          label='Nombre de la persona:'
          type='text'
          name='nombre'
          defaultValue={queryData}
          required={true}
        />
        <Input
          label='Apellido de la persona:'
          type='text'
          name='apellido'
          defaultValue={queryData}
          required={true}
        />
        <Input
          label='Correo de la persona:'
          type='email'
          name='correo'
          defaultValue={queryData}
          required={true}
        />
        <Input
          label='Identificación de la persona:'
          type='text'
          name='identificacion'
          defaultValue={queryData}
          required={true}
        />
        <DropDown
          label='Estado de la persona:'
          name='estado'
          defaultValue={queryData}
          required={true}
          options={Enum_statusUser}
        />
        <span>Rol del usuario: {queryData}</span>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Confirmar'
        />
      </form>
    </div>
  );
};

export default UpdateUser;