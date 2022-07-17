import { useContext, useState, useEffect } from "react";
import React from "react";
import "./landing.scss";
import { Carrusel } from "../components/Carrusel";
import { Cards } from "../components/cards/Cards";
import { Testimonial } from "../components/Testimonial";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.css"; //core css
import "primeicons/primeicons.css";

export const Landing = () => {
  const [menu, setMenu] = useState(false);
  const openMenu = () => {
    if (menu) {
      setMenu(false);
      document.getElementById("navbarResponsive").style.display = "block";
    } else {
      setMenu(true);
      document.getElementById("navbarResponsive").style.display = "none";
    }
  };
  const redireccionarWhatsapp = () => {
    window.open(
      "https://api.whatsapp.com/message/MPSAXM7OQ37ND1?autoload=1&app_absent=0",
      "_blank"
    );
  };
  const redireccionarInstagram = () => {
    window.open("https://instagram.com/douceamitie_quilpue", "_blank"
    );
  };

  return (
    <div>
      {/*NAVBAR */}
      <nav
        className="navbar navbar-expand-lg bg-header text-uppercase sticky-top"
        id="mainNav"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler text-uppercase font-weight-bold bg-rosa text-white rounded"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={openMenu}          >
            <i className="pi pi-bars"></i>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarResponsive"
          >
            <ul className="navbar-nav">
              <li className="nav-item mx-0 mx-lg-2">
                <a
                  className="nav-link py-3 px-0 px-lg-1 rounded c-chocolate h6"
                  href="#portfolio"
                >
                  Productos
                </a>
              </li>
              <li className="nav-item mx-0 mx-lg-2">
                <a
                  className="nav-link py-3 px-0 px-lg-1 rounded c-chocolate h6"
                  href="#about"
                >
                  Nosotras
                </a>
              </li>
              <li className="content-img-menu d-none d-lg-none d-xl-block">
                <a href="/">
                  <img src={`images/logo2.png`} className="img-menu-landing" />
                </a>
              </li>

              <li className="nav-item mx-0 mx-lg-2">
                <a
                  className="nav-link py-3 px-0 px-lg-1 rounded c-chocolate h6"
                  href="#clientes"
                >
                  Nuestros clientes
                </a>
              </li>
              <li className="nav-item mx-0 mx-lg-2">
                <a
                  className="nav-link py-3 px-0 px-lg-1 rounded c-chocolate h6"
                  href="/faq"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav >
      <section className="page-section portfolio banner-landing" id="">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-md-12 col-lg-12 col-xl-12">
            </div>
          </div>
        </div>
      </section>

      <section className="page-section  portfolio" id="portfolio">
        <h2 className="page-section-heading text-center text-uppercase c-chocolate">
          Nuestros Productos
        </h2>
        <div className="divider-custom c-chocolate">
          <div className="divider-custom-line"></div>
          <div className="divider-custom-icon">
            <i className="pi pi-star-fill"></i>
          </div>
          <div className="divider-custom-line"></div>
        </div>
        <Carrusel />
      </section>

      <section className="page-section bg-header c-chocolate mb-0" id="about">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase c-chocolate">
            Nosotras
          </h2>
          <div className="divider-custom divider">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
          <div className="row">
            <div className="col-lg-4 ms-auto">
              <p className="lead">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
            <div className="col-lg-4 me-auto">
              <p className="lead">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="page-section pb-100  pt-5 mt-3" id="clientes">
        <div class="container">
          <h2 className="page-section-heading text-center text-uppercase c-chocolate my-4">
            Clientes
          </h2>
          <div className="divider-custom c-chocolate">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="pi pi-star-fill"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
          <div class="row align-items-center">
            <div class="col-md-6 col-lg-5 mb-4 mb-sm-4 mb-md-0 mb-lg-0">
              <div class="testimonial-heading text-principal">
                <h2 class="text-principal">
                  ¿Qué dicen nuestros clientes sobre nuestro servicio?
                </h2>
                <p class="text-principal">
                  Nuestros clientes quedan satisfechos con nuestros servicios,
                  no solo por la profesionalidad y el trato, si no también por
                  los precios bajos y la amabilidad que bridan nuestros
                  trabajadores.
                </p>
              </div>
            </div>
            <div class="col-md-6 col-lg-6">
              <Testimonial />
            </div>
          </div>
        </div>
      </section>

      <footer className="footer text-center bg-header c-chocolate">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h4 className="text-uppercase mb-4">Encuéntranos</h4>
              <p className="lead mb-0">
                1234 Avenida Gran Calle
                <br />
                Quilpué, Valparaíso.
              </p>
            </div>
            <div className="col-lg-6">
              <h4 className="text-uppercase mb-4">Enlaces</h4>
              <p>
                <a href="#" onClick={redireccionarWhatsapp} className="c-chocolate">
                  <i className="pi pi-whatsapp"></i> Whatsapp
                </a>
              </p>
              <p>
                <a href="#" onClick={redireccionarInstagram} className="c-chocolate">
                  <i className="pi pi-instagram" /> Instagram
                </a>
              </p>
              <p>
                <a href="/login" className="c-chocolate">
                  <i className="pi pi-key" /> Iniciar Sesión
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright py-4 text-center c-chocolate bg-white">
        <div className="container">
          <small>Copyright &copy; Your Website 2022</small>
        </div>
      </div>

      {/* <div className="button-demo fixed-bottom">
        <div className="template">
          <Button
            className="button-demo template youtube p-0"
            aria-label="Youtube"
            onClick={redireccionarInstagram}
          >
            <i className="pi pi-instagram px-2"></i>
            <span className="px-3">Instagram</span>
          </Button>
        </div>
      </div>*/ }
      {/* <div className="button-demo fixed-bottom">
        <div className="template">
          <Button
            className="vimeo p-0"
            aria-label="Whatsapp"
            onClick={redireccionarWhatsapp}
          >
            <i className="pi pi-whatsapp px-2"></i>
            <span className="px-3">Haz tu pedido</span>
          </Button>
        </div>
      </div>*/}
      <a onClick={redireccionarInstagram} className="btn-insta" >
        <i className="pi pi-instagram"></i>
      </a>
      <a onClick={redireccionarWhatsapp} className="btn-wsp">
        <i className="pi pi-whatsapp"></i>
      </a>

    </div >
  );
};
