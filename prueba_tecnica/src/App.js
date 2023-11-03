import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./componentes/Home/home";
import AgregarProducto from "./componentes/newProduct/AgregarProducto";
import ModificarProducto from "./componentes/modificar/modificarproducto";
import BuscarProducto from "./componentes/searchproduct/BuscarProducto";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Inventario de Productos</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agregar" element={<AgregarProducto />} />
            <Route path="/modificar" element={<ModificarProducto />} />
            <Route path="/buscar" element={<BuscarProducto />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
