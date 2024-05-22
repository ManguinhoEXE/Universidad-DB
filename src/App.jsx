import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from'./Components/Home';
import LogIn from './Components/LogIn';
import SignIn from './Components/SignIn';
import Admin from './Components/Admin';

function App() {

  return (
    <Router>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='LogIn' element={<LogIn />} />
      <Route path='SignIn' element={<SignIn />} />
      <Route path='Admin' element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App
