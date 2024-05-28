import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Components/Home';
import LogIn from './Components/LogIn';
import SignIn from './Components/SignIn';
import Admin from './Components/Admin';
import { auth } from './firebase';
import { useEffect, useState } from 'react'
import NavB from './Components/NavB';
import Rooms from './Components/Rooms';
import Footer from './Components/Footer';

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false)
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }
    })
  })
  return firebaseUser!==false ? (
    <Router>
      <NavB firebaseUser={firebaseUser}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='LogIn' element={<LogIn />} />
        <Route path='SignIn' element={<SignIn />} />
        <Route path='Admin' element={<Admin />} />
        <Route path='Rooms' element={<Rooms user={firebaseUser} />} />
      </Routes>
      <Footer></Footer>
    </Router>
  ):
  (<p>Loading...</p>)
}

export default App
