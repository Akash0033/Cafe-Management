import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import NewNavbar from '../../Components/NewNavbar';

const ManageStaffs = () => {
    const [staffs, setStaffs] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentStaff, setCurrentStaff] = useState({
        name: '',
        phonenumber: '',
        email: '',
        status: 'Active'
    });
    const [isEditing, setIsEditing] = useState(false);

    // Fetch staffs
    const fetchStaffs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/staff/staffs');
            setStaffs(response.data);
        } catch (error) {
            console.error('Error fetching staffs:', error);
        }
    };

    useEffect(() => {
        fetchStaffs();
    }, []);

    const handleOpen = (staff = {}) => {
        setCurrentStaff({
            name: staff.staff_name || '',
            phonenumber: staff.staff_phone_number || '',
            email: staff.staff_email_id || '',
            status: staff.staff_status || 'Active',
            staff_id: staff.staff_id || null
        });
        setIsEditing(Boolean(staff.staff_id));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentStaff({
            name: '',
            phonenumber: '',
            email: '',
            status: 'Active'
        });
    };

    // Add or update staff
    const handleSave = async () => {
        const { name, phonenumber, email, status } = currentStaff;
        
        // Simple validation
        if (!name || !phonenumber || !email) {
            alert('Please fill in all fields');
            return;
        }

        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/staff/staffs/${currentStaff.staff_id}`, {
                    name,
                    phonenumber,
                    email,
                    status
                });
            } else {
                await axios.post('http://localhost:5000/api/staff/staffs', {
                    name,
                    phonenumber,
                    email,
                    status
                });
            }
            fetchStaffs();
            handleClose();
        } catch (error) {
            console.error('Error saving staff:', error);
            alert('Failed to save staff');
        }
    };

    // Delete staff
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this staff?')) {
            try {
                await axios.delete(`http://localhost:5000/api/staff/staffs/${id}`);
                fetchStaffs();
            } catch (error) {
                console.error('Error deleting staff:', error);
                alert('Failed to delete staff');
            }
        }
    };

    // Columns
    const columns = [
        { field: 'staff_id', headerName: 'ID', width: 90 },
        { field: 'staff_name', headerName: 'Staff Name', width: 150 },
        { field: 'staff_email_id', headerName: 'Email', width: 200 },
        { field: 'staff_phone_number', headerName: 'Phone Number', width: 150 },
        { field: 'staff_status', headerName: 'Status', width: 120 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton color="primary" onClick={() => handleOpen(params.row)}>
                        <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(params.row.staff_id)}>
                        <Delete />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <>
        <div style={{ display: 'flex', backgroundColor: '#f7f9f6'}}>
            <NewNavbar />
            <div style={{ marginTop: '50px', marginLeft: '270px', padding: '20px', width: '80%' }}>
                <Box p={3}>
                    <Typography variant="h4" gutterBottom>
                        Manage Staffs
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => handleOpen()} 
                        style={{ marginBottom: '20px', background: '#006400', color: 'white' }}
                    >
                        Add Staff
                    </Button>
                    <Paper style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={staffs}
                            getRowId={(row) => row.staff_id}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                        />
                    </Paper>

                    {/* Add/Edit Staff Dialog */}
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{isEditing ? 'Edit Staff' : 'Add Staff'}</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Staff Name"
                                fullWidth
                                value={currentStaff.name}
                                onChange={(e) => setCurrentStaff({ ...currentStaff, name: e.target.value })}
                                inputProps={{
                                    pattern: "^([A-Za-z]+[ ]?|[A-Za-z])+$",
                                    title: "Only alphabets and spaces"
                                }}
                                required
                            />
                            
                            <TextField
                                margin="dense"
                                label="Phone Number"
                                fullWidth
                                value={currentStaff.phonenumber}
                                onChange={(e) => setCurrentStaff({ ...currentStaff, phonenumber: e.target.value })}
                                inputProps={{
                                    pattern: "[0-9]{10}",
                                    title: "Please enter 10 digit number"
                                }}
                                required
                            />
                            
                            <TextField
                                margin="dense"
                                label="Email"
                                type="email"
                                fullWidth
                                value={currentStaff.email}
                                onChange={(e) => setCurrentStaff({ ...currentStaff, email: e.target.value })}
                                required
                            />
                            
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={currentStaff.status}
                                    label="Status"
                                    onChange={(e) => setCurrentStaff({ ...currentStaff, status: e.target.value })}
                                >
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="In-Active">In-Active</MenuItem>
                                </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSave} variant="contained" color="primary">
                                {isEditing ? 'Update' : 'Add'}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </div>
        </div>
        </>
    );
};

export default ManageStaffs;