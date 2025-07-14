import React from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button } from '@mui/material';


const LogoutButton = () => { 
    const navigate = useNavigate();
    
    
    const handleLogout = () => { 
        // Clear any session-related data 
        localStorage.removeItem('userToken'); // Remove stored tokens if any 
        navigate('/'); // Redirect to login page 
    }; 

    return ( 
        <>
        {/* <Button variant="contained" sx={{backgroundColor: '#fea116', marginLeft: '5px'}} onClick={handleLogout}> 
            Logout 
        </Button>  */}
        <span style={{marginLeft: '10px'}}></span>
        <a onClick={handleLogout} className="btn btn-primary py-2 px-4">Logout</a>
        </>
    ); 
}; 
export default LogoutButton;


