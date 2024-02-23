import { Route, Routes } from "react-router-dom"
import NavBar from "./layouts/NavBar"
import Home from "./pages/Home"
import About from "./pages/About"
import Signup from "./pages/Signup"


function App() {
  return (
    <>
      <NavBar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
