import { Fragment } from "react"
import { useState, useEffect } from 'react'
import { db } from '../firebase'

const Register = ({ user }) => {

    const [lista, setLista] = useState([])
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [disponibilidad, setDisponibilidad] = useState(false)
    const [capacidad, setCapacidad] = useState('')
    const [modoEdicion, setModoEdicion] = useState(false)
    const [error, setError] = useState(null)
    const [id, setId] = useState('')


    useEffect(() => {
        const obtenerDatos = async () => {
          try {
            const data = await db.collection("salas").where("createdBy", "==", user.email).get(); // Filter by user email (optional)
            const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setLista(arrayData);
          } catch (error) {
            console.error(error);
          }
        };
        obtenerDatos();
      }, [user.email]);  // Dependency array to fetch data only when user changes

    const guardarDatos = async (e) => {
        e.preventDefault();

        if (!nombre) {
            setError("Ingrese el Nombre");
            return;
        }

        if (!descripcion) {
            setError("Ingrese la descripción");
            return;
        }

        if (ubicacion === "Ubicacion") {
            setError("Ingrese la ubicación");
            return;
        }

        if (capacidad === "") {
            setError("Ingrese la cantidad");
            return;
        }

        try {
            const nuevaSala = {
                createdBy: user.email,
                nombre,
                descripcion,
                ubicacion,
                capacidad: Number(capacidad), // Convert capacity to a number for database storage
                disponibilidad,
            };
            
            const dato = await db.collection("salas").add(nuevaSala);// Use `add` for new data
            const nuevaSalaConId = { id: dato.id, ...nuevaSala };
            const dato2 = await db.collection("salas").add(nuevaSalaConId);

            setLista([...lista, { id: dato2.id, ...nuevaSalaConId }]); // Add new item to the lista array

            setNombre("");
            setDescripcion("");
            setUbicacion("Ubicacion");
            setCapacidad(0);
            setDisponibilidad(false);
            setError(null);
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarDato = async (id) => {
        try {
            await db.collection("salas").doc(id).delete();
            const listaFiltrada = lista.filter((elemento) => elemento.id !== id);
            setLista(listaFiltrada);
        } catch (error) {
            console.error(error);
        }
    };

    const editar = (elemento) => {
        setModoEdicion(true);
        setNombre(elemento.nombre);
        setDescripcion(elemento.descripcion);
        setUbicacion(elemento.ubicacion);
        setCapacidad(elemento.capacidad); // Set capacity as a string for form input
        setDisponibilidad(elemento.disponibilidad);
        setId(elemento.id);
    };

    const editarDatos = async (e) => {
        e.preventDefault();

        if (!nombre) {
            setError("Ingrese el Nombre");
            return;
        }

        if (!descripcion) {
            setError("Ingrese la descripción");
            return;
        }

        if (ubicacion === "Ubicacion") {
            setError("Ingrese la ubicación");
            return;
        }

        if (capacidad === "") {
            setError("Ingrese la cantidad");
            return;
        }

        try {
            const updatedSala = {
                nombre,
                descripcion,
                ubicacion,
                capacidad: Number(capacidad), // Convert capacity to a number before updating
                disponibilidad,
            };
            await db.collection("salas").doc(id).update(updatedSala);

            const listaEditada = lista.map((elemento) =>
                elemento.id === id ? { id, ...updatedSala } : elemento
            );
            setLista(listaEditada);

            setModoEdicion(false);
            setNombre("");
            setDescripcion("");
            setUbicacion("");
            setCapacidad("");
            setDisponibilidad(false);
            setId("");
            setError(null);
        } catch (error) {
            console.error(error);
        }
    }

    return (

                <Fragment>
                    <main className="container-fluid p-5 justify-content-center col-6">
                        {
                            error && (<div className='alert alert-danger mt-2 col-4'>{error}</div>)
                        }
                        <div className='row'>
                            <div className='container justify-content-center bg bg-light p-5 rounded-5 shadow-lg'>
                                <h1 className="text-center mx-5">Registro De Salas</h1>
                                <form onSubmit={modoEdicion ? editarDatos : guardarDatos}>
                                    <div className="mb-2 col-8 mx-auto mt-5">
                                        <label>Nombre</label>
                                        <input type="text"
                                            className='form-control mb-2'
                                            onChange={(e) => { setNombre(e.target.value) }} value={nombre} />
                                    </div>
                                    <div className="mb-2 col-8 mx-auto">
                                        <label>Descripcion</label>
                                        <textarea className="form-control mb-3" rows="2" onChange={(e) => { setDescripcion(e.target.value) }} value={descripcion} ></textarea>
                                    </div>
                                    <div className="mb-2 col-8 mx-auto">
                                        <select className="form-select mb-3" 
                                        aria-label="Default select example" 
                                        onChange={(e) => { setUbicacion(e.target.value) }} value={ubicacion} 
                                        >
                                            <option selected>Ubicacion</option>
                                            <option value="Bloque 1">Bloque 1</option>
                                            <option value="Bloque 2">Bloque 2</option>
                                            <option value="Bloque 3">Bloque 3</option>
                                        </select>
                                    </div>
                                    <div className="d-flex flex-column align-items-start mb-2 col-8 mx-auto">
                                        <label>Capacidad</label>
                                        <span className="form-text mb-2">{capacidad}</span>
                                        <input type="range" className="form-range mb-3" onChange={(e) => { setCapacidad(e.target.value) }} value={capacidad}  min="1"
                                        max="100"/>
                                    </div>
                                    <div className="form-check mb-2 col-8 mx-auto ">
                                        <input className="form-check-input" type="checkbox" onChange={(e) => { setDisponibilidad(e.target.checked) }} checked={disponibilidad} />
                                        <label className="form-check-label" form="flexCheckDefault" >
                                            {disponibilidad ? "Disponible" : "No Disponible"}
                                        </label>
                                    </div>
                                    <div className='mb-2 col-2 mx-auto'>
                                        {
                                            modoEdicion ? <button className='btn btn-success' type='submit'>Editar</button> :
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
                                    {
                                        lista.map(elemento => (<li className='list-group-item border-light rounded-3 m-1' key={elemento.id}>
                                            {elemento.nombre}
                                            <button onClick={() => eliminarDato(elemento.id)} className='btn btn-danger float-end mx-2'>Eliminar</button>
                                            <button onClick={() => editar(elemento)} className='btn btn-warning float-end mx-2'>Editar</button>
                                        </li>))
                                    }
                                </ul>
                            </div>
                        </div>
                    </main>
                </Fragment>
            )
        }

export default Register