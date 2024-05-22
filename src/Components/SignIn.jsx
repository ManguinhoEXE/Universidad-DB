import { Fragment } from "react"
import React from "react"
import { auth} from '../firebase'
import { useNavigate } from 'react-router-dom'


const SignIn = () => {

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
        if (login()) {
            login()
        }
    }

    const login = React.useCallback(async () => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user);
            setEmail('')
            setPass('')
            setError(null)
            navigate('/Admin')
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                setError('Email no Válido')
            }
            if (error.code === 'auth/user-not-found') {
                setError('Email no Registrado')
            }
            if (error.code === 'auth/wrong-password') {
                setError('Password no coincide')
            }


        }
    }, [email, pass, navigate])


    return (
        <Fragment>
            <main className="container-fluid p-5 justify-content-center col-6">
                {
                    error && (<div className='alert alert-danger mt-2 col-4'>{error}</div>)
                }
                <div className=" container justify-content-center bg bg-light p-5 rounded-5 shadow-lg">
                    <form onSubmit={guardarDatos}>
                        <h2 className="text-center">iniciar sesión</h2>
                        <div className="mb-2 col-5 mx-auto">
                            <label className="">Email</label>
                            <input type="text" className="form-control" onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-2 col-5 mx-auto">
                            <label className="">Contraseña</label>
                            <input type="password" className="form-control" onChange={e => setPass(e.target.value)} />
                        </div>
                        <div className="mb-2 col-2 mx-auto">
                            <button className="btn btn-danger mx-4" type="button" onClick={login}>Registrar</button>
                        </div>
                    </form>
                </div>
            </main>
        </Fragment>
    )
}

export default SignIn