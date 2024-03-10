import * as yup from "yup";

const LoginValidationForm = {
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .required("Enter your password"),
    
};

export default LoginValidationForm;
