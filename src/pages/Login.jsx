import { authContext } from "../context/contextUser";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductService } from "../components/ProductService";
import { DateRangeSharp } from "@mui/icons-material";

const productService = new ProductService();
export const Login = () => {
  const { currentUser, setCurrentUser } = useContext(authContext);
  const navigate = useNavigate();
  const login = async () => {
    const p = Promise.resolve(productService.getLogin(currentUser.rut, currentUser.password));
    try {
      var datos = await p;
      if (datos) {
        let _user = { ...currentUser };
        _user["perfil"] = datos.permisos == 1 ? "admin" : "trabajador";
        _user["nombre"] = datos.nombre + " " + datos.apellidoPaterno + " " + datos.apellidoMaterno;
        console.log(datos);
        setCurrentUser(_user);
        if (currentUser) {
          window.sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
          if (datos.permisos == 1) {
            navigate("/home");
          } else {
            navigate("/calendar");
          }
        }

      }

    } catch (err) {
      console.log(err)
    }

  }
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _user = { ...currentUser };
    _user[`${name}`] = val;

    setCurrentUser(_user);
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
                  <label className="form-label" htmlFor="rut">
                    Rut
                  </label>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="rut"
                      className="form-control form-control-lg"
                      onChange={(e) => onInputChange(e, "rut")}
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
                      onChange={(e) => onInputChange(e, "password")}
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
