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
import NavBar from '../../components/layout/NavBar/NavBar';
import AddValidationForm from './addMealValidation';



const initialValue = {
  seller: "",
  price: 0,
  tags: [],
  description: "",
  title: ""
}
const mealInfo = {
  seller: "",
  price: 0,
  tags: [],
  description: "",
  title: ""
}


export default function AddMealPage() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const mealSubmit = async () => {
    try {
      const userLocal = JSON.parse(localStorage.getItem('user'))
      console.log("asudfhasld")
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/meals`,
        {
          seller: userLocal.userId,
          price: mealInfo.price,
          description: mealInfo.description,
          title: mealInfo.title,
          tags: [mealInfo.tags],
        },
        { headers: { "authorization": `Bearer ${userLocal.accessToken}` } });
      setError("");
      setLoading(false);
      setSuccess(response);
      setTimeout(() => {
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
    <>
      <NavBar />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >


          <Typography component="h1" variant="h5">
            Add Meal
          </Typography>
          <Box className="MaterialForm" sx={{ mt: 3 }}>
            <Formik
              enableReinitialize
              initialValues={initialValue}
              onSubmit={(values, formikHelpers) => {
                for (let key in values) {
                  // Assign the value from values object to loginInfo object
                  if (mealInfo.hasOwnProperty(key)) {

                    mealInfo[key] = values[key];
                  }
                }
                // signupInfos.name = values.firstName + values.lastName
                console.log(values);
                console.log(mealInfo);
                mealSubmit();
                //formikHelpers.resetForm();
              }}
              validationSchema={yup.object().shape(AddValidationForm)}
            >
              {({ errors, isValid, touched, dirty }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        name="title"
                        type="name"
                        as={TextField}
                        variant="outlined"
                        color="primary"
                        label="Meal Name"
                        fullWidth
                        error={Boolean(errors.title) && Boolean(touched.title)}
                        helperText={Boolean(touched.title) && errors.title}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        name="description"
                        type="string"
                        as={TextField}
                        multiline
                        rows={4}
                        variant="outlined"
                        color="primary"
                        label="Description"
                        fullWidth
                        error={Boolean(errors.description) && Boolean(touched.description)}
                        helperText={Boolean(touched.description) && errors.description}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        name="price"
                        type="number"
                        as={TextField}
                        variant="outlined"
                        color="primary"
                        label="Price ($)"
                        fullWidth
                        error={Boolean(errors.price) && Boolean(touched.price)}
                        helperText={Boolean(touched.price) && errors.price}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        name="tags"
                        type="string"
                        as={TextField}
                        variant="outlined"
                        color="primary"
                        label="Tags"
                        fullWidth
                        error={Boolean(errors.tags) && Boolean(touched.tags)}
                        helperText={Boolean(touched.tags) && errors.tags}
                      />
                    </Grid>

                  </Grid>

                  <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>Add Meal</Button>
                  {error && <div className="error_text"><Alert severity="error">{error}</Alert></div>}
                    {success && <div className="success_text"><Alert severity="success">Meal Added Successfully</Alert></div>}
                    {loading && <div className="loading_text"> <CircularProgress color="inherit" /></div>}
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Container>
    </>

  )
}
