import { Link } from "react-router-dom";
import LoginButton from "../../components/ui/LoginButton";
import DevTest from "../../components/devtest";
import NavBar from "../../components/layout/NavBar/NavBar";
import Footer from "../../components/layout/Footer/Footer";
import RestHome from "../../components/layout/restHome/restHome";
import { Button } from "@mui/material";
import axios from "axios";


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

  return (
    <div>
      <NavBar />
      <RestHome />
      {/* <p>home</p>
      <LoginButton text="HELLO" />
      <Link to="/login"> GO TO LOGIN</Link>
      <Button onClick={updateUserData} variant="contained"> GET USER DATA </Button>
      <p>{userData.name}</p> */}
      
      {/* <Footer /> */}
    </div>
  )
}
