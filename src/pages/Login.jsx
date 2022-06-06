import { authContext } from "../context/contextUser";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { currentUser, setCurrentUser } = useContext(authContext);
  const navigate = useNavigate();
  const login = () => {
    if (currentUser.perfil == "admin") {
      navigate("/home");
    } else {
      navigate("/calendar");
    }
  };

  return (
    <div className="background-login">
      <div className="container py-5">
        <div className="row d-flex justify-content-end align-items-end">
          <div className="col-12 col-md-7 col-lg-7 col-xl-7">
            <img src={`images/logo.png`} alt="" className="w-100" />
          </div>
          <div className="col-12 col-md-5 col-lg-5 col-xl-5">
            <div
              className="card card-login c-rosa"
              style={{ borderRadius: "1rem", border: "2px solid" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">
                    Iniciar Sesión
                  </h2>
                  <p className="c-cholate mb-5">
                    Ingrese sus credenciales de trabajador
                  </p>
                  <label className="form-label" htmlFor="typeEmailX">
                    Rut
                  </label>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <label className="form-label" htmlFor="typePasswordX">
                    Contraseña
                  </label>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <button
                    className="btn bg-rosa-oscuro btn-lg px-5 c-blanco"
                    type="submit"
                    onClick={login}
                  >
                    Ingresar
                  </button>
                  <p className="small mt-5 pb-lg-2 c-rosa">
                    ¿Olvidó su contraseña? Contáctese directamente con el
                    administrador.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
