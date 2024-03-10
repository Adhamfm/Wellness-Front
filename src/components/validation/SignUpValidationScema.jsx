import * as yup from "yup";

const SignUpValidationForm = {
    firstName: yup.string()
        .required("Required")
        .min(4, "Name should be longer")
        .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed'),
    lastName: yup.string()
        .required("Required")
        .min(4, "Name should be longer")
        .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed'),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must contain at least 8 characters")
        .required("Enter your password"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match")
        .required("Confirm your password"),
    address: yup.string()
        .min(8, "Please write your whole Address")
        .required("Please enter your Address"),
    phone: yup.object({
        number: yup.string().required("Enter your Number")
            .matches(/^[0-9]+$/, 'Letters and special characters are not allowed')
            .test('len', 'Must be exactly 11 characters', val => val.length === 11),
        countryCode: yup.string().required("Enter your Country Code").matches(/^\+?[0-9]+$/, 'Letters and special characters are not allowed')
    })
};

export default SignUpValidationForm;
