import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useFormControl } from '@mui/material/FormControl';
import Logininput from '../../components/logininput';
import { useEffect, useState } from 'react';
import { Field, Formik, withFormik, Form } from 'formik';
import SignUpValidationForm from '../../components/validation/SignUpValidationScema';
import * as yup from "yup";
import axios from 'axios';
import { Alert, CircularProgress, InputLabel, MenuItem, Select } from '@mui/material';
import NavBar from '../../components/layout/NavBar/NavBar';
import AddValidationForm from './editMealValidation';



const mealInfo = {
  id: "",
  seller: "",
  images: [],
  price: 0,
  tags: [],
  rate:0,
  category: "",
  description: "",
  title: ""
}


export default function EditMeal() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState("");
  const { mealid: mealId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function mealGet() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/meals/${mealId}`);;
        // setTimeout(() => {
        //   navigate("/login"); //Redirect to login
        // }, 2000);
        console.log(response.data);
        for (let key in response.data) {
          // Assign the value from values object to loginInfo object
          if (mealInfo.hasOwnProperty(key)) {

            mealInfo[key] = response.data[key];
          }
        }
        console.log(mealInfo);
      } catch (error) {
        setLoading(false);
        console.log(error)
        console.log(Object.keys(error))
      }
    }

    mealGet();
  }, []);

  const mealSubmit = async () => {
    try {
      const userLocal = JSON.parse(localStorage.getItem('user'))
      console.log("Meal Info at Edit: ")
      setLoading(true);
      console.log(mealInfo);
      const test = {
        seller: userLocal.userId,
        price: mealInfo.price,
        category: mealInfo.category,
        description: mealInfo.description,
        title: mealInfo.title,
        rate: mealInfo.rate,
        images: mealInfo.images
      }
      console.log("testingng ..v");
      console.log(test)
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/meals/${mealInfo.id}`,
        test
        ,
        { headers: { "authorization": `Bearer ${userLocal.accessToken}` } });

      console.log(response);
      setError("");
      setLoading(false);
      setSuccess(response);
      setTimeout(() => {
        navigate(`/meals/${mealInfo.id}`); //Redirect to login
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

  const handleChange = (event) => {
    setCat(event.target.value);
    mealInfo["category"] = event.target.value;
    console.log(mealInfo["category"]);
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
            Edit Meal
          </Typography>
          <Box className="MaterialForm" sx={{ mt: 3 }}>
            <Formik
              enableReinitialize
              initialValues={mealInfo}
              onSubmit={(values, formikHelpers) => {
                console.log("wewewe");
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
                        name="images"
                        type="string"
                        as={TextField}
                        variant="outlined"
                        color="primary"
                        label="Images (link)"
                        fullWidth
                        error={Boolean(errors.price) && Boolean(touched.price)}
                        helperText={Boolean(touched.price) && errors.price}
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
                      {/* <Field
                        name="category"
                        type="string"
                        as={TextField}
                        select
                        value={cat}
                        // labelId="demo-simple-select-helper-label"
                        // id="demo-simple-select-helper"
                        fullWidth
                        label="Category"
                        error={Boolean(errors.tags) && Boolean(touched.tags)}
                        helperText={Boolean(touched.tags) && errors.tags}
                        onChange={handleChange}
                      >
                        <MenuItem value={"appetizers"}>Appetizers</MenuItem>
                        <MenuItem value={"breakfastFoods"}>Breakfast</MenuItem>
                        <MenuItem value={"desserts"}>Desserts</MenuItem>
                        <MenuItem value={"drinks"}>Drinks</MenuItem>
                        <MenuItem value={"mostlyMeat"}>Meat</MenuItem>
                        <MenuItem value={"salads"}>Salads</MenuItem>
                        <MenuItem value={"sandwiches"}>Sandwiches</MenuItem>
                        <MenuItem value={"pasta"}>Pasta</MenuItem>
                        <MenuItem value={"soups"}>Soups</MenuItem>
                        <MenuItem value={"mainDishes"}>Main Dishes</MenuItem>
                        <MenuItem value={"sideDishes"}>Side Dishes</MenuItem>
                        <MenuItem value={"other"}>Other</MenuItem>
                      </Field> */}
                      <Field
                        name="category"
                        type="string"
                        as={TextField}
                        variant="outlined"
                        color="primary"
                        label="Category"
                        select
                        fullWidth
                        error={Boolean(errors.tags) && Boolean(touched.tags)}
                        helperText={Boolean(touched.tags) && errors.tags}
                      >
                        <MenuItem value={"appetizers"}>Appetizers</MenuItem>
                        <MenuItem value={"breakfastFoods"}>Breakfast</MenuItem>
                        <MenuItem value={"desserts"}>Desserts</MenuItem>
                        <MenuItem value={"drinks"}>Drinks</MenuItem>
                        <MenuItem value={"mostlyMeat"}>Meat</MenuItem>
                        <MenuItem value={"salads"}>Salads</MenuItem>
                        <MenuItem value={"sandwiches"}>Sandwiches</MenuItem>
                        <MenuItem value={"pasta"}>Pasta</MenuItem>
                        <MenuItem value={"soups"}>Soups</MenuItem>
                        <MenuItem value={"mainDishes"}>Main Dishes</MenuItem>
                        <MenuItem value={"sideDishes"}>Side Dishes</MenuItem>
                        <MenuItem value={"other"}>Other</MenuItem>
                      </Field>
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
                    <Grid item xs={12} sm={6}>
                      <Field
                        name="rate"
                        type="number"
                        as={TextField}
                        variant="outlined"
                        color="primary"
                        label="Rate"
                        fullWidth

                      />
                    </Grid>

                  </Grid>

                  <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>Edit Meal</Button>
                  {error && <div className="error_text"><Alert severity="error">{error}</Alert></div>}
                  {success && <div className="success_text"><Alert severity="success">Meal Edit Successfully</Alert></div>}
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
