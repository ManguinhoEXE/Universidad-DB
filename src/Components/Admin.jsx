import { Fragment } from "react"
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { auth } from '../firebase'
import Register from "./Register"

const Admin = () => {

    const navigate = useNavigate()
    const [user, setUser] = React.useState(null)
    React.useEffect(() => {
        if (auth.currentUser) {
            console.log('Existe un usuario: ' + auth.currentUser);
            setUser(auth.currentUser)
        } else {
            navigate('/LogIn')
        }
    }, [navigate])
    return (
        <Fragment>
            <main>
                {
                    user && //(<h3>Email: {user.email}</h3>)
                    <Register user={user} />
                }
            </main>
        </Fragment>
    )
}

export default Admin