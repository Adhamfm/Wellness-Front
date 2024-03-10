import { TextField } from '@mui/material'
import './style.css'
import { useState } from 'react'


export default function LoginButton(props) {
    const [textInput, setTextInput] = useState('');
    const [dynamicProps, setDynamicProps] = useState({
        autoComplete: props.autoComplete,
        name: props.id,
        required: props.required,
        fullWidth: true,
        id: props.id,
        label: props.label,
        autoFocus: true,
        type:props.type,
    })

    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };
    // setDynamicProps(
    //     {
    //         ...dynamicProps,
    //         error: true,
    //     }
    // )



    return (
        <>
            <TextField
                {...dynamicProps}
                onChange={handleTextInputChange}
            />
        </>

    )
}
