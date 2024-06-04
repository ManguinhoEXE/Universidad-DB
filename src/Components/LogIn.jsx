import { Fragment } from "react";
import { auth, db } from '../firebase';
import React from "react";
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    // Definir estados para email, contraseña y errores
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    /**
     * Función para guardar los datos del formulario y realizar las validaciones necesarias
     * @param {Event} e - Evento del formulario que se dispara al intentar enviar el formulario
     */
    const guardarDatos = (e) => {
        e.preventDefault(); // Evita que el formulario se envíe y la página se recargue

        // Reiniciar el estado de error antes de validar
        setError(null);

        // Validaciones de entrada
        if (!email) {
            setError("Ingrese su correo electrónico"); // Validación para el campo de correo electrónico vacío
            return;
        }
        if (!pass) {
            setError("Ingrese su contraseña"); // Validación para el campo de contraseña vacío
            return;
        }
        if (pass.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres"); // Validación para la longitud de la contraseña
            return;
        }

        // Si todas las validaciones pasan, llama a la función registrar
        registrar();
    };

    /**
     * Función para registrar un nuevo usuario en Firebase
     */
    const registrar = React.useCallback(async () => {
        try {
            // Crea un nuevo usuario con email y contraseña en Firebase
            const res = await auth.createUserWithEmailAndPassword(email, pass);

            // Guarda la información adicional del usuario en Firestore
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                id: res.user.uid,
                role: 'user' // Se asigna el rol de usuario por defecto
            });

            // Limpia los campos del formulario y los errores
            setEmail('');
            setPass('');
            setError(null);

            // Navega a la página principal después del registro exitoso
            navigate('/');
        } catch (error) {
            console.log(error.code); // Muestra el código de error en la consola para depuración

            // Manejo de errores específicos de Firebase
            if (error.code === 'auth/invalid-email') {
                setError('Correo electrónico no válido');
            } else if (error.code === 'auth/email-already-in-use') {
                setError('Correo electrónico ya registrado');
            } else {
                setError('Error al registrar'); // Manejo de errores genéricos
            }
        }
    }, [email, pass, navigate]);

    return (
        <Fragment>
            <main className="login">
                {/* Muestra el mensaje de error si existe */}
                {error && (<div className='alert alert-danger mt-2 col-4'>{error}</div>)}

                <div className="container-login justify-content-center bg bg-light rounded-5 shadow-lg">
                    <form className="form-login" onSubmit={guardarDatos}>
                        <h2 className="text-center mb-4">Registrarse</h2>

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
                        </div>

                        <div className="d-flex justify-content-center mb-2">
                            <button className="btn btn-primary mx-4" type="submit">Registrar</button>
                        </div>
                    </form>
                </div>
            </main>
        </Fragment>
    );
};

export default LogIn;
