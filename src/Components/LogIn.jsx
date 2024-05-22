import { Fragment } from "react"
import { Link } from "react-router-dom"
import { auth, db } from '../firebase'
import React from "react"




const LogIn = () => {

    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [error, setError] = React.useState(null)


    const guardarDatos = (e) => {
        e.preventDefault()
        if (!email) return setError("Ingrese su Email")
        if (!pass) return setError("Ingrese su Password")
        if (pass.length < 6) return setError("Password mínimo de 6 caracteres")

        setError(null)
        if (registrar) {
            registrar()
        }
    }

    const registrar = React.useCallback(async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                id: res.user.uid
            })
            console.log(res.user);
            setEmail('')
            setPass('')
            setError(null)
        } catch (error) {
            console.log(error.code);
            if (error.code === 'auth/invalid-email') {
                setError('Email no Válido')
            }
            if (error.code === 'auth/email-already-in-use') {
                setError('Email ya Registrado')
            }

        }
    }, [email, pass])

    return (
        <Fragment>
            <main className="container-fluid p-5 justify-content-center col-6">
                {
                    error && (<div className='alert alert-danger mt-2 col-4'>{error}</div>)
                }
                <div className=" container justify-content-center bg bg-light p-5 rounded-5 shadow-lg">
                    <form onSubmit={guardarDatos}>
                        <h2 className="text-center">Registrarse</h2>
                        <div className="mb-2 col-5 mx-auto">
                            <label>Email</label>
                            <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-2 col-5 mx-auto">
                            <label>Contraseña</label>
                            <input type="password" className="form-control" onChange={e => setPass(e.target.value)} />
                            <Link to="/SignIn" className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'>Ya esta Registrado?</Link>
                        </div>
                        <div className="mb-2 col-2 mx-auto">
                            <button className="btn btn-danger mx-4" type="button" onClick={registrar}>Registrar</button>
                        </div>
                    </form>
                </div>
            </main>
        </Fragment>
    )
}

export default LogIn