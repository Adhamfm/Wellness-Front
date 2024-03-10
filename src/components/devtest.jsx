import { Box, Button, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";

const initialValues = {
    email: "",
    name: ""
}

export default function DevTest() {
    return (
        <Box className="MaterialForm" sx={{ mt: 3 }}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, formikHelpers) => {
                    console.log(values)
                    formikHelpers.resetForm();
                }}
                validationSchema={yup.object({
                    email: yup.string().required("ENTTER THE EMAIL ASDUIOF").email("INVALID EMAIL OMG WRITE IT CORRECTLY"),
                    name: yup.string().required("WHAT IS YOUR NAME").min(2, "NAME TO SHORT MAH BOI")
                })}
            >
                {({ errors, isValid, touched, dirty }) => (
                    <Form>
                        <Field
                            name="email"
                            type="email"
                            as={TextField}
                            variant="outlined"
                            color="primary"
                            label="Email ADDRESs"
                            fullWidth
                            error={Boolean(errors.email) && Boolean(touched.email)}
                            helperText={Boolean(touched.email)&& errors.email}
                        />
                        <Box height={14} />
                        <Field
                            name="name"
                            type="name"
                            as={TextField}
                            variant="outlined"
                            color="primary"
                            label="NAME"
                            fullWidth 
                            error={Boolean(errors.name) && Boolean(touched.name)}
                            helperText={Boolean(touched.name)&& errors.name}
                        />
                        <Button variant="contained" type="submit">TEST ME</Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}


