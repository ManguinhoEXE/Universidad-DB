import { Fragment } from "react"
import React from "react"
import { useNavigate } from 'react-router-dom'
import { auth, db } from "../firebase"; 
import { Link } from "react-router-dom";


const SignIn = () => {

    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [error, setError] = React.useState(null)
    const navigate = useNavigate()

    const guardarDatos = async (e) => {
        e.preventDefault()
        if (!email) return setError("Ingrese su Email")
        if (!pass) return setError("Ingrese su Password")
        if (pass.length < 6) return setError("Password mínimo de 6 caracteres")

        setError(null)

        try {
            const res = await auth.signInWithEmailAndPassword(email, pass);
            console.log(res.user);
            setEmail("");
            setPass("");

            // Fetch user role from Firestore
            const userDoc = await db.collection("usuarios").doc(res.user.email).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                const userRole = userData.role;

                // Redirect based on user role
                navigate(userRole === "admin" ? "/Admin" : "/"); // Home for non-admins
            } else {
                console.error("User document not found");
                setError("Error al iniciar sesión"); // Handle missing user document
            }
        } catch (error) {
            console.error(error);
            if (error.code === "auth/invalid-email") {
                setError("Email no Válido");
            } else if (error.code === "auth/user-not-found") {
                setError("Email no Registrado");
            } else if (error.code === "auth/wrong-password") {
                setError("Password no coincide");
            } else {
                setError("Error al iniciar sesión"); // Handle generic errors
            }
        }
        }


    return (
        <Fragment>
            <main className="login">
                {
                    error && (<div className='alert alert-danger mt-2 col-4'>{error}</div>)
                }
                <div className="container-login justify-content-center bg bg-light p-5 rounded-5 shadow-lg">
                    <form onSubmit={guardarDatos} className="form-login">
                        <h2 className="text-center mb-4">Iniciar Sesión</h2>
                        <div className="mb-2 col-10 mx-auto">
                            <label className="">Email</label>
                            <input type="text" className="form-control" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-2 col-10 mx-auto">
                            <label className="">Contraseña</label>
                            <input type="password" className="form-control" onChange={e => setPass(e.target.value)} />
                            <Link to="/LogIn" className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'>
                                Ya esta Registrado?</Link>
                        </div>
                        <div className="d-flex justify-content-center mb-2">
                            <button className="btn btn-danger mx-4 " type="button" onClick={guardarDatos}>Registrar</button>
                        </div>
                    </form>
                </div>
            </main>
        </Fragment>
    )
}

export default SignIn