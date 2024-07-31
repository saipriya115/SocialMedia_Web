import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';

function App() {
  const {user}=useContext(AuthContext)
  return (  <Router>
    <Routes>
      <Route path="/" element={user ? <Home /> : <Register />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}/>
      <Route path="/profile/:username" element={<Profile />} />
      
    </Routes>
  </Router>)
}

export default App;
//if you want to go to home page make i have to make sure you are logged in
//if you are logged in you can goto home page otherwise you need to register
//if you want to go to login page its gonna check again if you are logged in you cant go to login page because there is already
//user you need to go to home page
//for register also same if you have user you cant go to register you need to go to home page
