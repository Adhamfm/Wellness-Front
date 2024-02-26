import NavBar from "../layouts/NavBar";
import React from 'react';
import "./Signup.css"
import { useForm } from "react-hook-form";
function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => console.log(data);
    return (
        <>
        <p className="title">Signup Form</p>
 
 <form className="App" onSubmit={handleSubmit(onSubmit)}>
 <input type="first" {...register("first")} placeholder="First Name" required />
 <input type="last" {...register("last")} placeholder="Last Name" required/>
     <input type="username" {...register("username")} placeholder="username" required/>
     <input type="email" {...register("email")} placeholder="Email" required/>
     <input type="password" {...register("password")} placeholder="Password" required />
     <a href="Login"><button type="submit">Signup</button></a>
     <p >You have already account? <a href="Login">Login</a></p>
 </form>
     </>
    );
}
/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);*/
export default Signup