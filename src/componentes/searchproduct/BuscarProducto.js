import React, { useState, useEffect } from 'react';
import  jsPDF  from "jspdf";
import { Link } from 'react-router-dom';
import 'jspdf-autotable';
import "./BuscarProducto.css"
function BuscarProductos() {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(""); // Inicializa como cadena vacía
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };




  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.text('Información del Producto', 10, 10);

    if (selectedProductDetails) {
      const columns = [['Código', 'Nombre', 'Descripción']];
      const data = [[
        selectedProductDetails.codigo,
        selectedProductDetails.nombre,
        selectedProductDetails.descripcion,
      ]];

      doc.autoTable({
        head: columns,
        body: data,
        startY: 20,
      });
    } else if (productos.length > 0) {
      const columns = [['Código', 'Nombre', 'Descripción']];
      const data = productos.map((product) => [
        product.codigo,
        product.nombre,
        product.descripcion,
      ]);

      doc.autoTable({
        head: columns,
        body: data,
        startY: 20,
      });
    } else {
      doc.text('No se ha seleccionado un producto ni se ha proporcionado una lista', 10, 20);
    }

    doc.save('producto.pdf');
  };



  
  

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('https://web-production-0986.up.railway.app/api/v1/productos/1'); // Reemplaza con tu URL
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

    fetchProductos();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (selectedProduct !== "") { // Verifica si se ha seleccionado un producto
        try {
          const response = await fetch(`https://web-production-0986.up.railway.app/api/v1/productos/1/${selectedProduct}`); // Reemplaza con tu URL
          if (response.status === 200) {
            const data = await response.json();
            setSelectedProductDetails(data);
          } else {
            console.error('Error al obtener los detalles del producto seleccionado');
          }
        } catch (error) {
          console.error('Error al obtener los detalles del producto seleccionado', error);
        }
      }
    };

    fetchProductDetails();
  }, [selectedProduct]);

  return (
    <div className="component-container">
  <h2 className="component-title">Buscar Productos</h2>
  <div>
    <label className="form-label">Selecciona un Producto:</label>
    <select className="form-select" onChange={handleProductChange} value={selectedProduct}>
      <option value="">Selecciona un Producto</option>
      {productos.map((product) => (
        <option key={product.id} value={product.id}>
          {product.nombre}
        </option>
      ))}
    </select>
  </div>
  <div>
    <Link to="/">Volver al Inicio</Link>
    <button className="form-button" onClick={exportToPDF}>Exportar a PDF</button>
  </div>

  {selectedProductDetails && (
    <div>
      <h3 className="component-title">Información del Producto</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{selectedProductDetails.codigo}</td>
            <td>{selectedProductDetails.nombre}</td>
            <td>{selectedProductDetails.descripcion}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )}

  {!selectedProduct && productos.length > 0 && (
    <div>
      <h3 className="component-title">Lista de Todos los Productos</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((product) => (
            <tr key={product.id}>
              <td>{product.codigo}</td>
              <td>{product.nombre}</td>
              <td>{product.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
}

export default BuscarProductos;
