import { Fragment } from "react"
import { Link } from "react-router-dom"
import { auth, db } from '../firebase'
import React from "react"
import { useNavigate } from 'react-router-dom'




const LogIn = () => {

    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [error, setError] = React.useState(null)
    const navigate = useNavigate()

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
                id: res.user.uid,
                role: 'user'
            })
            console.log(res.user);
            setEmail('')
            setPass('')
            setError(null)
            navigate('/')
        } catch (error) {
            console.log(error.code);
            if (error.code === 'auth/invalid-email') {
                setError('Email no Válido')
            }
            if (error.code === 'auth/email-already-in-use') {
                setError('Email ya Registrado')
            }

        }
    }, [email, pass, navigate])

    return (
        <Fragment>
            <main className="login">
                {
                    error && (<div className='alert alert-danger mt-2 col-4'>{error}</div>)
                }
                <div className=" container-login justify-content-center bg bg-light p-5 rounded-5 shadow-lg">
                    <form className="form-login" onSubmit={guardarDatos}>
                        <h2 className="text-center">Registrarse</h2>
                        <div className="mb-2 col-10 mx-auto">
                            <label>Email</label>
                            <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-2 col-10 mx-auto">
                            <label>Contraseña</label>
                            <input type="password" className="form-control" onChange={e => setPass(e.target.value)} />
                        </div>
                        <div className="d-flex justify-content-center mb-2">
                            <button className="btn btn-danger mx-4" type="button" onClick={registrar}>Registrar</button>
                        </div>
                    </form>
                </div>
            </main>
        </Fragment>
    )
}

export default LogIn