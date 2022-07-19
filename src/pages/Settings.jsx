import { MenuBar } from "../components/MenuBar";
import { useContext, useState, useEffect, useRef } from "react";
import { authContext } from "../context/contextUser";
import { Toast } from "primereact/toast";
export const Settings = () => {
    const { currentUser, setCurrentUser } = useContext(authContext);
    const [newData, setNewData] = useState({ password: "", confirmPassword: "" });
    const toast = useRef(null)
    const toastError = useRef(null)
    console.log(currentUser);


    const changePwd = async () => {
        let change = {};
        change.rut = currentUser.rut;
        change.password = newData.password;
        change.permisos = currentUser.permisos;
        change.nombre = currentUser.nombres;
        change.apellidoPaterno = currentUser.primerApellido;
        change.apellidoMaterno = currentUser.segundoApellido;
        change.telefono = currentUser.telefono;
        change.email = currentUser.email;
        change.direccion = currentUser.direccion;
        change.fechaIngreso = currentUser.fechaIngreso;
        if (change.password == newData.confirmPassword && change.password != "") {
            let response = await fetch(
                "http://localhost:8080/Pasteleros/actualizar",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-Request-With": "XMLHttpRequest",
                        "Access-Control-Allow-Origin": "origin-list",
                    },
                    body: JSON.stringify(change),
                }
            );
            setNewData({ password: '', confirmPassword: '' })
            toast.current.show({
                severity: "success",
                summary: "Completado",
                detail: "Contraseña Actualizada.",
                life: 3000,
            });
        } else {

            if (change.password == "") {
                toastError.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "La contraseña no puede quedar en blanco.",
                    life: 10000
                });
            } else {
                toastError.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Las contraseñas no coinciden.",
                    life: 10000
                });
            }

        }

    }

    const handleChange = (e, name) => {
        let _newData = { ...newData };
        _newData[name] = e.target.value;
        setNewData(_newData);
    }
    return (
        <div>
            <MenuBar />
            <div className="container-fluid mt-5">
                <img
                    src={`images/logo.png`}
                    className="img-calendario d-none d-lg-block d-xl-block"
                />
                <Toast ref={toast} />
                <Toast ref={toastError} />
                <div className="row">
                    <div className="col-4">
                        <span>Configuración de cuenta</span>
                    </div>
                    <div className="col-8">
                        <form>
                            <div className="mb-3 col-4">

                                <label className="form-label">
                                    Rut
                                </label>
                                <input type={'text'} className="form-control input-form" value={currentUser.rut} readOnly />
                            </div>
                            <div className="mb-3 col-4">
                                <label className="form-label">
                                    Nueva contraseña
                                </label>
                                <input type={'text'} className="form-control input-form" onChange={(e) => handleChange(e, "password")} value={newData.password} />
                            </div>
                            <div className="mb-3 col-4">
                                <label className="form-label">
                                    Confirmar nueva contraseña
                                </label>
                                <input type={'text'} className="form-control input-form" onChange={(e) => handleChange(e, "confirmPassword")} value={newData.confirmPassword} />
                            </div>
                            <button type="button" className="btn btn-rosa" onClick={() => changePwd()}>Cambiar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}