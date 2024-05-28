import { Fragment, useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firebase configuration

const Reservas = ({ user }) => {
    const [listaReservas, setListaReservas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerReservas = async () => {
            try {
                const data = await db.collection("salas").where("apartadoPor", "==", user.email).get();
                const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setListaReservas(arrayData);
            } catch (error) {
                console.error(error);
                setError(error.message);
            }
        };

        if (user && user.email) {
            obtenerReservas();
        }
    }, [user]); // Depend on user to refetch when user changes

    const handleLiberar = async (salaId) => {
        try {
            const salaRef = db.collection("salas").doc(salaId);

            // Update availability and clear "apartadoPor" field
            await salaRef.update({
                disponibilidad: true,
                apartadoPor: "",
            });

            // Fetch the updated document to ensure the local state is consistent with Firestore
            const updatedReservas = listaReservas.filter((sala) => sala.id !== salaId);

            // Update local state for immediate UI update
            setListaReservas(updatedReservas);
        } catch (error) {
            console.error(error);
            setError("Error al liberar la sala: " + error.message);
        }
    };

    if (error) {
        return <div>Error fetching reservations: {error}</div>;
    }

    const isSingleCard = listaReservas.length === 1;

    return (
        <Fragment>
            <main>
                <div className="hero-div footer-gradient d-flex justify-content-center mb-5 mt-5 col-5">
                    <h1 className="hero">Tus Reservas</h1>
                </div>
                <div className="card-container">
                    <div className={`row ${isSingleCard ? 'row-cols-1' : 'row-cols-1 row-cols-md-2'} g-4`}>
                        {listaReservas.map((sala) => (
                            <div className={`col ${isSingleCard ? 'single-card' : ''}`} key={sala.id}>
                                <div style={{ minWidth: "40vw" }} className="card justify-content-center bg-light rounded-5 p-3 shadow-lg border-0">
                                    <div className="card-body">
                                        <div className="d-flex row">
                                            <h6 className="card-subtitle mb-2 text-body-secondary text-end">
                                                {sala.disponibilidad ? "Disponible" : "Ocupado"}
                                            </h6>
                                            <h5 className="card-title float-start">{sala.nombre}</h5>
                                        </div>
                                        <p className="card-text">{sala.descripcion}</p>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">
                                            Ubicacion: {sala.ubicacion}
                                        </h6>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">
                                            Capacidad: {sala.capacidad}
                                        </h6>
                                        <button
                                            className="btn btn-primary col-4"
                                            onClick={() => handleLiberar(sala.id)}
                                            disabled={!user || !user.email} // Disable button if user is not defined
                                        >
                                            Liberar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </Fragment>
    );
};

export default Reservas;

