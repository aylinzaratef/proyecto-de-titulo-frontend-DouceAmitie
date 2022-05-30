import React from "react";
import { Header } from "../components/Header";
import "./landing.scss";
import { Carrusel } from "../components/Carrusel";
import { Cards } from "../components/cards/Cards";
import { Testimonial } from "../components/Testimonial";
import { Button } from 'primereact/button';

export const FAQ = () => {
    const redireccionar = () => {
        window.open("https://api.whatsapp.com/message/MPSAXM7OQ37ND1?autoload=1&app_absent=0", "_blank")
    }
    return (
        <div>
            <Header />
            {/*NAVBAR */}
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
                                    href="/"
                                >
                                    Productos Destacados
                                </a>
                            </li>
                            <li className="nav-item mx-0 mx-lg-2">
                                <a
                                    className="nav-link py-3 px-0 px-lg-1 rounded c-chocolate h6"
                                    href="/"
                                >
                                    Nosotras
                                </a>
                            </li>
                            <li className="nav-item mx-0 mx-lg-2">
                                <a
                                    className="nav-link py-3 px-0 px-lg-1 rounded c-chocolate h6"
                                    href="/"
                                >
                                    Nuestros clientes
                                </a>
                            </li>
                            <li className="nav-item mx-0 mx-lg-2">
                                <a
                                    className="nav-link py-3 px-0 px-lg-1 rounded c-chocolate h6"
                                    href="#otro"
                                >
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>
                    <Button icon="pi pi-whatsapp" label="Haz tu pedido" className="p-button-rounded p-button-success" onClick={redireccionar} />
                </div>
            </nav>

            <section className="mb-0 py-5" id="faq-section">
                <img src={`images/logo.png`} alt="" className="faq-imagen d-none d-md-block d-lg-block d-xl-block" />
                <div className="container">
                    <h2 className="page-section-heading text-center text-uppercase c-chocolate">
                        Cumplimientos
                    </h2>
                    <div className="row">

                        <div className="col-lg-6">
                            <p className="lead c-chocolate">
                                <u><i>Estimados clientes:</i></u> <br />
                                Queremos recordarles algunos cumplimientos y nuevas condiciones si desea hacer un pedido con nosotras. <br /><br />
                                1. El abono del 50% es <b>OBLIGATORIO</b>. Si no se realiza, el pedido no existe. <br />
                                2. Se fijará un limite de tiempo de espera (7 minutos) para que el cliente llegue al punto de encuentro acordado.
                                Pasado ese tiempo el cliente deberá dar solución al nuevo metodo de entrega, acomodandose a nuestro horario.
                                Se ruega mantener una buena comunicación.<br />
                                3. Si se cancela el pedido a 12 horas (o menos) antes de la entrega, no se hará devolución del abono.<br />
                                4. En caso de alguna modificación en cuanto al punto de encuentro de entrega <b>avisar con anticipación</b>. Si el pedido
                                ya esta en recorrido, no se aceptan cambios. <br />
                                5. Nuestro horario de atención es de 10:00 a 22:00 hrs <br />
                                6. En caso de algun disgusto sobre el servicio entregado solicitamos la comunicación para llegar a un mutuo acuerdo.
                            </p>
                        </div>
                        <div className="col-lg-6 p-4">
                            <p className="lead c-chocolate">
                                <b><b>¿Que hacer para agendar un pedido?</b></b> <br />
                                · Escríbenos a nuestro Whatsapp. <br />
                                · Consulta sobre disponibilidad (Recuerda que agendamos con minimo 2 días de anticipación) <br />
                                · De existir disponibilidad solicitamos abonar un 50% del total del producto. (Tendrá 5 horas para realizarlo, de lo contrario no se le hará la reserva).<br />
                                · Cancelaciones y/o devoluciones deberán ser conversadas a traves de nuestro whatsapp.<br /><br />
                                <b><b>¿Que datos me van a solicitar al momento de agendar un pedido?</b></b><br />
                                · Nombre de quién lo <b>SOLICITA</b>.<br />
                                · Número de teléfono.<br />
                                · Nombre de quién lo <b>RECIBE</b>.<br />
                                · Número de teléfono de quién lo recibe.<br />
                                · Dirección a quien va dirigido. <br />
                                · Comprobande de transferencia.<br /><br />

                                <b>*Coméntanos si deseas agregar algún mensaje en tu pedido.</b>
                            </p>
                        </div>
                        <div className="col-lg-12 p-4">
                            <p className="lead c-chocolate">
                                <b><b>¿Por qué estas exigencias?</b></b> <br />
                                A parte de la pasteleria tenemos otras responsabilidades que atender. Por lo tanto, contamos con tiempo limitado para realizar
                                las entregas, entre otros. Tenemos una ruta en cada entrega y si se nos cambia ese horario bruscamente se nos retrasa en el resto de nuestros
                                quehaceres. Además, si se nos cancela un pedido de último momento perderemos inversión de tiempo, recursos y energías. <br /><br />
                                Somos pasteleras, repartidoras, publicistas, contadoras, antendemos al cliente y otro roles. <br />
                                <b>Por lo cúal rogamos comprensión.</b> <br /><br />
                                Estamos muy agradecidas de aquellos clientes que han preferido nuestros servicios.<br />
                                Atte <i>Douce Amitié</i>.
                            </p>
                        </div>
                    </div>
                    <img src={`images/logo.png`} alt="" className="d-block d-md-none d-lg-none d-xl-none w-100" />
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
