import { Fragment } from "react"
import { useState, useEffect } from 'react'
import { db } from '../firebase'

const Register = ({ user }) => {

    const [lista, setLista] = useState([])
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [modoEdicion, setModoEdicion] = useState(false)
    const [error, setError] = useState(null)
    const [id, setId] = useState('')
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                //const db=firebase.firestore()
                const data = await db.collection(user.email).get()
                //console.log(data.docs);
                const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                console.log(arrayData);
                setLista(arrayData)
            } catch (error) {
                console.log(error);
            }
        }
        obtenerDatos()
    }, [])
    //guardar usuario
    const guardarDatos = async (e) => {
        e.preventDefault()
        if (!nombre) return setError('Ingrese el Nombre')
        if (!apellido) return setError('Ingrese el Apellido')
        try {
            //const db=firebase.firestore()
            const nuevoUsuario = { nombre, apellido }
            const dato = await db.collection(user.email).add(nuevoUsuario)
            setLista(
                [
                    ...lista,
                    { id: dato.id, ...nuevoUsuario }
                ]

            )
            setNombre('')
            setApellido('')
            setError(null)
        } catch (error) {
            console.log(error);
        }
    }
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
        setApellido(elemento.apellido)
        setId(elemento.id)
    }
    const editarDatos = async (e) => {
        e.preventDefault()
        if (!nombre) return setError('Ingrese el Nombre')
        if (!apellido) return setError('Ingrese el Apellido')
        try {
            //const db=firebase.firestore()        
            await db.collection(user.email).doc(id).update({ nombre, apellido })
            const listaEditada = lista.map(elemento => elemento.id === id ? { id, nombre, apellido } : elemento)
            setLista(listaEditada)
            setModoEdicion(false)
            setNombre('')
            setApellido('')
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
                        <h1 className="text-center mx-5">Registro De Estudiantes</h1>
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
                                className='form-control mb-3'
                                onChange={(e) => { setNombre(e.target.value) }}
                                value={nombre}
                            />
                            </div>
                            <div className="mb-2 col-8 mx-auto mb-5">
                            <label>Apellidos</label>
                            <input type="text"
                                className='form-control mb-3'
                                onChange={(e) => { setApellido(e.target.value) }}
                                value={apellido}
                            />
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
                        <h1 className="text-center">USUARIOS REGISTRADOS</h1>
                        <ul className='list-group'>
                            {
                                lista.map(elemento => (<li className='list-group-item border-light rounded-3 m-1' key={elemento.id}>
                                    {elemento.nombre} {elemento.apellido}
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