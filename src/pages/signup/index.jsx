import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './style.css'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useFormControl } from '@mui/material/FormControl';
import Logininput from '../../components/logininput';
import { useState } from 'react';
import { Field, Formik, withFormik, Form } from 'formik';
import SignUpValidationForm from '../../components/validation/SignUpValidationScema';
import * as yup from "yup";
import axios from 'axios';
import { Alert, CircularProgress } from '@mui/material';

// function Copyright(props) { TODO:CHECK TYPOGRAPHY
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.


const signupInfos = {
  name: "",
  email: "",
  password: "",
  address: "",
  phone: {
    countryCode: "",
    number: ""
  },
}

const initialValues = {
  confirmPassword: "",
  firstName: "",
  lastName: "",
  get name() { // Define a getter to access the combined name
    return `${this.firstName} ${this.lastName}`;
  }
}
const mergedValues = {
  ...signupInfos,
  ...initialValues
}
export default function Signup() {
  const navigate = useNavigate();
  // set initial values for server response 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // send request to server
  const signupSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/customer/register`,
        {
          name: signupInfos.name,
          email: signupInfos.email,
          password: signupInfos.password,
          address: signupInfos.address,
          phone: {
            countryCode: signupInfos.phone.countryCode,
            number: signupInfos.phone.number
          },
        }
      );
      setError("");
      setLoading(false);
      setSuccess(data.message);
      setTimeout(()=>{
        navigate("/login"); //Redirect to login
      }, 2000);
      console.log("SUCCESS");
    } catch (error) {
      setLoading(false);
      setSuccess("");
      console.log(error)
      console.log(Object.keys(error))
      setError(error.response.data.message);
    }
  };

  return (

    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box className="MaterialForm" sx={{ mt: 3 }}>
          <Formik
            enableReinitialize
            initialValues={mergedValues}
            onSubmit={(values, formikHelpers) => {
              for (let key in values) {
                // Assign the value from values object to loginInfo object
                if (signupInfos.hasOwnProperty(key)) {

                  signupInfos[key] = values[key];
                }
              }
              signupInfos.name = values.firstName + values.lastName
              console.log(signupInfos.name);
              console.log(signupInfos);
              //formikHelpers.resetForm();
              signupSubmit();
            }}
            validationSchema={yup.object().shape(SignUpValidationForm)}
          >
            {({ errors, isValid, touched, dirty }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="firstName"
                      type="name"
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="First Name"
                      fullWidth
                      error={Boolean(errors.firstName) && Boolean(touched.firstName)}
                      helperText={Boolean(touched.firstName) && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="lastName"
                      type="name"
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="Last Name"
                      fullWidth
                      error={Boolean(errors.lastName) && Boolean(touched.lastName)}
                      helperText={Boolean(touched.lastName) && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="email"
                      type="email"
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="Email"
                      fullWidth
                      error={Boolean(errors.email) && Boolean(touched.email)}
                      helperText={Boolean(touched.email) && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field
                      name="phone.countryCode"
                      type="string"
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="Country Code"
                      fullWidth
                      error={Boolean(errors.phone?.countryCode) && Boolean(touched.phone?.countryCode)}
                      helperText={Boolean(touched.phone?.countryCode) && errors.phone?.countryCode}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Field
                      name="phone.number"
                      type="string"
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="Phone Number"
                      fullWidth
                      error={Boolean(errors.phone?.number) && Boolean(touched.phone?.number)}
                      helperText={Boolean(touched.phone?.number) && errors.phone?.number}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="address"
                      type="string"
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="Home Address"
                      fullWidth
                      error={Boolean(errors.address) && Boolean(touched.address)}
                      helperText={Boolean(touched.address) && errors.address}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="password"
                      type="password"
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="Password"
                      fullWidth
                      error={Boolean(errors.password) && Boolean(touched.password)}
                      helperText={Boolean(touched.password) && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="confirmPassword"
                      type="password"
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="Confirm Password"
                      fullWidth
                      error={Boolean(errors.confirmPassword) && Boolean(touched.confirmPassword)}
                      helperText={Boolean(touched.confirmPassword) && errors.confirmPassword}
                    />
                  </Grid>
                </Grid>

                <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>TEST ME</Button>
                {error && <div className="error_text"><Alert severity="error">{error}</Alert></div>}
                {success && <div className="success_text"><Alert severity="success">Login Successful</Alert></div>}
                {loading && <div className="loading_text"> <CircularProgress color="inherit" /></div>}
              </Form>
            )}
          </Formik>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/logincustomer" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}