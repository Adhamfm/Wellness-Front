
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Field, Form, Formik } from 'formik';
import * as yup from "yup";
import LoginValidationForm from '../../components/validation/LoginValidationSchmea';
import { useState } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

const loginInfo = {
    email: "",
    password: ""
}

export default function LoginSeller() {
    const dispatch = useDispatch(); // to get userReducer
    const navigate = useNavigate();
    // set initial values for server response 
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // send request to server
    const loginSubmit = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/seller/login`,
                {
                    email: loginInfo.email,
                    password: loginInfo.password
                }
            );
            setLoading(false);
            setError("");
            console.log(data);
            setSuccess(data.message);
            const { message, ...rest } = data;
            setTimeout(() => {
                dispatch({ type: "LOGIN", payload: rest });
                Cookies.set('user', JSON.stringify(rest));
                localStorage.setItem('user', JSON.stringify(rest));
                navigate("/"); //Redirect to home
            }, 2000);

        }
        catch (error) {
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
                    Sign in Seller
                </Typography>
                <Box className="MaterialForm" sx={{ mt: 3 }}>
                    <Formik
                        enableReinitialize
                        initialValues={loginInfo}
                        onSubmit={(values, formikHelpers) => {
                            //console.log(values)
                            for (let key in values) {
                                // Assign the value from values object to loginInfo object
                                loginInfo[key] = values[key];
                            }
                            console.log(loginInfo)
                            //formikHelpers.resetForm();
                            loginSubmit();
                        }}
                        validationSchema={yup.object().shape(LoginValidationForm)}
                    >
                        {({ errors, isValid, touched, dirty }) => (
                            <Form>
                                <Grid container spacing={2}>
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

                                </Grid>

                                <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>TEST ME</Button>
                                {error && <div className="error_text"><Alert severity="error">{error}</Alert></div>/*TODO: CHANGE error TO UI/UX STYLE */}
                                {success && <div className="success_text"><Alert severity="success">Login Successful</Alert></div>}
                                {loading && <div className="loading_text"><Grid item xs={12}> <CircularProgress color="inherit" /></Grid></div>}
                            </Form>
                        )}
                    </Formik>
                    <Grid container justifyContent="flex-end" >
                        <Grid item xs={8}>
                            <Link to="/signup" variant="body2">
                                Don't have an account? Sign up!
                            </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Link to="/logincustomer" variant="body2">
                                Customer? Login Here!
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}