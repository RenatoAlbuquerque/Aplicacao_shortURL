import React, { Children, useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Home from "../Pages/Home";
import AddUnkown from "../Pages/AddUnkown";
import TopUrl from "../Pages/TopUrl";
import UserUrl from "../Pages/UserUrl";

import ProductsProvider from "../providers/products";

const Rotas = () => {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/urlunk" element={<AddUnkown />} />
          <Route path="/topurl" element={<TopUrl />} />
          <Route path="/userurl" element={<UserUrl />} />
        </Routes>
      </ProductsProvider>
    </BrowserRouter>
  );
};

export default Rotas;
