import { Fragment } from "react"
import { Card, CardBody, CardImg, CardText } from "react-bootstrap"


const Rooms = () => {
    return (
        <Fragment>
            <main>
                <div>salas</div>
                <div className="container-card">
                <Card style="width: 18rem;">
                    <CardImg src="..." className="card-img-top" alt="..."> </CardImg>
                        <CardBody className="card-body">
                            <CardText className="card-text">Some quick example text to build on the card title and make up the bulk of the content.</CardText>
                        </CardBody>
                </Card>
                </div>
            </main>
        </Fragment>
    )
}

export default Rooms