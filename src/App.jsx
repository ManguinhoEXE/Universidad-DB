import './App.css'; 
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
import { useEffect, useState } from 'react'; 
import NavB from './Components/NavB';
import Rooms from './Components/Rooms';
import Reservas from './Components/Reservas'; 
import Footer from './Components/Footer'; 

function App() {
  // Define el estado para almacenar el usuario autenticado de Firebase.
  const [firebaseUser, setFirebaseUser] = useState(false);

  // useEffect para observar los cambios en el estado de autenticación del usuario.
  useEffect(() => {
    // Configura un observador en el estado de autenticación de Firebase.
    auth.onAuthStateChanged(user => {
      if (user) {
        // Si el usuario está autenticado, guarda el usuario en el estado.
        setFirebaseUser(user);
      } else {
        // Si el usuario no está autenticado, guarda null en el estado.
        setFirebaseUser(null);
      }
    });
  }, []); // El arreglo vacío [] asegura que este efecto se ejecute solo una vez al montar el componente.

  // Renderiza la aplicación solo si el estado del usuario ha sido determinado.
  return firebaseUser !== false ? (
    <Router>
      {/* NavB recibe el usuario autenticado como prop */}
      <NavB firebaseUser={firebaseUser} />
      <Routes>
        {/* Define las rutas de la aplicación */}
        <Route path='/' element={<Home />} />
        <Route path='LogIn' element={<LogIn />} /> 
        <Route path='SignIn' element={<SignIn />} /> 
        <Route path='Admin' element={<Admin />} /> 
        <Route path='Rooms' element={<Rooms user={firebaseUser} />} /> {/* Ruta para el componente Rooms, pasando el usuario como prop */}
        <Route path='Reservas' element={<Reservas user={firebaseUser} />} /> {/* Ruta para el componente Reservas, pasando el usuario como prop */}
      </Routes>
      <Footer />
    </Router>
  ) : (
    <p>Loading...</p>
  );
}

export default App;