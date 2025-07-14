import React, { useState } from 'react'; 
import axios from 'axios'; 
import { TextField, Button, Typography, Paper, Box, Link, FormControl, InputLabel, Select, MenuItem } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';

const Register = () => { 
    const [userName, setUserName] = useState(''); 
    // const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [userType] = useState('Student'); 
    const navigate = useNavigate(); 


    const handleRegister = async () => { 
        try { 
            await axios.post('http://localhost:5000/api/auth/register', { userName, userType, password}); 
            navigate('/'); 
            alert('Registration successful'); 
        } catch (error) { 
            // alert('Registration failed'); 
            if (error.response && error.response.status === 400) { 
                alert('Username already taken'); 
            } else { 
                alert('Registration failed. Please try again.'); 
            } 
        } 
    };



    return ( 
        <div className="login-hero-header" >
        <Box  
        sx={{scale: '0.8'}}
        display="flex" 
        justifyContent="center"  
        alignItems="center"  
        height="100vh"  
        bgcolor="transparent" 
        >
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%', backgroundColor: 'transparent', backdropFilter: 'blur(5px)' }}> 
            <Typography variant="h4" align="center" sx={{color:'#d5d5d5', fontFamily: "'Pacifico', cursive"}} gutterBottom> 
                Registration 
            </Typography> 

            <TextField 
            sx={textFieldStyle}
            label="User Name" 
            onChange={(e) => setUserName(e.target.value)} 
            fullWidth 
            margin="normal" 
            /> 

            <TextField 
            sx={textFieldStyle}
            label="Password" 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            fullWidth 
            margin="normal" 
            /> 
            
            <Box display="flex" justifyContent="center" mt={2}> 
                <Button variant="contained" sx={{backgroundColor: '#fea116'}} color="secondary" onClick={handleRegister}> 
                    Register 
                </Button> 
            </Box> 
            <Box mt={2} textAlign="center"> 
                <Typography variant="body2" color='#dea983'> 
                    Already registered?{' '} 
                    <Link href="/" underline="hover" sx={{color: '#d47f00'}}> 
                        Login here 
                    </Link> 
                </Typography> 
            </Box> 
        </Paper> 
        </Box> 
        </div>
    ); 
}; 

const textFieldStyle = {
    input: {color: '#ffedd3'},
    "& label": { color: "#ffedd3" },
    "& label.Mui-focused": { color: "#fea116" },
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#ffedd3" },
        "&:hover fieldset": { borderColor: "#ffedd3" },
        "&.Mui-focused fieldset": { borderColor: "#fea116" }
    }
};
 
export default Register; 

