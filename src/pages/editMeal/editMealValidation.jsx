import * as yup from "yup";

const EditValidationForm = {
    title: yup.string(),

    description: yup.string(),

    price: yup.number(),
    
};

export default EditValidationForm;
