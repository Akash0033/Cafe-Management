import React, { useState } from 'react'; 
import axios from 'axios'; 
import { TextField, Button, Typography, Paper, Box, Link } from '@mui/material'; 
import { useNavigate } from 'react-router-dom'; 

const Login = () => { 
    const [userName, setUserName] = useState(''); 
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate(); 

    const handleLogin = async () => { 
        try { 
            const response = await axios.post('http://localhost:5000/api/auth/login', { userName, password }); 
            const {user_type,login_id} = response.data;
            localStorage.setItem('user_type', user_type);
            localStorage.setItem('login_id', login_id);
            console.log(response.data); 


            // Redirect based on user_type 
            if (user_type === 'admin') { 
                navigate('/admin/AdminDash'); 
            } else if (user_type === 'Student') { 
                navigate('/Students/Home'); 
            } else if (user_type === 'Staff') { 
                navigate('/Students/About'); 
            } else { 
                alert('Role not recognized'); 
            } 
        } catch (error) { 
            alert('Invalid credentials'); 
        } 
    }; 

    return ( 
        <div className="login-hero-header"  >
        <Box  
        sx={{scale:'0.8'}}
        display="flex"  
        justifyContent="center"  
        alignItems="center"  
        height="100vh"      
        bgcolor="transparent" 
        > 
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%', backgroundColor: 'transparent', backdropFilter: 'blur(5px)' }}> 
            <Typography variant="h4" align="center" sx={{color:'#d5d5d5', fontFamily: "'Pacifico', cursive"}} gutterBottom> 
                Login 
            </Typography> 
            <TextField sx={{input: {color: '#ffedd3'},
                    "& label": { color: "#ffedd3" },
                    "& label.Mui-focused": { color: "#fea116" },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#ffedd3" },
                        "&:hover fieldset": { borderColor: "#ffedd3" },
                        "&.Mui-focused fieldset": { borderColor: "#fea116" }
                    },}}
            label="User Name" 
            onChange={(e) => setUserName(e.target.value)} 
            fullWidth 
            margin="normal" 
            /> 
            <TextField sx={{input: {color: '#ffedd3'},
                    "& label": { color: "#ffedd3" },
                    "& label.Mui-focused": { color: "#fea116" },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#ffedd3" },
                        "&:hover fieldset": { borderColor: "#ffedd3" },
                        "&.Mui-focused fieldset": { borderColor: "#fea116" }
                    },}}
            label="Password" 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            fullWidth 
            margin="normal" 
            /> 
            <Box display="flex" justifyContent="center" mt={2}> 
            <Button variant="contained" sx={{backgroundColor: '#fea116'}} onClick={handleLogin}> 
                Login 
            </Button> 
            </Box> 
            <Box mt={2} textAlign="center"> 
                <Typography variant="body2" color='#dea983'> 
                    Don't have an account?{' '} 
                    <Link href="/register" sx={{color: '#d47f00'}} underline="hover"> 
                    Register here 
                    </Link> 
                </Typography> 
                {/* <Typography variant="body2" mt={1}> 
                    <Link href="/forgot-password" sx={{color: '#d47f00'}} underline="hover"> 
                    Forgot Password? 
                    </Link> 
                </Typography>  */}
            </Box> 
        </Paper> 
        </Box> 
        </div>
    ); 
};

export default Login;