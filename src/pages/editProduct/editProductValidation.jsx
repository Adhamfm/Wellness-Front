import * as yup from "yup";

const EditValidationForm2 = {
    title: yup.string(),

    description: yup.string(),

    price: yup.number(),
    
};

export default EditValidationForm2;
