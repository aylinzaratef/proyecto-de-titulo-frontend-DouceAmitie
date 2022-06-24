import React from "react";
import CalendarTrabajador from "../components/CalendarTrabajador";
import { MenuBar } from "../components/MenuBar";
import { useContext, useState, useEffect } from "react";
import { authContext } from "../context/contextUser";
import { ProductService } from "../components/ProductService";

const productService = new ProductService();
const p = Promise.resolve(productService.getPedidos());
var appointments = [];
try {
  appointments = await p;
} catch (err) {
  console.log(err);
}

export const HomeTrabajador = () => {
  const { currentUser, setCurrentUser } = useContext(authContext);
  appointments = appointments.filter(p => p.rutTrabajador == currentUser.rut)
  console.log(currentUser.rut);
  return (
    <div>
      <MenuBar />
      <div className="pt-3 pt-lg-0 todo-rosa">
        <img
          src={`images/logo.png`}
          className="img-calendario d-none d-lg-block d-xl-block"
        />
        <CalendarTrabajador user={currentUser} data={appointments} />
      </div>
    </div>
  );
};
