import * as yup from "yup";

const AddProductValidationForm = {
    title: yup.string()
        .required("Required")
        .min(4, "Name should be longer")
        .matches(/^[aA-zZ\s]+$/, 'Numbers and special characters are not allowed'),
    category: yup.string()
        .min(4, "Name should be longer")
        .matches(/^[aA-zZ\s]+$/, 'Numbers and special characters are not allowed'),
    // tags: yup.string("Must be String")
    //     .min(2, "Tag should be longer")
    //     .matches(/^[\saA-zZ\s]+$/, 'Numbers and special characters are not allowed'),
    description: yup.string()
        .required("Required")
        .min(4, "Description should be longer"),

    price: yup.number()
        .positive()
        .required("Price not Entered"),
    quantity: yup.number()
        .positive()
        .required("Quantity not Entered"),
    
};

export default AddProductValidationForm;
