import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

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

export const ModalCliente = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-12 mt-3">
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-12 mt-3">
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            <div className="row d-flex pt-2 justify-content-center">
              <button
                type="button"
                className="btn btn-primary col-6 mx-2 rounded-3 btn-rosa"
                onClick={handleOpen}
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
