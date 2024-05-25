import { Fragment } from "react"
import { useState, useEffect } from 'react'
import { db } from '../firebase'

const Register = ({ user }) => {

    const [lista, setLista] = useState([])
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [disponibilidad, setDisponibilidad] = useState('')
    const [capacidad, setCapacidad] = useState('')
    const [modoEdicion, setModoEdicion] = useState(false)
    const [error, setError] = useState(null)
    const [id, setId] = useState('')

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const data = await db.collection(user.email).get();
                const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setLista(arrayData);
            } catch (error) {
                console.error(error);
            }
        };
        obtenerDatos();
    }, [user.email]);

    //guardar usuario
    const guardarDatos = async (e) => {
        e.preventDefault()
        if (!nombre) return setError('Ingrese el Nombre')
        if (!descripcion) return setError('Ingrese la descripcion')
        if (ubicacion == 'Ubicacion') return setError('Ingrese la ubicacion')
        if (!capacidad) return setError('Ingrese la cantidad')
        try {
            const nuevaSala = { nombre, descripcion, ubicacion, capacidad, disponibilidad };
            const dato = await db.collection(user.email).add(nuevaSala); // Use `add` for new data

            setLista([
                ...lista,
                { id: dato.id, ...nuevaSala }, // Add new item to the list
            ]);

            setNombre("");
            setDescripcion("");
            setError(null);
        } catch (error) {
            console.error(error);
        }
    };

const eliminarDato = async (id) => {
    try {
        //const db=firebase.firestore()
        await db.collection(user.email).doc(id).delete()
        const listaFiltrada = lista.filter(elemento => elemento.id !== id)
        setLista(listaFiltrada)
    } catch (error) {
        console.log(error);
    }
}
const editar = (elemento) => {
    setModoEdicion(true)
    setNombre(elemento.nombre)
    descripcion(elemento.descripcion)
    ubicacion(elemento.ubicacion)
    capacidad(elemento.capacidad)
    disponibilidad(elemento.disponibilidad)
    setId(elemento.id)
}
const editarDatos = async (e) => {
    e.preventDefault()
    if (!nombre) return setError('Ingrese el Nombre')
    if (!descripcion) return setError('Ingrese la descripcion')
    if (ubicacion == 'Ubicacion') return setError('Ingrese la ubicacion')
    if (!capacidad) return setError('Ingrese la cantidad')
    try {
        //const db=firebase.firestore()        
        await db.collection(user.email).doc(id).update({ nombre, descripcion, disponibilidad, capacidad })
        const listaEditada = lista.map(elemento => elemento.id === id ? { id, nombre, descripcion, ubicacion, disponibilidad, capacidad } : elemento)
        setLista(listaEditada)
        setModoEdicion(false)
        setNombre('')
        setDescripcion('')
        setUbicacion('')
        setDisponibilidad('')
        setCapacidad('')
        setId('')
        setError(null)
    } catch (error) {
        console.log(error);
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
                        {
                            error ?
                                (
                                    <div className='alert alert-danger' role='alert'>{error}</div>
                                ) : null
                        }
                        <div className="mb-2 col-8 mx-auto mt-5">
                            <label>Nombre</label>
                            <input type="text"
                                className='form-control mb-2'
                                onChange={(e) => { setNombre(e.target.value) }} value={nombre} />
                        </div>
                        <div className="mb-2 col-8 mx-auto">
                            <label>Example textarea</label>
                            <textarea className="form-control mb-3" rows="2" onChange={(e) => { setDescripcion(e.target.value) }} value={descripcion} ></textarea>
                        </div>
                        <div className="mb-2 col-8 mx-auto">
                            <select className="form-select mb-3" aria-label="Default select example" onChange={(e) => { setUbicacion(e.target.value) }} value={ubicacion}>
                                <option selected>Ubicacion</option>
                                <option value="Bloque 1">Bloque 1</option>
                                <option value="Bloque 2">Bloque 2</option>
                                <option value="Bloque 3">Bloque 3</option>
                            </select>
                        </div>
                        <div className="mb-2 col-8 mx-auto">
                            <label>Capacidad</label>
                            <input type="range" className="form-range mb-3" onChange={(e) => { setCapacidad(e.target.value) }} value={capacidad}></input>
                        </div>
                        <div className="form-check mb-2 col-8 mx-auto ">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" form="flexCheckDefault" onChange={(e) => { setDisponibilidad(e.target.value) }} value={disponibilidad}>
                                Disponible
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