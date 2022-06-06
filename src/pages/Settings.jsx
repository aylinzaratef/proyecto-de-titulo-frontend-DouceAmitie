import { MenuBar } from "../components/MenuBar";

export const Settings = () => {
    return (
        <div>
            <MenuBar />
            <div className="container-fluid mt-5">
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
                                <input type={'text'} className="form-control input-form" disabled />
                            </div>
                            <div className="mb-3 col-4">
                                <label className="form-label">
                                    Nueva contraseña
                                </label>
                                <input type={'text'} className="form-control input-form" />
                            </div>
                            <div className="mb-3 col-4">
                                <label className="form-label">
                                    Confirmar nueva contraseña
                                </label>
                                <input type={'text'} className="form-control input-form" />
                            </div>
                            <button type="Submit" className="btn btn-rosa">Cambiar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}