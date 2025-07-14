import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    // Paper,
    // IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    MenuItem,
    Select,
    FormControl,
    FormHelperText,
} from '@mui/material';
// import { Delete, Edit } from '@mui/icons-material';
// import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
// import NewNavbar from '../../Components/NewNavbar';

const StuAddOrEdit = ({ isAutoAdd }) => {
    // const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState({ 
        name: '', 
        regno: '', 
        address: '', 
        phoneno: '', 
        email: '', 
        balance: '', 
        status: 'Active', 
        image: '' 
    });
    const [isEditing, setIsEditing] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        let errors = {};
        if (!currentStudent.name.trim()) errors.name = 'Student name is required';
        if (!currentStudent.regno.trim()) errors.regno = 'Register No. is required';
        if (!currentStudent.address.trim()) errors.address = 'Address is required';
        if (!currentStudent.phoneno.trim()) errors.phoneno = 'Phone number is required';
        if (!currentStudent.email.trim()) errors.email = 'Email is required';
        if (!currentStudent.balance.toString().trim()) errors.balance = 'Balance is required';
        
        // Validate register number format (alphanumeric, 10 characters)
        if (currentStudent.regno.trim() && !/^[a-zA-Z0-9]{12}$/.test(currentStudent.regno)) {
            errors.regno = 'Register No. must be 10 alphanumeric characters';
        }
        
        // Validate phone number (10 digits)
        if (currentStudent.phoneno.trim() && !/^[0-9]{10}$/.test(currentStudent.phoneno)) {
            errors.phoneno = 'Phone number must be 10 digits';
        }
        
        // Validate email format
        if (currentStudent.email.trim() && !/\S+@\S+\.\S+/.test(currentStudent.email)) {
            errors.email = 'Invalid email format';
        }
        
        // Validate name (only alphabets and spaces)
        if (currentStudent.name.trim() && !/^([A-Za-z]+[ ]?|[A-Za-z])+$/.test(currentStudent.name)) {
            errors.name = 'Name can only contain alphabets and spaces';
        }
        
        // Image validation for new students
        if (!isEditing && !currentStudent.image) {
            errors.image = 'Student image is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Fetch students
    // const fetchStudents = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/api/student/students');
    //         setStudents(response.data);
    //     } catch (error) {
    //         console.error('Error fetching students:', error);
    //     }
    // };

    useEffect(() => {
        return () => {
            if (currentStudent.image && currentStudent.image.preview) {
                URL.revokeObjectURL(currentStudent.image.preview);
            }
        };
    }, [currentStudent.image]);
    
    // useEffect(() => {
    //     fetchStudents();
    // }, []);

    useEffect(() => {
        if (isAutoAdd) {
            handleOpen();
        }
    }, [isAutoAdd]);

    const handleOpen = (stu = { student_name: '', student_register_number: '', student_address: '', student_phone_number: '', student_email_address: '', student_image: '', balance: '', student_status: 'Active' }) => {
        setCurrentStudent({
            name: stu.student_name || '', 
            regno: stu.student_register_number || '', 
            address: stu.student_address || '', 
            phoneno: stu.student_phone_number || '', 
            email: stu.student_email_address || '', 
            balance: stu.balance || '', 
            status: stu.student_status || 'Active', 
            image: stu.student_image || '',
            student_id: stu.student_id || null,
        });
        setIsEditing(Boolean(stu.student_id));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentStudent({ 
            name: '', 
            regno: '', 
            address: '', 
            phoneno: '', 
            email: '', 
            balance: '', 
            status: 'Active', 
            image: '' 
        });
        setFormErrors({});
    };

    const handleSave = async () => {
        if (!validateForm()) return;
    
        const formData = new FormData();
        formData.append('name', currentStudent.name);
        formData.append('regno', currentStudent.regno);
        formData.append('address', currentStudent.address);
        formData.append('phoneno', currentStudent.phoneno);
        formData.append('email', currentStudent.email);
        formData.append('balance', parseFloat(currentStudent.balance) || 0);
        formData.append('status', currentStudent.status);
    
        if (!isEditing || currentStudent.image?.preview) {
            formData.append('image', currentStudent.image);
        }
    
        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/student/students/${currentStudent.student_id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post(`http://localhost:5000/api/student/students`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
    
            // ✅ Wait for fetch to finish before closing the dialog
            // await fetchStudents();
            handleClose();
        } catch (error) {
            console.error('Error saving student:', error);
            alert(`Error: ${error.response?.data?.message || 'Failed to save student data'}`);
        }
    };
    

    // Delete student
    // const handleDelete = async (id) => {
    //     if (window.confirm('Are you sure you want to delete this student?')) {
    //         try {
    //             await axios.delete(`http://localhost:5000/api/student/students/${id}`);
    //             fetchStudents();
    //         } catch (error) {
    //             console.error('Error deleting student:', error.response?.data || error.message);
    //             alert('Error deleting student. Please try again.');
    //         }
    //     }
    // };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setCurrentStudent((prev) => ({
                ...prev,
                image: Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }),
            }));
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        },
    });

    // Columns
    // const columns = [
    //     { field: 'student_id', headerName: 'ID', width: 70 },
    //     { field: 'student_name', headerName: 'Name', width: 150 },
    //     { field: 'student_register_number', headerName: 'Register No.', width: 120 },
    //     { 
    //         field: 'student_address', 
    //         headerName: 'Address', 
    //         width: 150,
    //         renderCell: (params) => (
    //             <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
    //                 {params.value}
    //             </div>
    //         )
    //     },
    //     { field: 'student_phone_number', headerName: 'Phone No.', width: 120 },
    //     { field: 'student_email_address', headerName: 'Email', width: 180 },
    //     {
    //         field: 'student_image',
    //         headerName: 'Image',
    //         width: 100,
    //         renderCell: (params) => (
    //             params.value && (
    //                 <img
    //                     src={`http://localhost:5000/${params.value}`}
    //                     alt={params.row.student_name}
    //                     style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
    //                     onError={(e) => {
    //                         e.target.onerror = null;
    //                         // e.target.src = 'https://via.placeholder.com/50';
    //                     }}
    //                 />
    //             )
    //         ),
    //     },
    //     { 
    //         field: 'balance', 
    //         headerName: 'Balance', 
    //         width: 100,
    //         // valueFormatter: (params) => {
    //         //     const value = parseFloat(params.value);
    //         //     return isNaN(value) ? '0.00' : value.toFixed(2);
    //         // }
    //     },
    //     { field: 'student_status', headerName: 'Status', width: 100 },
    //     {
    //         field: 'actions',
    //         headerName: 'Actions',
    //         width: 120,
    //         renderCell: (params) => (
    //             <>
    //                 <IconButton color="primary" onClick={() => handleOpen(params.row)}>
    //                     <Edit />
    //                 </IconButton>
    //                 <IconButton color="error" onClick={() => handleDelete(params.row.student_id)}>
    //                     <Delete />
    //                 </IconButton>
    //             </>
    //         ),
    //     },
    // ];

    return (
        <div style={{ display: 'flex', backgroundColor: '#f7f9f6'}}>
            {/* <NewNavbar /> */}
            {/* <div style={{ marginTop: '50px', marginLeft: '270px', padding: '20px', width: '80%' }}> */}
                {/* <Box p={3}> */}
                    {/* <Typography variant="h4" gutterBottom>
                        Manage Students
                    </Typography> */}

                    {!isAutoAdd && (
                        <button 
                            className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded flex-1 text-center" 
                            onClick={handleOpen}
                        >
                            Add Student
                        </button>
                    )}

                    
                    {/* <Paper style={{ height: 500, width: '100%' }}>
                        <DataGrid
                            rows={students}
                            getRowId={(row) => row.student_id}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[5, 10, 20]}
                            disableSelectionOnClick
                            autoHeight
                        />
                    </Paper> */}

                    {/* Add/Edit Student Dialog */}
                    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                        <DialogTitle>{isEditing ? 'Edit Student' : 'Add Student'}</DialogTitle>
                        <DialogContent>
                            <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 2 }}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Name"
                                    fullWidth
                                    error={!!formErrors.name}
                                    helperText={formErrors.name}
                                    value={currentStudent.name}
                                    onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })}
                                    placeholder="Enter student name"
                                />
                                
                                <TextField
                                    margin="dense"
                                    label="Register No."
                                    fullWidth
                                    error={!!formErrors.regno}
                                    helperText={formErrors.regno}
                                    value={currentStudent.regno}
                                    onChange={(e) => setCurrentStudent({ ...currentStudent, regno: e.target.value })}
                                    placeholder="10 alphanumeric characters"
                                />
                                
                                <TextField
                                    margin="dense"
                                    label="Phone No."
                                    fullWidth
                                    error={!!formErrors.phoneno}
                                    helperText={formErrors.phoneno}
                                    value={currentStudent.phoneno}
                                    onChange={(e) => setCurrentStudent({ ...currentStudent, phoneno: e.target.value })}
                                    placeholder="10 digit phone number"
                                />
                                
                                <TextField
                                    margin="dense"
                                    label="Email"
                                    fullWidth
                                    error={!!formErrors.email}
                                    helperText={formErrors.email}
                                    value={currentStudent.email}
                                    onChange={(e) => setCurrentStudent({ ...currentStudent, email: e.target.value })}
                                    placeholder="student@example.com"
                                    type="email"
                                />
                                
                                <TextField
                                    margin="dense"
                                    label="Balance"
                                    fullWidth
                                    error={!!formErrors.balance}
                                    helperText={formErrors.balance}
                                    value={currentStudent.balance}
                                    onChange={(e) => setCurrentStudent({ ...currentStudent, balance: e.target.value })}
                                    placeholder="Enter balance amount"
                                    type="number"
                                    InputProps={{ inputProps: { min: 0 } }}
                                />
                                
                                <FormControl fullWidth margin="dense">
                                    <Select
                                        value={currentStudent.status}
                                        onChange={(e) => setCurrentStudent({ ...currentStudent, status: e.target.value })}
                                    >
                                        <MenuItem value="Active">Active</MenuItem>
                                        <MenuItem value="In-Active">In-Active</MenuItem>
                                    </Select>
                                    <FormHelperText>Student Status</FormHelperText>
                                </FormControl>
                            </Box>
                            
                            <TextField
                                margin="dense"
                                label="Address"
                                fullWidth
                                error={!!formErrors.address}
                                helperText={formErrors.address}
                                value={currentStudent.address}
                                onChange={(e) => setCurrentStudent({ ...currentStudent, address: e.target.value })}
                                placeholder="Enter full address"
                                multiline
                                rows={3}
                                sx={{ mt: 2 }}
                            />
                                
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle1" gutterBottom>Student Image <span style={{color:'grey'}}>[optional]</span></Typography>
                                <div 
                                    {...getRootProps()} 
                                    style={{ 
                                        border: formErrors.image ? '2px dashed #f44336' : '2px dashed #ccc', 
                                        padding: '20px', 
                                        textAlign: 'center', 
                                        cursor: 'pointer', 
                                        borderRadius: '4px', 
                                        marginTop: '10px' 
                                    }}
                                >
                                    <input {...getInputProps()} />
                        
                                    {/* Show preview if a new image is dropped */}
                                    {currentStudent.image && currentStudent.image.preview ? (
                                        <div>
                                            <img 
                                                src={currentStudent.image.preview} 
                                                alt="Preview" 
                                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} 
                                            />
                                            <Typography variant="caption" display="block" mt={1}>
                                                {currentStudent.image.name}
                                            </Typography>
                                        </div>
                                    ) : (
                                        // Show existing image if editing
                                        currentStudent.image && typeof currentStudent.image === 'string' ? (
                                            <div>
                                                <img 
                                                    src={`http://localhost:5000/uploads/students/${currentStudent.image}`} 
                                                    alt="Current" 
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} 
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        // e.target.src = 'https://via.placeholder.com/100';
                                                    }}
                                                />
                                                <Typography variant="caption" display="block" mt={1}>
                                                    Current Image
                                                </Typography>
                                            </div>
                                        ) : (
                                            <>
                                                <Typography>Drop image here or click to upload</Typography>
                                                {formErrors.image && (
                                                    <Typography color="error" variant="caption">
                                                        {formErrors.image}
                                                    </Typography>
                                                )}
                                            </>
                                        )
                                    )}
                                </div>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSave} variant="contained" color="primary">
                                {isEditing ? 'Update' : 'Add'}
                            </Button>
                        </DialogActions>
                    </Dialog>
                {/* </Box> */}
            {/* </div> */}
        </div>
    );
};

export default StuAddOrEdit;

