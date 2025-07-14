import React from 'react'; 
import { Link } from 'react-router-dom'; 
import LogoutButton from './LogoutButton'; 


const AdminNavbar = () => { 
    return ( 
        <nav style={{ 
            zIndex: '1', 
            display: 'flex',  
            flexDirection: 'column',  
            gap: '20px',  
            padding: '20px',  
            background: '#f0f0f0',  
            height: '100vh',  
            width: '15vw',  
            position: 'fixed', 
            overflowY: 'auto'  
            }}> 

            <a href="/AdminDash" style={linkStyle}>Dashboard</a> 
            <Link to="/AdminDash" style={linkStyle}>Manage Order</Link> 
            <Link to="/AdminDash" style={linkStyle}>Recharge</Link> 
            <Link to="/admin/ManageCategories" style={linkStyle}>Category Master</Link> 
            <Link to="/admin/ManageUsers" style={linkStyle}>Manage Users</Link> 
            <Link to="/admin/ManageStudents" style={linkStyle}>Manage Students</Link> 
            <Link to="/admin/ManageStaffs" style={linkStyle}>Manage Staffs</Link> 
            <Link to="/admin/ManageItems" style={linkStyle}>Manage Item</Link> 
            <Link to="/admin/Settings" style={linkStyle}>Settings</Link> 
            <Link to="/admin/NewNavbar" style={linkStyle}>NewNavbar</Link> 

            <LogoutButton /> 
        </nav> 

    ); 
}; 
 
const linkStyle = { 
  color: '#333', 
  textDecoration: 'none', 
  fontSize: '18px', 
  padding: '10px 0', 
  borderBottom: '1px solid #ddd' 
}; 
 
export default AdminNavbar; 


