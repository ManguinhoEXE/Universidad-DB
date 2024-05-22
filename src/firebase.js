import app from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCj2an2Y4zHzmqdhWU6YMfQPNs-idJgCdI",
    authDomain: "loginweb-28a1f.firebaseapp.com",
    projectId: "loginweb-28a1f",
    storageBucket: "loginweb-28a1f.appspot.com",
    messagingSenderId: "912262730192",
    appId: "1:912262730192:web:a8ff080b4e37726d1969d5"
};

app.initializeApp(firebaseConfig);

const db = app.firestore()
const auth = app.auth()

export {db,auth}