export const Login = () => {
    return (
        <section className="vh-100 bg-rosa">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg c-chocolate" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Iniciar Sesión</h2>
                                    <p className="c-cholate mb-5">Ingrese sus credenciales de trabajador</p>
                                    <label className="form-label" htmlFor="typeEmailX">Rut</label>
                                    <div className="form-outline form-white mb-4">
                                        <input type="email" id="typeEmailX" className="form-control form-control-lg" />
                                    </div>
                                    <label className="form-label" htmlFor="typePasswordX">Contraseña</label>
                                    <div className="form-outline form-white mb-4">
                                        <input type="password" id="typePasswordX" className="form-control form-control-lg" />
                                    </div>
                                    <button className="btn bg-rosa btn-lg px-5" type="submit">Ingresar</button>
                                    <p className="small mt-5 pb-lg-2 c-cholocate">¿Olvidó su contraseña? Contáctese directamente con el administrador.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}