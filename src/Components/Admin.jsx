import { Fragment } from "react"
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { auth } from '../firebase'
import Register from "./Register"

const Admin = () => {
    const navigate = useNavigate(); // Define navigate para la navegación programática.
    const [user, setUser] = React.useState(null); // Define el estado user para almacenar el usuario autenticado.

    /**
     * useEffect para verificar si hay un usuario autenticado al montar el componente.
     */
    React.useEffect(() => {
        if (auth.currentUser) {
            // Si hay un usuario autenticado, establece el estado user.
            console.log('Existe un usuario: ' + auth.currentUser);
            setUser(auth.currentUser);
        } else {
            // Si no hay un usuario autenticado, redirige a la página de inicio de sesión.
            navigate('/LogIn');
        }
    }, [navigate]); // El arreglo [navigate] asegura que este efecto se ejecute cuando navigate cambie.

    return (
        <Fragment>
            <main>
                {
                    // Renderiza el componente Register solo si hay un usuario autenticado.
                    user && <Register user={user} />
                }
            </main>
        </Fragment>
    );
};

export default Admin;