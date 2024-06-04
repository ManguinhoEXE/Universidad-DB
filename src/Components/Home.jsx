import { Fragment } from "react"
import { Container, Row, Col, Card } from "react-bootstrap";
import CarouselSection from "./CarouselSection"

const Home = () => {
    return (
        <Fragment>
            <main>
                <div className="hero-div navbar-gradient">
                    <h1 className="hero">Bienvenido a el Centro de Deporte</h1>
                </div>
                <Container className="content-container">
                    <Row>
                        <Col md={6}>
                            <Card className="info-section">
                                <Card.Body>
                                    <Card.Title>Sobre el Centro de Deportes:</Card.Title>
                                    <Card.Text>
                                        Nuestro Centro de Deportes ofrece instalaciones de primera clase para
                                        una variedad de deportes, incluyendo baloncesto, tenis, natación y más.
                                        Contamos con personal altamente capacitado y programas diseñados para
                                        mejorar tu experiencia deportiva. ¡Únete a nosotros para mantenerte activo
                                        y saludable!
                                    </Card.Text>
                                    <Card.Title>Instalaciones:</Card.Title>
                                    <ul>
                                        <li>Cancha de Baloncesto</li>
                                        <li>Cancha de Tenis</li>
                                        <li>Piscina Olímpica</li>
                                        <li>Cancha de futbol 11</li>
                                        <li>Cancha de volibol</li>
                                        <li>Pista de Atletismo</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <CarouselSection />
                        </Col>
                    </Row>
                </Container>
            </main>
        </Fragment>
    )
}

export default Home