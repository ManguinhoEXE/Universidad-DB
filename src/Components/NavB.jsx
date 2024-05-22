import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavB = () => {
    return (
        <Navbar bg='Ligth' data-bs-theme="Ligth" expand="lg" className="bg-body Ligth navb">
            <Container fluidyyy className='container-nav-item'>
                <Navbar.Brand style={{ color: "#ebb24d" }} className='navText' href="#home">Universidad</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link style={{ color: "#ebb24d" }} to="/" className='seccion navText'>Inico</Link>
                        <Link style={{ color: "#ebb24d" }} to="/Seccion#2" className='seccion navText '>Formularios</Link>
                        <Link style={{ color: "#ebb24d" }} to="/Admin" className='seccion navText'>Admin</Link>
                        <Link style={{ color: "#ebb24d" }} to="/LogIn" className='seccion navText'>Log In</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavB