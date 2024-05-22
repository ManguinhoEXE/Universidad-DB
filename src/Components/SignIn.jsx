import { Fragment } from "react"
import NavB from "./NavB"

const SignIn = () => {
    return (
        <Fragment>
            <header>
                <NavB />
            </header>
            <main className="container-fluid p-5 justify-content-center col-6">
                <div className=" container justify-content-center bg bg-light p-5 rounded-5 shadow-lg">
                    <form>
                        <h2 className="text-center">iniciar sesión</h2>
                        <div className="mb-2 col-5 mx-auto">
                            <label className="">Email</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-2 col-5 mx-auto">
                            <label className="">Contraseña</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-2 col-2 mx-auto">
                            <button className="btn btn-danger mx-4" type="submit">Registrar</button>
                        </div>
                    </form>
                </div>
            </main>
        </Fragment>
    )
}

export default SignIn