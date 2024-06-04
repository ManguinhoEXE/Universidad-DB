import { Fragment } from "react";
import { useState, useEffect } from 'react';
import { db } from '../firebase';

const Register = ({ user }) => {
    // Definir estados para los datos de las salas y otros controles del formulario
    const [lista, setLista] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ubicacion, setUbicacion] = useState('Ubicación');
    const [disponibilidad, setDisponibilidad] = useState(false);
    const [capacidad, setCapacidad] = useState('');
    const [modoEdicion, setModoEdicion] = useState(false);
    const [error, setError] = useState(null);
    const [id, setId] = useState('');

    /**
     * Función para obtener las salas desde Firebase en tiempo real
     */
    const getSalas = async () => {
        db.collection("salas").onSnapshot((snapshot) => {
            const salas = [];
            snapshot.forEach((sala) => {
                salas.push({ ...sala.data(), id: sala.id });
            });
            setLista(salas);
        });
    };

    // useEffect para cargar las salas al montar el componente
    useEffect(() => { getSalas(); }, []);

    /**
     * Función para guardar una nueva sala en Firebase
     * @param {Event} e - Evento del formulario
     */
    const guardarDatos = async (e) => {
        e.preventDefault();

        // Validaciones de entrada
        if (!nombre) {
            setError("Ingrese el nombre");
            return;
        }

        if (!descripcion) {
            setError("Ingrese la descripción");
            return;
        }

        if (ubicacion === "Ubicación") {
            setError("Ingrese la ubicación");
            return;
        }

        if (capacidad === "") {
            setError("Ingrese la capacidad");
            return;
        }

        try {
            const nuevaSala = {
                createdBy: user.email,
                nombre,
                descripcion,
                ubicacion,
                capacidad: Number(capacidad), 
                disponibilidad,
            };

            // Añadir la nueva sala a Firebase
            const dato = await db.collection("salas").add(nuevaSala); 
            const generatedId = dato.id;
            const nuevaSalaConId = { id: generatedId, ...nuevaSala };
            await db.collection("salas").doc(generatedId).set(nuevaSalaConId);
            setLista([...lista, nuevaSalaConId]);

            // Limpiar los campos del formulario
            setNombre("");
            setDescripcion("");
            setUbicacion("Ubicación");
            setCapacidad("");
            setDisponibilidad(false);
            setError(null);
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Función para eliminar una sala de Firebase
     * @param {string} id - ID de la sala
     */
    const eliminarDato = async (id) => {
        try {
            await db.collection("salas").doc(id).delete();
            const listaFiltrada = lista.filter((elemento) => elemento.id !== id);
            setLista(listaFiltrada);
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Función para cargar los datos de una sala en el formulario para editar
     * @param {Object} elemento - Datos de la sala
     */
    const editar = (elemento) => {
        setModoEdicion(true);
        setNombre(elemento.nombre);
        setDescripcion(elemento.descripcion);
        setUbicacion(elemento.ubicacion);
        setCapacidad(elemento.capacidad);
        setDisponibilidad(elemento.disponibilidad);
        setId(elemento.id);
    };

    /**
     * Función para editar una sala existente en Firebase
     * @param {Event} e - Evento del formulario
     */
    const editarDatos = async (e) => {
        e.preventDefault();

        // Validaciones de entrada
        if (!nombre) {
            setError("Ingrese el nombre");
            return;
        }

        if (!descripcion) {
            setError("Ingrese la descripción");
            return;
        }

        if (ubicacion === "Ubicación") {
            setError("Ingrese la ubicación");
            return;
        }

        if (capacidad === "") {
            setError("Ingrese la capacidad");
            return;
        }

        try {
            const updatedSala = {
                nombre,
                descripcion,
                ubicacion,
                capacidad: Number(capacidad),
                disponibilidad,
            };
            await db.collection("salas").doc(id).update(updatedSala);
            const listaEditada = lista.map((elemento) =>
                elemento.id === id ? { id, ...updatedSala } : elemento
            );
            setLista(listaEditada);

            // Limpiar los campos del formulario y resetear el modo edición
            setModoEdicion(false);
            setNombre("");
            setDescripcion("");
            setUbicacion("Ubicación");
            setCapacidad("");
            setDisponibilidad(false);
            setId("");
            setError(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Fragment>
            <main className="container-fluid p-5 justify-content-center col-6">
                {error && (<div className='alert alert-danger mt-2 col-4'>{error}</div>)}
                <div className='row'>
                    <div className='container justify-content-center bg bg-light p-5 rounded-5 shadow-lg'>
                        <h1 className="text-center mx-5">Registro de Salas</h1>
                        <form onSubmit={modoEdicion ? editarDatos : guardarDatos}>
                            <div className="mb-2 col-8 mx-auto mt-5">
                                <label>Nombre</label>
                                <input 
                                    type="text"
                                    className='form-control mb-2'
                                    onChange={(e) => { setNombre(e.target.value) }} 
                                    value={nombre} 
                                />
                            </div>
                            <div className="mb-2 col-8 mx-auto">
                                <label>Descripción</label>
                                <textarea 
                                    className="form-control mb-3" 
                                    rows="2" 
                                    onChange={(e) => { setDescripcion(e.target.value) }} 
                                    value={descripcion} 
                                ></textarea>
                            </div>
                            <div className="mb-2 col-8 mx-auto">
                                <select 
                                    className="form-select mb-3"
                                    aria-label="Default select example"
                                    onChange={(e) => { setUbicacion(e.target.value) }} 
                                    value={ubicacion}
                                >
                                    <option>Ubicación</option>
                                    <option value="Bloque 1">Bloque 1</option>
                                    <option value="Bloque 2">Bloque 2</option>
                                    <option value="Bloque 3">Bloque 3</option>
                                </select>
                            </div>
                            <div className="d-flex flex-column align-items-start mb-2 col-8 mx-auto">
                                <label>Capacidad</label>
                                <span className="form-text mb-2">{capacidad}</span>
                                <input 
                                    type="range" 
                                    className="form-range mb-3" 
                                    onChange={(e) => { setCapacidad(e.target.value) }} 
                                    value={capacidad} 
                                    min="1"
                                    max="100" 
                                />
                            </div>
                            <div className="form-check mb-2 col-8 mx-auto ">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    onChange={(e) => { setDisponibilidad(e.target.checked) }} 
                                    checked={disponibilidad} 
                                />
                                <label className="form-check-label">
                                    {disponibilidad ? "Disponible" : "No Disponible"}
                                </label>
                            </div>
                            <div className='mb-2 col-2 mx-auto'>
                                {modoEdicion ? 
                                    <button className='btn btn-success' type='submit'>Editar</button> :
                                    <button className='btn btn-primary' type='submit'>Registrar</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className="col-12 container justify-content-center bg bg-light p-5 rounded-5 shadow-lg">
                        <h1 className="text-center">Salas</h1>
                        <ul className='list-group'>
                            {lista.map(elemento => (
                                <li className='list-group-item border-light rounded-3 m-1' key={elemento.id}>
                                    {elemento.nombre}
                                    <button onClick={() => eliminarDato(elemento.id)} className='btn btn-danger float-end mx-2'>Eliminar</button>
                                    <button onClick={() => editar(elemento)} className='btn btn-warning float-end mx-2'>Editar</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </Fragment>
    );
}

export default Register;