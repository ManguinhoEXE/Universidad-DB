import { Fragment, useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firebase configuration

const Rooms = ({ user }) => {
    const [listaSalas, setListaSalas] = useState([]);
    const [error, setError] = useState(null);

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
    }, []); // Empty dependency array to fetch data only on component mount

    const handleApartar = async (salaId) => {
        try {
            // Check if user is defined
            if (!user || !user.email) {
                throw new Error("User is not defined or missing email.");
            }

            const sala = listaSalas.find((s) => s.id === salaId);
            if (!sala) throw new Error("Sala no encontrada");

            const nuevaDisponibilidad = !sala.disponibilidad;
            const salaRef = db.collection("salas").doc(salaId);

            // Update availability and add "apartadoPor" field
            await salaRef.update({
                disponibilidad: nuevaDisponibilidad,
                apartadoPor: nuevaDisponibilidad ? "" : user.email, // Clear apartadoPor if making available
            });

            // Fetch the updated document to ensure the local state is consistent with Firestore
            const updatedSala = (await salaRef.get()).data();

            // Update local state for immediate UI update
            setListaSalas((prevSalas) =>
                prevSalas.map((s) =>
                    s.id === salaId
                        ? { ...s, disponibilidad: updatedSala.disponibilidad, apartadoPor: updatedSala.apartadoPor }
                        : s
                )
            );
        } catch (error) {
            console.error(error);
            setError("Error al actualizar la sala: " + error.message);
        }
    };

    if (error) {
        return <div>Error fetching rooms: {error}</div>;
    }

    return (
        <Fragment>
            <main>
                <div className="text-center mb-5 mt-5">
                    <h1>Salas</h1>
                </div>
                <div className="container">
                    <div className="row row-cols-2">
                        {listaSalas.map((sala) => (
                            <div className="col" key={sala.id}>
                                <div className="card justify-content-center bg-light rounded-5 p-3 shadow-lg border-0 mt-5">
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
                                            disabled={!user || !user.email} // Disable button if user is not defined
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
}

export default Rooms
