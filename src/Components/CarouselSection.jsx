
import { Carousel } from 'react-bootstrap';
import image1 from "../assets/deporte1.webp"
import image2 from "../assets/deporte2.webp"
import image3 from "../assets/deporte3.webp"
import image4 from "../assets/deporte4.webp"
import image5 from "../assets/deporte5.webp"

const CarouselSection = () => {
    return (
        <div className="carousel-section">
            <Carousel>
                <Carousel.Item>
                <div className="carousel-image-container">
                    <img
                        className="d-block w-100"
                        src={image1}
                    />
                </div>
                    <Carousel.Caption>
                        <h3>Natación</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <div className="carousel-image-container">
                    <img
                        className="d-block w-100"
                        src={image2}
                    />
                </div>
                    <Carousel.Caption>
                        <h3>Tenis</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <div className="carousel-image-container">
                    <img
                        className="d-block w-100"
                        src={image3}
                    />
                </div>
                    <Carousel.Caption>
                        <h3>Fútbol</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <div className="carousel-image-container">
                    <img
                        className="d-block w-100"
                        src={image4}
                    />
                </div>
                    <Carousel.Caption>
                        <h3>Voleibol</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <div className="carousel-image-container">
                    <img
                        className="d-block w-100"
                        src={image5}
                    />
                </div>
                    <Carousel.Caption>
                        <h3>Baloncesto</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default CarouselSection;