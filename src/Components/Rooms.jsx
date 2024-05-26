import { Fragment } from "react"




const Rooms = () => {
    return (
        <Fragment>
            <main>
                <div className="text-center mb-5">
                    <h1>Salas</h1>
                </div>
                <div className="container">
                    <div className="row row-cols-2">
                        <div className="col">
                            <div className="card justify-content-center bg bg-light rounded-5 p-3 shadow-lg border-0 mt-5 ">
                                <div className="card-body">
                                    <div className="d-flex row">
                                        <h6 className="card-subtitle mb-2 text-body-secondary text-end">Disponibilidad</h6>
                                        <h5 className="card-title float-start">Nombre de la sala</h5>
                                    </div>
                                    <p className="card-text">Descripcion..........................asdasdasdasda..................</p>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Ubicacion</h6>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Capacidad: </h6>
                                    <button className="btn btn-primary col-4 ">Apartar</button>
                                </div>
                            </div>
                            <div className="card justify-content-center bg bg-light rounded-5 p-3 shadow-lg border-0 mt-5 ">
                                <div className="card-body">
                                    <div className="d-flex row">
                                        <h6 className="card-subtitle mb-2 text-body-secondary text-end">Disponibilidad</h6>
                                        <h5 className="card-title float-start">Nombre de la sala</h5>
                                    </div>
                                    <p className="card-text">Descripcion..........................asdasdasdasda..................</p>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Ubicacion</h6>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Capacidad: </h6>
                                    <button className="btn btn-primary col-4 ">Apartar</button>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card justify-content-center bg bg-light rounded-5 mt-5 p-3 shadow-lg border-0 ">
                                <div className="card-body">
                                    <div className="d-flex row">
                                        <h6 className="card-subtitle mb-2 text-body-secondary text-end">Disponibilidad</h6>
                                        <h5 className="card-title float-start">Nombre de la sala</h5>
                                    </div>
                                    <p className="card-text">Descripcion..........................asdasdasdasda..................</p>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Ubicacion</h6>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Capacidad: </h6>
                                    <button className="btn btn-primary col-4 ">Apartar</button>
                                </div>
                            </div>
                            <div className="card justify-content-center bg bg-light rounded-5 p-3 shadow-lg border-0 mt-5 ">
                                <div className="card-body">
                                    <div className="d-flex row">
                                        <h6 className="card-subtitle mb-2 text-body-secondary text-end">Disponibilidad</h6>
                                        <h5 className="card-title float-start">Nombre de la sala</h5>
                                    </div>
                                    <p className="card-text">Descripcion..........................asdasdasdasda..................</p>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Ubicacion</h6>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Capacidad: </h6>
                                    <button className="btn btn-primary col-4 ">Apartar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    )
}

export default Rooms