import app from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCj2an2Y4zHzmqdhWU6YMfQPNs-idJgCdI", // Clave de API para la aplicación Firebase.
    authDomain: "loginweb-28a1f.firebaseapp.com", // Dominio de autenticación de Firebase.
    projectId: "loginweb-28a1f", // ID del proyecto de Firebase.
    storageBucket: "loginweb-28a1f.appspot.com", // URL del bucket de almacenamiento de Firebase.
    messagingSenderId: "912262730192", // ID del remitente de mensajes de Firebase.
    appId: "1:912262730192:web:a8ff080b4e37726d1969d5" // ID de la aplicación Firebase.
};

// Inicializa la aplicación Firebase con la configuración proporcionada.
app.initializeApp(firebaseConfig);

const db = app.firestore(); // Inicializa y exporta Firestore para la base de datos.
const auth = app.auth(); // Inicializa y exporta Auth para la autenticación.

export { db, auth };