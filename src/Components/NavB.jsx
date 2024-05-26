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
            <Navbar bg='Ligth' data-bs-theme="Ligth" expand="lg" className="bg-body Ligth navb">
                <Container fluidyyy className='container-nav-item'>
                    <Navbar.Brand style={{ color: "#ebb24d" }} className='navText' href="#home">Universidad</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link style={{ color: "#ebb24d" }} to="/" className='seccion navText'>Inico</Link>
                            <Link style={{ color: "#ebb24d" }} to="/Rooms" className='seccion navText '>Salas</Link>
                            {
                                firebaseUser && userRole === 'admin' ? (<Link style={{ color: "#ebb24d" }} to="/Admin" className='seccion navText'>Admin</Link>) : null
                            }
                            {
                                firebaseUser == null ? (<Link style={{ color: "#ebb24d" }} to="/LogIn" className='seccion navText'>Log In</Link>) : null
                            }


                            {
                                firebaseUser !== null ? (
                                    <button style={{ color: "#ebb24d", backgroundColor: "#ebb24d" }} className='btn text-white m-3'
                                        onClick={() => cerrarSesion()}
                                    >Cerrar sesión</button>
                                ) : <Link style={{ color: "#ebb24d" }} to="/LogIn" className='seccion navText'></Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

    export default NavB