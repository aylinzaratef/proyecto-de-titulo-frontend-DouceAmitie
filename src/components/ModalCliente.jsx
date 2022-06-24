import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";

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
  const [cliente, setCliente] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const datosClientes = (e, name) => {
    const valor = (e.target && e.target.value) || "";
    let _cliente = { ...cliente };
    _cliente[`${name}`] = valor;

    setCliente(_cliente);
  }
  const saveCliente = async () => {
    var saveData = {};
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
                  onChange={(e) => datosClientes(e, "rut")}
                />
              </div>
              <div className="col-12 mt-3">
                <TextField
                  id="cliente-nombre"
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => datosClientes(e, "nombre")}
                />
              </div>
              <div className="col-12 mt-3">
                <TextField
                  id="cliente-apellidopaterno"
                  label="Primer Apellido"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => datosClientes(e, "apellidoPaterno")}
                />
              </div>
              <div className="col-12 mt-3">
                <TextField
                  id="cliente-apellidomaterno"
                  label="Segundo Apellido"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => datosClientes(e, "apellidoMaterno")}
                />
              </div>
              <div className="col-12 mt-3">
                <TextField
                  id="cliente-telefono"
                  label="Teléfono"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => datosClientes(e, "telefono")}
                />
              </div>
              <div className="col-12 mt-3">
                <TextField
                  id="cliente-email"
                  label="E-mail"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => datosClientes(e, "email")}
                />
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
    </div>
  );
};
