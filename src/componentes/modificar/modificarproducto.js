import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

function ModificarProducto() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Realiza una solicitud GET para obtener la lista de productos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://web-production-0986.up.railway.app/api/v1/productos/1'); // Reemplaza '1' con el negocioId apropiado
        if (response.status === 200) {
          const data = await response.json();
          setProductos(data);
        } else {
          console.error('Error al obtener la lista de productos');
        }
      } catch (error) {
        console.error('Error al obtener la lista de productos', error);
      }
    };
    fetchData();
  }, []);

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);

    // Aquí puedes cargar los detalles del producto seleccionado
    // utilizando un endpoint GET específico para el producto seleccionado
    // y luego establecer esos detalles en el formulario.
  };

  const onSubmit = async (data,selectedProduct) => {
    data = {
      ...data,
      
      valor: parseInt(data.valor),
      cantidad: parseInt(data.cantidad),
      margen: parseInt(data.margen),
    };

    try {
      const response = await fetch(`https://web-production-0986.up.railway.app/api/v1/productos/1/${selectedProduct}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        setSuccessMessage('Producto modificado exitosamente');
        setErrorMessage(null);
         // Redirige al usuario al inicio u otra página deseada
      } else {
        setErrorMessage('Error al modificar el producto');
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error('Error al modificar el producto', error);
      setErrorMessage('Error al modificar el producto');
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <h2>Modificar Producto</h2>
      <Link to="/">Volver al Inicio</Link>
      <form onSubmit={handleSubmit((data) => onSubmit(data, selectedProduct))}>
        <div>
          <label>Selecciona un Producto</label>
          <select onChange={handleProductChange} value={selectedProduct}>
            <option value="" disabled>Selecciona un Producto</option>
            {productos.map((product) => (
              <option key={product.id} value={product.id}>
                {product.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Nombre del Producto</label>
          <Controller
            name="nombre"
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo es obligatorio' }}
            render={({ field }) => <input {...field} type="text" />}
          />
          {errors.nombre && <span>{errors.nombre.message}</span>}
        </div>

        <div>
          <label>Imagen del Producto</label>
          <Controller
            name="imagen"
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo es obligatorio' }}
            render={({ field }) => <input {...field} type="text" />}
          />
          {errors.imagen && <span>{errors.imagen.message}</span>}
        </div>

        <div>
          <label>Descripción del Producto</label>
          <Controller
            name="descripcion"
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo es obligatorio' }}
            render={({ field }) => <input {...field} type="text" />}
          />
          {errors.descripcion && <span>{errors.descripcion.message}</span>}
        </div>

        <div>
          <label>Valor del Producto</label>
          <Controller
            name="valor"
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo es obligatorio' }}
            render={({ field }) => <input {...field} type="number" />}
          />
          {errors.valor && <span>{errors.valor.message}</span>}
        </div>

        <div>
          <label>Cantidad del Producto</label>
          <Controller
            name="cantidad"
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo es obligatorio' }}
            render={({ field }) => <input {...field} type="number" />}
          />
          {errors.cantidad && <span>{errors.cantidad.message}</span>}
        </div>

        <div>
          <label>Margen del Producto</label>
          <Controller
            name="margen"
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo es obligatorio' }}
            render={({ field }) => <input {...field} type="number" />}
          />
          {errors.margen && <span>{errors.margen.message}</span>}
        </div>

        <button type="submit">Modificar Producto</button>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default ModificarProducto;
