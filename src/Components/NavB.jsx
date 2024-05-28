import { Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import { db } from '../firebase';


const NavB = ({ firebaseUser }) => {

    const [userRole, setUserRole] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (firebaseUser) {
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
            <div className='container container-nav-item'>
                <Navbar.Brand style={{ color: "#ffff" }} className='navText' href="#home">Centro de deporte</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Offcanvas id="basic-navbar-nav" className="bg-side-navbar custom-offcanvas" aria-labelledby="offcanvasNavbar-expand-lg" placement="end">
                    <Offcanvas.Header closeButton></Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link className='seccion navText' href='/'>Inicio</Nav.Link>
                            <Nav.Link className='seccion navText' href='/Rooms'>Salas</Nav.Link>
                            {firebaseUser !== null && (
                                <Nav.Link className='seccion navText' href='/Reservas'>Tus Reservas</Nav.Link>
                            )}
                            {firebaseUser && userRole === 'admin' && (
                                <Nav.Link className='seccion navText' href='/Admin'>Admin</Nav.Link>
                            )}
                            {firebaseUser == null && (
                                <Nav.Link className='seccion navText' href='/SignIn'>Log In</Nav.Link>
                            )}
                            {firebaseUser !== null && (
                                <button className="btn btn-cerrar-sesion text-start" onClick={() => cerrarSesion()}>
                                    Cerrar sesión
                                </button>
                            )}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </div>
        </Navbar>
    )
}

export default NavB