import React from "react";
import { Header } from "../components/Header";
import "./landing.scss";
import { Carrusel } from "../components/Carrusel";
import { Cards } from "../components/cards/Cards";
import { Testimonial } from "../components/Testimonial";
import { Button } from 'primereact/button';

export const Landing = () => {
  const redireccionar = () => {
    window.open("https://api.whatsapp.com/message/MPSAXM7OQ37ND1?autoload=1&app_absent=0", "_blank")
  }
  return (
    <div>
      <Header />
      {/*NABVAR */}
      <nav
        className="navbar navbar-expand-lg bg-blanco text-uppercase sticky-top"
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
          >
            Menu
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
              <li className="nav-item mx-0 mx-lg-2">
                <a
                  className="nav-link py-3 px-0 px-lg-1 rounded c-chocolate h6"
                  href="#portfolio"
                >
                  Productos Destacados
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
          <Button icon="pi pi-whatsapp" label="Haz tu pedido" className="p-button-rounded p-button-success" onClick={redireccionar} />
        </div>
      </nav>
      <section className="page-section portfolio  bg-rosa" id="">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 text-center d-block d-md-none d-lg-none d-xl-none">
              <img src={`images/logo.png`} className="w-50" />
            </div>
            <div className="col-12 col-md-8 col-lg-8 col-xl-8">
              <Carrusel />
            </div>
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 text-center d-none d-md-block d-lg-block d-xl-block">
              <img src={`images/logo.png`} className="w-50" />
            </div>
          </div>
        </div>
      </section>

      <section className="page-section portfolio" id="portfolio">
        <h2 className="page-section-heading text-center text-uppercase c-chocolate my-4">
          Destacados
        </h2>
        <div className="divider-custom c-chocolate">
          <div className="divider-custom-line"></div>
          <div className="divider-custom-icon">
            <i className="pi pi-star-fill"></i>
          </div>
          <div className="divider-custom-line"></div>
        </div>
        <Cards />
      </section>

      <section className="page-section bg-rosa text-white mb-0" id="about">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-white">
            About
          </h2>
          <div className="divider-custom divider-light">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
          <div className="row">
            <div className="col-lg-4 ms-auto">
              <p className="lead">
                Freelancer is a free bootstrap theme created by Start Bootstrap.
                The download includes the complete source files including HTML,
                CSS, and JavaScript as well as optional SASS stylesheets for
                easy customization.
              </p>
            </div>
            <div className="col-lg-4 me-auto">
              <p className="lead">
                You can create your own custom avatar for the masthead, change
                the icon in the dividers, and add your email address to the
                contact form to make it fully functional!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="page-section pb-100 pt-5 mt-3" id="clientes">
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
                <h2 class="text-principal">¿Qué dicen nuestros clientes sobre nuestro servicio?</h2>
                <p class="text-principal">Nuestros clientes quedan satisfechos con nuestros servicios, no solo por la profesionalidad y el trato, si no también por los precios bajos y la amabilidad que bridan nuestros trabajadores.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-6">
              <Testimonial />
            </div>
          </div>
        </div>
      </section>

      <footer className="footer text-center bg-rosa">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h4 className="text-uppercase mb-4">Encuentranos</h4>
              <p className="lead mb-0">
                2215 John Daniel Drive
                <br />
                Clark, MO 65243
              </p>
            </div>
            <div className="col-lg-6">
              <h4 className="text-uppercase mb-4">Enlaces</h4>
              <p>
                <a><i className="pi pi-whatsapp"></i> Whatsapp</a>
              </p>
              <p>
                <a><i className="pi pi-instagram" /> Instagram</a>
              </p>
              <p>
                <a href="/login" className="text-white"><i className="pi pi-key" /> Iniciar Sesión</a>
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
    </div>
  );
};
