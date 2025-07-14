import React, { useState } from 'react'; 
import axios from 'axios'; 
import { TextField, Button, Typography, Paper, Box ,Link} from '@mui/material'; 
import { useNavigate } from 'react-router-dom'; 


const ForgotPassword = () => { 
const [email, setEmail] = useState(''); 
const [otp, setOtp] = useState(new Array(6).fill('')); 
const [newPassword, setNewPassword] = useState(''); 
const [step, setStep] = useState(1); 
const navigate = useNavigate(); 


const handleOtpChange = (value, index) => { 
    const otpArray = [...otp]; 
    otpArray[index] = value; 
    setOtp(otpArray); 
}; 


const sendOTP = async () => { 
    try { 
        await axios.post('http://localhost:5000/api/otp/forgot-password', { email }); 
        alert('OTP sent to your email'); 
        setStep(2); 
    } catch (error) { 
        alert('Error sending OTP'); 
    } 
}; 


const resetPassword = async () => { 
    try { 
        const otpCode = otp.join(''); 
        await axios.post('http://localhost:5000/api/otp/reset-password', { email, otp: otpCode, newPassword }); 
        navigate('/'); 
        alert('Password reset successful'); 
    } catch (error) { 
        alert('Invalid OTP'); 
    } 
}; 
return ( 
    <Box  
        display="flex"  
        justifyContent="center"  
        alignItems="center"  
        height="100vh"  
        bgcolor="#f4f6f9" 
    > 
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}> 
            <Typography variant="h4" align="center" gutterBottom> 
                Forgot Password 
            </Typography> 
            {step === 1 && ( 
                <> 
                <TextField 
                    label="Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    fullWidth 
                    margin="normal" 
                /> 
                <Box display="flex" justifyContent="center" mt={2}> 
                    <Button variant="contained" color="secondary" onClick={sendOTP}> 
                        Send OTP 
                    </Button>
                </Box> 
                <Box display="flex" justifyContent="center">
                    <Typography variant="body2" mt={1}> 
                        <Link href="/" underline="hover"> 
                            Back to Login 
                        </Link> 
                    </Typography>
                </Box>
                </> 
            )} 

            {/* ////////// STEP 2 ////////// */}
            {step === 2 && ( 
            <> 
            <Typography variant="h6" align="center" gutterBottom> 
                Enter OTP 
            </Typography> 
            <Box display="flex" justifyContent="center" gap={1} mb={2}> 
                {otp.map((value, index) => ( 
                <TextField 
                    key={index} 
                    value={value} 
                    onChange={(e) => { 
                    handleOtpChange(e.target.value, index); 
                    if (e.target.value && index < otp.length - 1) { 
                        document.getElementById(`otp-${index + 1}`).focus(); 
                    } 
                    }} 
                    inputProps={{ 
                    maxLength: 1, 
                    style: { textAlign: 'center', fontSize: '20px' }, 
                    }} 
                    id={`otp-${index}`} 
                    sx={{ width: 50 }} 
                /> 
                ))} 
            </Box> 
            <TextField 
                label="New Password" 
                type="password" 
                onChange={(e) => setNewPassword(e.target.value)} 
                fullWidth 
                margin="normal" 
            /> 
            <Box display="flex" justifyContent="center" mt={2}> 
                <Button variant="contained" color="secondary" onClick={resetPassword}> 
                Reset Password 
                </Button> 
            </Box> 
            </> 
        )} 
        </Paper> 
    </Box> 
  ); 
}; 
 
export default ForgotPassword;