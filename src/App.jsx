import NavBar from "./layouts/NavBar"
import Home from "./pages/Home"
import About from "./pages/About"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import { Navigate, Route, Routes, redirect } from "react-router-dom"
import Footer from "./layouts/Footer"

function App() {
  return (
    <>
      <NavBar/>
      <br /><br /><br /><br /><br /><br /><br /><br />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/> 
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
