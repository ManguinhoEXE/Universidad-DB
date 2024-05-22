import { Fragment } from "react"
import { Link } from "react-router-dom"
import NavB from "./NavB"

const LogIn = () => {
    return (
        <Fragment>
            <header>
                <NavB />
            </header>
            <main className="container-fluid p-5 justify-content-center col-6">
                <div className=" container justify-content-center bg bg-light p-5 rounded-5 shadow-lg">
                    <form>
                        <h2 className="text-center">Registrarse</h2>
                        <div className="mb-2 col-5 mx-auto">
                            <label className="">Email</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-2 col-5 mx-auto">
                            <label className="">Contraseña</label>
                            <input type="text" className="form-control" />
                            <Link to="/SignIn" className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'>Ya esta Registrado?</Link>
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

export default LogIn