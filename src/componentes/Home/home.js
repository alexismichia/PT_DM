import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Importa el archivo CSS

function Home() {
  return (
    <div className="home-container">
      <h2>Bienvenido al Inventario de Productos</h2>

      <Link to="/agregar" className="section-link">
        <section className="home-section">
          <h3 className="section-title">Agregar Nuevo Producto</h3>
          <p className="section-description">Seccion para agregar producto.</p>
        </section>
      </Link>

      <Link to="/modificar" className="section-link">
        <section className="home-section">
          <h3 className="section-title">Modificar Producto</h3>
          <p className="section-description">Seccion para modificar producto.</p>
        </section>
      </Link>

      <Link to="/buscar" className="section-link">
        <section className="home-section">
          <h3 className="section-title">Buscar Producto</h3>
          <p className="section-description">Seccion para buscar producto.</p>
        </section>
      </Link>
    </div>
  );
}

export default Home;
