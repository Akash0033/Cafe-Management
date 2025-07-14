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
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import AdminNavbar from '../../Components/AdminNavbar';
import { useDropzone } from 'react-dropzone';
import NewNavbar from '../../Components/NewNavbar';


const ManageCategories = () => {

    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    // Cname, image, Cstatus
    // const [currentCategory, setCurrentCategory] = useState({ id: '', Cname: '', Cstatus: '', image: '' });
    const [currentCategory, setCurrentCategory] = useState({ Cname: '', Cstatus: '', image: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        let errors = {};
        if (!currentCategory.Cname.trim()) errors.Cname = 'Category name is required';
        if (!currentCategory.Cstatus.trim()) errors.Cstatus = 'Status is required';
        if (!isEditing && !currentCategory.image) errors.image = 'Category image is required';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };


    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/category/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    useEffect(() => {
        return () => {
            if (currentCategory.image && currentCategory.image.preview) {
                URL.revokeObjectURL(currentCategory.image.preview);
            }
        };
    }, [currentCategory.image]);
    

    useEffect(() => {
        fetchCategories();
    }, []);


    // Handle dialog open/close
    // const handleOpen = (categ = { id: '', Cname: '', Cstatus: 'active', image: '' }) => {
    const handleOpen = (categ = { category_name: '', category_status: 'active', category_image: '' }) => {
        setCurrentCategory({
            Cname: categ.category_name || '',
            Cstatus: categ.category_status || '',
            image: categ.category_image || '',
            category_id: categ.category_id || null,
        });
        setIsEditing(Boolean(categ.category_id));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        // setCurrentCategory({ id: '', Cname: '', Cstatus: 'active', image: '' });
        setCurrentCategory({ Cname: '', Cstatus: 'active', image: '' });
    };


    // Add or update category
    const handleSave = async () => {
        if (!validateForm()) return;

        
        const formData = new FormData();
        formData.append('Cname', currentCategory.Cname);
        formData.append('Cstatus', currentCategory.Cstatus);

        // Only append image if it's a new file, not a URL
        if (!isEditing || currentCategory.image instanceof File) { 
            formData.append('image', currentCategory.image); // Only append if new image is selected
        }


        console.log("Sending data:", formData);

        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/category/categories/${currentCategory.category_id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('http://localhost:5000/api/category/categories', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            fetchCategories();
            handleClose();
        } catch (error) {
            console.error('Error saving category:', error);
        }
    };


    // Delete category
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                console.log("Deleting category with ID:", id);
                await axios.delete(`http://localhost:5000/api/category/categories/${id}`);
                fetchCategories();
            } catch (error) {
                console.error('Error deleting category:', error.response?.data || error.message);
            }
        }
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setCurrentCategory((prev) => ({
                ...prev,
                image: Object.assign(file, {
                    preview: URL.createObjectURL(file), // Create a preview URL
                }),
            }));
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
    });



    // COLUMNS
    const columns = [
        { field: 'category_id', headerName: 'ID', width: 90 },
        { field: 'category_name', headerName: 'Category name', width: 150 },
        { field: 'category_status', headerName: 'Status', width: 120 },
        // { field: 'categoryid', headerName: 'Category ID', width: 120 },

        // {
        //     field: 'categoryid',
        //     headerName: 'Category',
        //     width: 150,
        //     renderCell: (params) => {
        //         const category = categories.find(cat => cat.id === params.value);
        //         return category ? category.name : 'Unknown';
        //     },
        // },

        {
            field: 'category_image',
            headerName: 'Image',
            width: 150,
            renderCell: (params) => (
                params.value && (
                    <img
                        src={`http://localhost:5000/${params.value}`}
                        alt={params.row.Cname}
                        style={{ width: '100px', height: '50px', objectFit: 'contain' }}
                    />
                )
            ),
        },
        
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                
                <>
                    <IconButton color="primary" onClick={() => {console.log(params.row);handleOpen(params.row)}}>
                        <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(params.row.category_id)}>
                        <Delete />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
    <>
    <div style={{ display: 'flex', backgroundColor: '#f7f9f6'}}>
        {/* <AdminNavbar /> */}
        <NewNavbar />
        <div style={{ marginTop: '50px', marginLeft: '270px', padding: '20px', width: '80%' }}>
            <Box p={3}>
                <Typography variant="h4" gutterBottom>
                    Manage Categories
                </Typography>
                <Button variant="contained" color="primary" onClick={() => handleOpen()} style={{ marginBottom: '20px', background: '#006400', color: 'white' }}>
                    Add Category
                </Button>
                <Paper style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={categories}
                        getRowId={(row) => row.category_id} // Use category_id as the row's unique identifier
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                </Paper>

                {/* Add/Edit Category Dialog */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{isEditing ? 'Edit Category' : 'Add Category'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Name"
                            fullWidth
                            error={!!formErrors.Cname}
                            helperText={formErrors.Cname}
                            value={currentCategory.Cname}
                            onChange={(e) => setCurrentCategory({ ...currentCategory, Cname: e.target.value })}
                        />
                        
                        <TextField
                            margin="dense"
                            label="Status"
                            fullWidth
                            error={!!formErrors.Cstatus}
                            helperText={formErrors.Cstatus}
                            value={currentCategory.Cstatus}
                            onChange={(e) => setCurrentCategory({ ...currentCategory, Cstatus: e.target.value })}
                        />

                        
                        <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer', borderRadius: '4px', marginTop: '20px' }}>
                            <input {...getInputProps()} />
        
                            {/* Show preview if a new image is dropped */}
                            {currentCategory.image && currentCategory.image.preview ? (
                                <img src={currentCategory.image.preview} alt="Preview" style={{ width: '100px', height: '50px', objectFit: 'contain' }} />
                            ) : (
                                // Show existing image if editing
                                currentCategory.image && typeof currentCategory.image === 'string' ? (
                                    <img src={`http://localhost:5000/${currentCategory.image}`} alt="Current" style={{ width: '100px', height: '50px', objectFit: 'contain' }} />
                                ) : (
                                    <Typography>{'Drop image here or click to upload'}</Typography>
                                )
                            )}
                        </div>
                        
                        
                        
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

export default ManageCategories;