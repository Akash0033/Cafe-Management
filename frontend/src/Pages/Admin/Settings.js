import React, { useState } from 'react'; 
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material'; 
import axios from 'axios'; 
import AdminNavbar from '../../Components/AdminNavbar'; 
import NewNavbar from '../../Components/NewNavbar';
 

const Settings = () => { 
    const [currentPassword, setCurrentPassword] = useState(''); 
    const [newPassword, setNewPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [errorMessage, setErrorMessage] = useState(''); 
    const [successMessage, setSuccessMessage] = useState(''); 
 

    const handlePasswordChange = async () => { 
        // Basic validation 
        if (newPassword !== confirmPassword) { 
            setErrorMessage('New password and confirm password do not match.'); 
            return; 
        }
        if (newPassword.length < 6) { 
            setErrorMessage('Password should be at least 6 characters long.'); 
            return; 
        } 

        try { 
            const response = await axios.post('http://localhost:5000/api/auth/change-password', { 
            currentPassword, 
            newPassword, 
            }); 

            if (response.data.success) { 
                setSuccessMessage('Password changed successfully!'); 
                setCurrentPassword(''); 
                setNewPassword(''); 
                setConfirmPassword(''); 
                setErrorMessage(''); 
            } else { 
                setErrorMessage('Incorrect current password.'); 
            } 
        } catch (error) { 
            setErrorMessage('An error occurred. Please try again.'); 
        } 
    }; 


    return ( 
    <> 
        <NewNavbar />
        {/* <AdminNavbar />  */}
        <Container maxWidth="sm"> 
        <Box 
            sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '100vh', 
            }} 
        > 
            <Box sx={{ width: '100%', mt: 4 ,   backgroundColor: '#f0f8ff'}}> 
                <Typography variant="h4" gutterBottom align="center"> 
                    Change Password 
                </Typography> 

                {errorMessage && ( 
                <Alert severity="error" sx={{ mb: 2 }}> 
                    {errorMessage} 
                </Alert> 
            )} 
            {successMessage && ( 
                <Alert severity="success" sx={{ mb: 2 }}> 
                {successMessage} 
                </Alert> 
            )} 
            <TextField 
                label="Current Password" 
                type="password" 
                fullWidth 
                variant="outlined" 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)} 
                sx={{ mb: 2 }} 
            /> 
            <TextField 
                label="New Password" 
                type="password" 
                fullWidth 
                variant="outlined" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                sx={{ mb: 2 }} 
            /> 
            <TextField 
                label="Confirm New Password" 
                type="password" 
                fullWidth 
                variant="outlined" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                sx={{ mb: 2 }} 
            /> 
            <Button 
                variant="contained" 
                color="secondary" 
                fullWidth 
                onClick={handlePasswordChange} 
            > 
                Change Password 
            </Button> 
            </Box> 
        </Box> 
    </Container> 
    </> 
    ); 
    }; 
export default Settings;