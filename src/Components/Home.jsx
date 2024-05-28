import { Fragment } from "react"
import CarouselSection from "./CarouselSection"

const Home = () => {
    return (
        <Fragment>
            <main>
                <div className="hero-div navbar-gradient">
                    <h1 className="hero">Bienvenido a el Centro de Deporte</h1>
                </div>
                <div className="content-container">
                    <div className="info-section">
                        <h2>Sobre el Centro de Deportes:</h2>
                        <p>
                            Nuestro Centro de Deportes ofrece instalaciones de primera clase para 
                            una variedad de deportes, incluyendo baloncesto, tenis, natación y más. 
                            Contamos con personal altamente capacitado y programas diseñados para 
                            mejorar tu experiencia deportiva. ¡Únete a nosotros para mantenerte activo 
                            y saludable!
                        </p>
                        <h2>Instalaciones:</h2>
                        <ul>
                            <li>Cancha de Baloncesto</li>
                            <li>Cancha de Tenis</li>
                            <li>Piscina Olímpica</li>
                            <li>Cancha de futbol 11</li>
                            <li>Cancha de volibol</li>
                            <li>Pista de Atletismo</li>
                        </ul>
                    </div>
                    <CarouselSection />
                </div>
            </main>
        </Fragment>
    )
}

export default Home