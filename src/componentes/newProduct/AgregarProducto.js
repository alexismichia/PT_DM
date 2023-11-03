import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import './AgregarProducto.css';

const AgregarProducto = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearMessages = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmission = async (data) => {
    clearMessages();

    const parsedData = {
      ...data,
      categoriaId: 1,
      negocioId: 1,
      valor: parseInt(data.valor, 10),
      cantidad: parseInt(data.cantidad, 10),
      margen: parseInt(data.margen, 10),
    };

    const body = JSON.stringify(parsedData);

    try {
      const response = await fetch('https://web-production-0986.up.railway.app/api/v1/productos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      const responseData = await response.json();

      if (response.status === 201) {
        setSuccessMessage('Producto creado exitosamente');
        navigate('/');
      } else if (responseData && responseData.message === 'created') {
        setErrorMessage('El producto se creo correctamente');
      } else {
        setErrorMessage('Error al agregar producto');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error al agregar producto');
    }
  };

  return (
    <div>
      <h2>Agregar Nuevo Producto</h2>
      <Link to="/">Volver al Inicio</Link>
      <form onSubmit={handleSubmit(handleSubmission)}>
        <FormField
          label="Nombre del Producto"
          name="nombre"
          control={control}
          type="text"
          error={errors.nombre}
        />
        <FormField
          label="Código del Producto"
          name="codigo"
          control={control}
          type="text"
          error={errors.codigo}
        />
        <FormField
          label="Imagen del Producto"
          name="imagen"
          control={control}
          type="text"
          error={errors.imagen}
        />
        <FormField
          label="Descripción del Producto"
          name="descripcion"
          control={control}
          type="text"
          error={errors.descripcion}
        />
        <FormField
          label="Valor del Producto"
          name="valor"
          control={control}
          type="number"
          error={errors.valor}
        />
        <FormField
          label="Cantidad del Producto"
          name="cantidad"
          control={control}
          type="number"
          error={errors.cantidad}
        />
        <FormField
          label="Margen del Producto"
          name="margen"
          control={control}
          type="number"
          error={errors.margen}
        />

        <button type="submit">Agregar Producto</button>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

const FormField = ({ label, name, control, type, error }) => (
  <div>
    <label>{label}</label>
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: `Este campo es obligatorio` }}
      render={({ field }) => <input {...field} type={type} />}
    />
    {error && <span>{error.message}</span>}
  </div>
);

export default AgregarProducto;
