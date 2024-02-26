import NavBar from "../layouts/NavBar";
import React from "react";
import { useForm } from "react-hook-form";
import "./Signup.css";
import { useHref } from "react-router-dom";
function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		const userData = JSON.parse(localStorage.getItem(data.email));
		if (userData) { // getItem can return actual value or null
			if (userData.password === data.password) {
				console.log(userData.name + " You Are Successfully Logged In");
			} else {
				console.log("Email or Passwordddd is not matching with our record");
			}
		} else {
			console.log("Emaillll or Password is not matching with our record");
		}
	};
	return (
		<>
			<p className="title">Login Form</p>
			<form className="App" onSubmit={handleSubmit(onSubmit)}>
				<input type="email" {...register("email", { required: true })} placeholder="Email" required />
				{errors.email && <span style={{ color: "red" }}>
					*Email* is mandatory </span>}
				<input type="password" {...register("password")} placeholder="password" required />
				<a href="Home"><button type="submit">Login</button></a>
                <p >You don't have account? <a href="Signup">Signup</a></p>
			</form>
		</>
	);
}
export default Login;
