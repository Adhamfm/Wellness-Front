import { Link } from "react-router-dom";
import LoginButton from "../../components/ui/LoginButton";
import DevTest from "../../components/devtest";
import NavBar from "../../components/layout/NavBar/NavBar";
import Footer from "../../components/layout/Footer/Footer";
import RestHome from "../../components/layout/restHome/restHome";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import "./styleees.css";
const userData = {
  name: "dfgh",
  email: "",
  phone: {
    countryCode: "",
    number: ""
  },
  address: "",
  following: 7
}


async function updateUserData() {
  try {
    const userLocal = JSON.parse(localStorage.getItem('user'))
    console.log(userLocal)
    const response = await axios.get(`https://wellnesshub.onrender.com/api/v1/customer/${userLocal.userId}`, { headers: { "authorization": `Bearer ${userLocal.accessToken}` } })
    console.log(response)

    userData.name = response.data.name;
    userData.email = response.data.email;
    userData.phone.countryCode = response.data.phone.countryCode;
    userData.phone.number = response.data.phone.number;
    userData.address = response.data.address;
    userData.following = response.data.following;

    console.log(userData)
  } catch (error) {
    console.log(error)
  }
}

export default function Home() {
  let x=[]
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({
    email: "",
    feedback: ""});
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setData({ ...data, [name]: value });
    };
  
    const HandleSubmit = (e) => {
      e.preventDefault();
      if(data.email.includes("@gmail.com")==0 &
        data.email.includes("@yahoo.com") ==0){
          alert("email error")
        }
      else if (
        data.email.length !== 0 &&
        data.feedback.length !== 0 
      ) {
        console.log();
        console.log(data);
        alert("Feedback sent successfully");
        x.push({"email":data.email,"feed":data.feedback})
        alert(x)
      } else {
        alert("Enter data first");
      }
    };    
  return (
    <div>
      <NavBar />
      <div className="App">
      {modal && (
        <button
          className="btn btn-red close-btn"
          onClick={() => setModal((value) => !value)}
        >
          <h1></h1>
        </button>
      )}
      <div>
        {!modal && (
          <form className="feedback" onSubmit={HandleSubmit}>
            <button
              className="close-btn-form"
              onClick={() => setModal((value) => !value)}
            >
              X
            </button>
            <div className="m1-rem">
              <input
              type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="m2-rem">
              <textarea
                placeholder="Feedback"
                name="feedback"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <button className="btn btn-green" onClick={HandleSubmit}>
              Submit feedback
            </button>
          </form>
        )}
      </div>
    </div>

      <RestHome />
      {/* <p>home</p>
      <LoginButton text="HELLO" />
      <Link to="/login"> GO TO LOGIN</Link>
      <Button onClick={updateUserData} variant="contained"> GET USER DATA </Button>
      <p>{userData.name}</p> */}
          
      <Footer />
    </div>
  )
}
