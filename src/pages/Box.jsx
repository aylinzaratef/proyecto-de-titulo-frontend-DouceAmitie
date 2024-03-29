import { MenuBar } from "../components/MenuBar";
import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";
import ReactTooltip from "react-tooltip";
export const Box = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const validate = (data) => {
    let errors = {};

    if (!data.name) {
      errors.name = "Campo requerido.";
    }

    return errors;
  };

  const onSubmit = async (data, form) => {
    var saveData = {};
    saveData.gastoDiario = data.name;
    saveData.fechaGasto = data.date.toISOString().split("T")[0].toString();
    console.log(saveData);
    let response = await fetch(
      "http://localhost:8080/Estadisticas/ingresarGasto",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Request-With": "XMLHttpRequest",
          "Access-Control-Allow-Origin": "origin-list",
        },
        body: JSON.stringify(saveData),
      }

    );
    var newResponse = await response.text();
    setFormData(data);
    setShowMessage(true);

    form.restart();
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };



  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );

  return (
    <div>
      <img
        src={`images/logo.png`}
        className="img-calendario d-none d-lg-block d-xl-block"
      />
      <MenuBar />
      <div className="form-demo card container col-12 col-lg-6 col-xl-6 mt-5 card-transparente"  >
        <Dialog
          visible={showMessage}
          onHide={() => setShowMessage(false)}
          position="top"
          footer={dialogFooter}
          showHeader={false}
          breakpoints={{ "960px": "80vw" }}
          style={{ width: "30vw" }}
        >
          <div className="flex align-items-center flex-column pt-6 px-3">
            <i
              className="pi pi-check-circle"
              style={{ fontSize: "5rem", color: "var(--green-500)" }}
            ></i>
            <h5>Ingreso exitoso</h5>
            <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
              Se ha ingresado correctamente los costos, estos se reflejarán en
              la pantalla de Estadísticas.
            </p>
          </div>
        </Dialog>

        <div className="flex justify-content-center">
          <div className="card-body">
            <h5 className="text-center">Ingresar costo de compras</h5>
            <Form
              onSubmit={onSubmit}
              initialValues={{ name: "", date: "" }}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="p-fluid">
                  <Field
                    name="name"
                    render={({ input, meta }) => (
                      <div className="field mt-5">
                        <span className="p-float-label">
                          <InputText
                            id="costo"
                            {...input}
                            autoFocus
                            pattern="[0-9]{0,13}"
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                            data-tip data-for="PrepararTooltip"
                          />
                          <label
                            htmlFor="costo"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            Costo
                          </label>
                        </span>
                        {getFormErrorMessage(meta)}

                      </div>
                    )}
                  />
                  <ReactTooltip id="PrepararTooltip" place="top" type="dark" effect="solid">
                    Ingrese solo caracteres numéricos. (sin <b>"$"</b> ni con <b>puntos</b>)
                  </ReactTooltip>
                  <Field
                    name="date"
                    render={({ input }) => (
                      <div className="field mt-5">
                        <span className="p-float-label">
                          <Calendar
                            id="date"
                            {...input}

                            dateFormat="yy/mm/dd"
                            mask="9999/99/99"
                            showIcon

                          />
                          <label htmlFor="date">Fecha</label>
                        </span>
                      </div>
                    )}
                  />

                  <Button
                    type="submit"
                    label="Ingresar"
                    className="mt-5 btn-rosa"
                  />
                </form>
              )}
            />
          </div>
        </div>
      </div>


    </div>

  );
};
