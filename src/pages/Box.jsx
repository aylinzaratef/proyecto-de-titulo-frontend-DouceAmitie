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

  const onSubmit = (data, form) => {
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
      <MenuBar />
      <div className="form-demo card container col-12 col-lg-6 col-xl-6 mt-5">
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
              initialValues={{ name: "", email: "", password: "", date: null }}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="p-fluid">
                  <Field
                    name="name"
                    render={({ input, meta }) => (
                      <div className="field mt-5">
                        <span className="p-float-label">
                          <InputText
                            id="name"
                            {...input}
                            autoFocus
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="name"
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
                  <Field
                    name="descripcion"
                    render={({ input, meta }) => (
                      <div className="field mt-5">
                        <span className="p-float-label">
                          <InputTextarea
                            id="descripcion"
                            {...input}
                            autoFocus
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="descripcion"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            Descripción
                          </label>
                        </span>
                      </div>
                    )}
                  />

                  <Field
                    name="date"
                    render={({ input }) => (
                      <div className="field mt-5">
                        <span className="p-float-label">
                          <Calendar
                            id="date"
                            {...input}
                            vvvvvvvvvvvvvvvvv
                            dateFormat="dd/mm/yy"
                            mask="99/99/9999"
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
