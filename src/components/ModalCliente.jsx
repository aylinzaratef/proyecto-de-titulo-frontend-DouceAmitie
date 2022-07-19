import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { validateRUT, getCheckDigit, generateRandomRUT } from 'validar-rut'
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "500px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalCliente = ({ setList }) => {
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cliente, setCliente] = useState({ rutValido: true, emailValido: true });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const datosClientes = (e, name) => {
    const valor = (e.target && e.target.value) || "";
    let _cliente = { ...cliente };
    _cliente[`${name}`] = valor;

    setCliente(_cliente);
  }

  const validarRut = (e) => {
    const val = (e.target && e.target.value) || "";
    let _cliente = { ...cliente };
    if (fnRut.validaRut(e.target.value)) {
      _cliente["rutValido"] = true;
    } else {
      _cliente["rutValido"] = false;
    }
    _cliente["rut"] = val;
    setCliente(_cliente);
  }

  const fnRut = {
    // Valida el rut con su cadena completa "XXXXXXXX-X"
    validaRut: function (rutCompleto) {
      rutCompleto = rutCompleto.replace("‐", "-");
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
        return false;
      var tmp = rutCompleto.split('-');
      var digv = tmp[1];
      var rut = tmp[0];
      if (digv == 'K') digv = 'k';

      return (fnRut.dv(rut) == digv);
    },
    dv: function (T) {
      var M = 0, S = 1;
      for (; T; T = Math.floor(T / 10))
        S = (S + T % 10 * (9 - M++ % 6)) % 11;
      return S ? S - 1 : 'k';
    }
  }


  const validarEmail = (e) => {
    const val = (e.target && e.target.value) || "";
    let _cliente = { ...cliente };
    let re = /^([\da-z_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/
    if (re.exec(e.target.value)) {
      _cliente["emailValido"] = true;
    } else {
      _cliente["emailValido"] = false;
    }
    _cliente["email"] = val;
    setCliente(_cliente);
  }


  const saveCliente = async () => {
    setSubmitted(true);
    if (cliente.telefono && cliente.nombre && cliente.rut && cliente.apellidoPaterno && cliente.apellidoMaterno && cliente.email) {
      var saveData = {};
      cliente.telefono = "+569" + cliente.telefono;
      let response = await fetch("http://localhost:8080/Pedidos/registrarCliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Request-With": "XMLHttpRequest",
          "Access-Control-Allow-Origin": "origin-list"
        },

        body: JSON.stringify(cliente),
      })

      var newResponse = await response.text();
      cliente.nombre = cliente.nombre + " " + cliente.apellidoPaterno + " " + cliente.apellidoMaterno

      setList(cliente);
      setOpen(false);
      setCliente({ rutValido: true, emailValido: true });
      setSubmitted(false);
    }


  }
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary mt-2 mx-1 btn-rosa"
        onClick={handleOpen}
      >
        Nuevo
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button
            type="button"
            className="btn-close btn-sm float-end"
            aria-label="Close"
            onClick={handleClose}
          ></button>
          <div className="container">
            <div className="row justify-content-center text-center">
              <h3 className="c-rosa">Nuevo Cliente</h3>
              <div className="col-12 mt-3">
                <TextField
                  id="cliente-rut"
                  label="RUT"
                  variant="outlined"
                  fullWidth
                  placeholder="Ej: 12345678-9"
                  data-tip data-for="RutTooltip"
                  onChange={(e) => { datosClientes(e, "rut"); validarRut(e) }}
                  required
                />
                {!cliente.rutValido ? (
                  <p className="c-rojo">El rut ingresado no es válido, por favor ingrese otro. </p>
                ) : ""}

                {submitted && !cliente.rut && (
                  <small className="p-error">Rut es requerido.</small>
                )}

                <ReactTooltip id="RutTooltip" place="top" type="info" effect="solid">

                  Ingrese Rut con digito verificador, <b>sin</b> puntos y <b>con</b> guión.
                </ReactTooltip>
              </div>

              <div className="col-12 mt-3">
                <TextField
                  id="cliente-nombre"
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  placeholder="Ej: Juan"
                  onChange={(e) => datosClientes(e, "nombre")}
                  required
                />
                {submitted && !cliente.nombre && (
                  <small className="p-error">Nombre es requerido.</small>
                )}
              </div>
              <div className="col-12 mt-3">
                <TextField
                  id="cliente-apellidopaterno"
                  label="Primer Apellido"
                  variant="outlined"
                  fullWidth
                  placeholder="Ej: Rodríguez"
                  onChange={(e) => datosClientes(e, "apellidoPaterno")}
                  required
                />
                {submitted && !cliente.apellidoPaterno && (
                  <small className="p-error">Primer apellido es requerido.</small>
                )}
              </div>
              <div className="col-12 mt-3">
                <TextField
                  id="cliente-apellidomaterno"
                  label="Segundo Apellido"
                  variant="outlined"
                  fullWidth
                  placeholder="Ej: Pérez"
                  onChange={(e) => datosClientes(e, "apellidoMaterno")}
                  required
                />
                {submitted && !cliente.apellidoMaterno && (
                  <small className="p-error">Segundo Apellido es requerido.</small>
                )}
              </div>
              <div className="row p-0">
                <label className="col-2 label-telefono">+569</label>
                <div className="col-10 mt-3">
                  <TextField
                    id="cliente-telefono"
                    label="Teléfono"
                    variant="outlined"
                    fullWidth
                    placeholder="99999999"
                    onChange={(e) => datosClientes(e, "telefono")}
                    required
                  />
                  {submitted && !cliente.telefono && (
                    <small className="p-error">
                      Número de teléfono es requerido.
                    </small>
                  )}
                </div>
              </div>

              <div className="col-12 mt-3">
                <TextField
                  type="email"
                  id="cliente-email"
                  label="E-mail"
                  variant="outlined"
                  fullWidth
                  placeholder="correo@correo.cl"
                  onChange={(e) => { datosClientes(e, "email"); validarEmail(e) }}
                  required
                />
                {!cliente.emailValido ? (
                  <p className="c-rojo">El email ingresado no es válido, por favor ingrese otro. </p>
                ) : ""}
                {submitted && !cliente.email && (
                  <small className="p-error">E-mail es requerido.</small>
                )}
              </div>
            </div>
            <div className="row d-flex pt-2 justify-content-center">
              <button
                type="button"
                className="btn btn-primary col-6 mx-2 rounded-3 btn-rosa"
                onClick={saveCliente}
              >
                Guardar
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div >
  );
};
