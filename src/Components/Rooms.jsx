import { Fragment, useState, useEffect } from "react";
import { db } from "../firebase";

const Rooms = ({ user }) => {
    // Definir estados para la lista de salas, errores y texto de filtro
    const [listaSalas, setListaSalas] = useState([]);
    const [error, setError] = useState(null);
    const [filterText, setFilterText] = useState("");

    /**
     * useEffect para obtener las salas disponibles en tiempo real desde Firebase
     */
    useEffect(() => {
        const unsubscribe = db.collection("salas")
            .where("disponibilidad", "==", true) // Solo obtener salas disponibles
            .onSnapshot(
                (snapshot) => {
                    const arrayData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    setListaSalas(arrayData);
                },
                (error) => {
                    console.error(error);
                    setError(error.message);
                }
            );

        // Limpiar la suscripción cuando el componente se desmonta
        return () => unsubscribe();
    }, []);

    /**
     * Función para apartar o liberar una sala
     * @param {string} salaId - ID de la sala
     */
    const handleApartar = async (salaId) => {
        try {
            if (!user || !user.email) {
                throw new Error("El usuario no está definido o falta el email.");
            }

            const salaRef = db.collection("salas").doc(salaId);
            const sala = (await salaRef.get()).data();
            if (!sala) throw new Error("Sala no encontrada");

            const nuevaDisponibilidad = !sala.disponibilidad;

            await salaRef.update({
                disponibilidad: nuevaDisponibilidad,
                apartadoPor: nuevaDisponibilidad ? "" : user.email,
            });

        } catch (error) {
            console.error(error);
            setError("Error al actualizar la sala: " + error.message);
        }
    };

    /**
     * Función para manejar el cambio de texto en el filtro
     * @param {Event} event - Evento de cambio en el input de filtro
     */
    const handleFilterChange = (event) => {
        setFilterText(event.target.value.toLowerCase());
    };

    // Filtrar las salas basadas en el texto del filtro
    const filteredSalas = listaSalas.filter((sala) =>
        sala.nombre.toLowerCase().includes(filterText)
    );

    const isSingleCard = filteredSalas.length === 1;

    if (error) {
        return <div>Error al obtener las salas: {error}</div>;
    }

    return (
        <Fragment>
            <main className="rooms">
                <div className="hero-div footer-gradient d-flex justify-content-center mb-5 mt-5 col-5">
                    <h1 className="hero">Salas</h1>
                </div>
                <div className="col-7 mx-auto mb-4">
                    <input
                        className="form-control text-center"
                        value={filterText}
                        onChange={handleFilterChange}
                        placeholder="Filtrar salas por nombre..."
                    />
                </div>
                <div className="card-container">
                    <div className={`row ${isSingleCard ? 'row-cols-1' : 'row-cols-1 row-cols-md-2'} g-4`}>
                        {filteredSalas.map((sala) => (
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
                                            Ubicación: {sala.ubicacion}
                                        </h6>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">
                                            Capacidad: {sala.capacidad}
                                        </h6>
                                        <button
                                            className="btn btn-primary col-4"
                                            onClick={() => handleApartar(sala.id)}
                                            disabled={!user || !user.email}
                                        >
                                            {sala.disponibilidad ? "Apartar" : "Liberar"}
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

export default Rooms;