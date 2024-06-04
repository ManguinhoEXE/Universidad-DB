import { Fragment } from "react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";

const SignIn = () => {
    // Definir estados para email, contraseña y errores
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    /**
     * Función para guardar los datos del formulario y realizar las validaciones necesarias
     * @param {Event} e - Evento del formulario que se dispara al intentar enviar el formulario
     */
    const guardarDatos = async (e) => {
        e.preventDefault(); // Evita que el formulario se envíe y la página se recargue

        // Reiniciar el estado de error antes de validar
        setError(null);

        // Validaciones de entrada
        if (!email) { 
            setError("Ingrese su correo electrónico");
            return; 
        }
        if (!pass) { 
            setError("Ingrese su contraseña");
            return; 
        }
        if (pass.length < 6) { 
            setError("La contraseña debe tener al menos 6 caracteres");
            return; 
        }

        try {
            // Autenticar al usuario con email y contraseña en Firebase
            const res = await auth.signInWithEmailAndPassword(email, pass);
            console.log(res.user);
            setEmail("");
            setPass("");

            // Obtener el documento del usuario desde Firestore
            const userDoc = await db.collection("usuarios").doc(res.user.email).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                const userRole = userData.role;

                // Navegar a la página correspondiente según el rol del usuario
                navigate(userRole === "admin" ? "/Admin" : "/");
            } else {
                console.error("Documento de usuario no encontrado");
                setError("Error al iniciar sesión");
            }
        } catch (error) {
            console.error(error);
            // Manejo de errores específicos de Firebase
            if (error.code === "auth/invalid-email") {
                setError("Email no válido");
            } else if (error.code === "auth/internal-error") {
                setError("Correo o contraseña incorrectos.");
            } else {
                setError("Error al iniciar sesión");
            }
        }
    };

    return (
        <Fragment>
            <main className="login">
                {/* Muestra el mensaje de error si existe */}
                {error && (<div className='alert alert-danger mt-2 col-4'>{error}</div>)}
                <div className="container-login justify-content-center bg bg-light p-5 rounded-5 shadow-lg">
                    <form onSubmit={guardarDatos} className="form-login">
                        <h2 className="text-center mb-4">Iniciar Sesión</h2>
                        
                        <div className="mb-2 col-10 mx-auto">
                            <label>Correo electrónico</label>
                            <input
                                type="text"
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        
                        <div className="mb-2 col-10 mx-auto">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                value={pass}
                                onChange={e => setPass(e.target.value)}
                            />
                            <Link to="/LogIn" className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'>
                                ¿Aún no tienes cuenta?
                            </Link>
                        </div>
                        
                        <div className="d-flex justify-content-center mb-2">
                            <button className="btn btn-primary mx-4" type="submit">Ingresar</button>
                        </div>
                    </form>
                </div>
            </main>
        </Fragment>
    );
}

export default SignIn;