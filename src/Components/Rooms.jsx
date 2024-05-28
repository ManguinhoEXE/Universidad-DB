import { Fragment, useState, useEffect } from "react";
import { db } from "../firebase";

const Rooms = ({ user }) => {
    const [listaSalas, setListaSalas] = useState([]);
    const [error, setError] = useState(null);
    const [filterText, setFilterText] = useState("");

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const data = await db.collection("salas").get();
                const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setListaSalas(arrayData);
            } catch (error) {
                console.error(error);
                setError(error.message);
            }
        };
        obtenerDatos();
    }, []);

    const handleApartar = async (salaId) => {
        try {

            if (!user || !user.email) {
                throw new Error("User is not defined or missing email.");
            }

            const sala = listaSalas.find((s) => s.id === salaId);
            if (!sala) throw new Error("Sala no encontrada");

            const nuevaDisponibilidad = !sala.disponibilidad;
            const salaRef = db.collection("salas").doc(salaId);

            await salaRef.update({
                disponibilidad: nuevaDisponibilidad,
                apartadoPor: nuevaDisponibilidad ? "" : user.email,
            });

            if (!nuevaDisponibilidad) {
                setListaSalas((prevSalas) => prevSalas.filter((s) => s.id !== salaId));
            } else {

                const updatedSala = (await salaRef.get()).data();
                setListaSalas((prevSalas) => [...prevSalas, { id: salaId, ...updatedSala }]);
            }
        } catch (error) {
            console.error(error);
            setError("Error al actualizar la sala: " + error.message);
        }

    };
    const handleFilterChange = (event) => {
        setFilterText(event.target.value.toLowerCase());
    };

    const filteredSalas = listaSalas.filter((sala) =>
        sala.nombre.toLowerCase().includes(filterText)
    );

    const isSingleCard = filteredSalas.length === 1;

    if (error) {
        return <div>Error fetching rooms: {error}</div>;
    }
    return (
        <Fragment>
            <main className="rooms">
                <div className="hero-div footer-gradient d-flex justify-content-center mb-5 mt-5 col-5">
                    <h1 className="hero">Salas</h1>
                </div>
                <div className="col-7 mx-auto mb-4">
                    <input className="form-control text-center" value={filterText} onChange={handleFilterChange} />
                </div>
                <div className="card-container">
                    <div className={`row ${isSingleCard ? 'row-cols-1' : 'row-cols-1 row-cols-md-2'} g-4`}>
                        {filteredSalas.map((sala) => (
                            <div className={`col ${isSingleCard ? 'single-card' : ''}`} key={sala.id}>
                                <div style={{ minWidth: "40vw"}} className="card justify-content-center bg-light rounded-5 p-3 shadow-lg border-0">
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
                                            onClick={() => handleApartar(sala.id)}
                                            disabled={!user || !user.email}>
                                            {sala.disponibilidad ? "Apartar" : "Liberar"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </Fragment >
    );
};

export default Rooms;
