import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.css"; //core css
import "primeicons/primeicons.css";
import { Button } from "primereact/button";

export const Header = () => {
  const redireccionar = () => {
    window.open("https://instagram.com/douceamitie_quilpue", "_blank");
  };

  return (
    <div className="button-demo">
      <nav class="navbar navbar-light bg-header">
        <div class="container-fluid px-5 template">
          <Button
            className="youtube p-0"
            aria-label="Youtube"
            onClick={redireccionar}
          >
            <i className="pi pi-instagram px-2"></i>
            <span className="px-3">Instagram</span>
          </Button>

          <div className="d-flex">
            <div>
              <a className="c-blanco" href="/login">
                {" "}
                <i className="pi pi-key"></i>{" "}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
