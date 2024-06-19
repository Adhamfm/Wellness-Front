import React, { useState } from 'react'
import NavBar from '../../components/layout/NavBar/NavBar'
import { Alert, Box, Button, CircularProgress, Container, CssBaseline, Grid, TextField, Typography, tabScrollButtonClasses } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Feedback() {
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [feed, setFeed] = useState('');
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event) => {
        try {
            setLoading(true)
            event.preventDefault();
            console.log({
                Feedback: feed,
            });
            const userLocal = JSON.parse(localStorage.getItem('user'))
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/feedback`,
                {
                    feedback: feed,
                },
                { headers: { "authorization": `Bearer ${userLocal.accessToken}` } })
            setSuccess("true")
            console.log(response);
            setLoading(false)
            
        } catch (error) {
            console.log(error);
            setLoading(false)
        }

    };
    const handleChange = (event) => {

        setValue(event.target.value);
    };

    const clearTextField = () => {
        setSuccess("true")
        setFeed(value)
        setValue('');
        setTimeout(() => {
            navigate("/"); //Redirect to home
            setSuccess("")
        }, 2000);
    };

    return (
        <>
            <NavBar />
            <h1>Feedback</h1>
            <br /><br /><br />
            
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box
                    lg={{
                        marginTop: 100,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        fullWidth: true,
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} noValidate >
                        <TextField
                            margin="normal"
                            fullWidth
                            multiline
                            value={value}
                            id="feedback"
                            label="Feedback"
                            name="feedback"
                            autoFocus
                            rows={10}
                            onChange={handleChange}
                        />
                        <br />
                        {loading && <div className="loading_text"><Grid item xs={12}> <CircularProgress color="inherit" /></Grid></div>}
                        {success && <div className="success_text"><Alert severity="success">Feedback Received. Thanks for your Feedback!</Alert></div>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={clearTextField}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    )
}
