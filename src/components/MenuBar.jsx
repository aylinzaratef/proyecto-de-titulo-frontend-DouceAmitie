import React from "react";
import { Menubar } from "primereact/menubar";
import { authContext } from "../context/contextUser";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
export const MenuBar = () => {
  const { currentUser, setCurrentUser } = useContext(authContext);

  const navigate = useNavigate();
  var items = [];
  var color = "";
  var perfil = "";
  var logout = "";
  window.sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  if (currentUser.perfil == "admin") {
    items = [
      {
        label: "Calendario",
        icon: "pi pi-fw pi-calendar-plus",
        command: (event) => {
          navigate("/home");
        },
      },
      {
        label: "Estadísticas",
        icon: "pi pi-fw pi-chart-line",
        items: [
          {
            label: "Gráfico de Barras",
            icon: "pi pi-fw pi-chart-bar",
            command: (event) => {
              window.location.href = "/statistics";
            },


          },
          {
            label: "Caja de Costos",
            icon: "pi pi-fw pi-box",
            command: (event) => {
              navigate("/box");
            },
          }],

      },
      {
        label: "Recetario",
        icon: "pi pi-fw pi-book",
        command: (event) => {
          navigate("/book");
        },
      },
      {
        label: "Trabajadores",
        icon: "pi pi-fw pi-users",
        className: "active",
        command: (event) => {
          navigate("/employees");
        },
      },

    ];
    color = "bg-dorado c-rosa";
    logout = "c-rosa"
    perfil = "Administrador";
  } else {
    items = [
      {
        label: "Calendario",
        icon: "pi pi-fw pi-calendar-plus",
        command: (event) => {
          navigate("/calendar");
        },
      },
      {
        label: "Recetario",
        icon: "pi pi-fw pi-book",
        command: (event) => {
          navigate("/mybook");
        },
      },
      {
        label: "Configuración",
        icon: "pi pi-fw pi-cog",
        command: (event) => {
          navigate("/settings");
        },
      },
    ];
    color = "bg-rosa c-blanco";
    logout = "c-blanco"
    perfil = "Pastelero";
  }

  const start = <h4 className="font-pastel pt-3">D.A.</h4>;

  return (
    <div className="container-menu">
      <nav className={"navbar navbar-light " + color}>
        <div className="container-fluid px-5">
          <span className="">Bienvenid@, {currentUser.nombre}</span>
          <div className="d-flex">
            <span className="mx-3"> {perfil}</span>
            <a onClick={() => { window.sessionStorage.removeItem("currentUser"); window.location.href = "/" }} className={logout} data-tip data-for="LogoutTooltip"><i className="pi pi-sign-out mt-1"></i> </a>
            <ReactTooltip id="LogoutTooltip" place="" type="dark" effect="solid">
              Cerrar Sesión
            </ReactTooltip>
          </div>
        </div>
      </nav>

      <Menubar model={items} start={start} />
    </div>
  );
};
