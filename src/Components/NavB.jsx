import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import { db } from '../firebase';


const NavB = ({ firebaseUser }) => {

    const [userRole, setUserRole] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (firebaseUser) {
            // Get the user's role claim
            db.collection('usuarios').doc(firebaseUser.email).get().then((doc) => {
                if (doc.exists) {
                    const userData = doc.data();
                    setUserRole(userData.role);
                }
            });
        }
    }, [firebaseUser]);

    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                navigate('/')
            })
    }


    return (
        <Navbar expand="lg" className="bg-body Ligth navb navbar-gradient navb">
            <Container fluidyyy className='container-nav-item'>
                <Navbar.Brand style={{ color: "#ffff" }} className='navText' href="#home">Centro de deporte</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link style={{ color: "#ffff" }} to="/" className='seccion navText'>Inico</Link>
                        <Link style={{ color: "#ffff" }} to="/Rooms" className='seccion navText '>Salas</Link>
                        {
                            firebaseUser !== null ? (<Link style={{ color: "#ffff" }} to="/Reservas" className='seccion navText'>Tus Reservas</Link>) : null
                        }
                        {
                            firebaseUser && userRole === 'admin' ? (<Link style={{ color: "#ffff" }} to="/Admin" className='seccion navText'>Admin</Link>) : null
                        }
                        {
                            firebaseUser == null ? (<Link style={{ color: "#ffff" }} to="/LogIn" className='seccion navText'>Log In</Link>) : null
                        }


                        {
                            firebaseUser !== null ? (
                                <button style={{ color: "##ffff", backgroundColor: "##ffff", fontWeight: "bold", fontFamily: "PT Sans, sans-serif" }} className='btn text-white'
                                    onClick={() => cerrarSesion()}
                                >Cerrar sesión</button>
                            ) : <Link style={{ color: "##ffff" }} to="/LogIn" className='seccion navText'></Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavB