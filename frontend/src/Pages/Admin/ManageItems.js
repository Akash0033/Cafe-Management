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


const ManageItems = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    // Iname, description, imagePath, price, pricetype, status, categoryid
    
    const [currentItem, setCurrentItem] = useState({ id: '', Iname: '', description: '', price: '', status: 'active', categoryid: '', image: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [formErrors, setFormErrors] = useState({});


    const validateForm = () => {
        let errors = {};
        if (!currentItem.Iname || currentItem.Iname.trim() === '') {
            alert("Item name is required");
            return false;
        }
        // if (!currentItem.Iname.trim()) errors.Iname = 'Item name is required';
        if (!currentItem.description.trim()) errors.description = 'Description is required';

        if (!currentItem.price || String(currentItem.price).trim() === '') {
            alert("Price is required");
            return false;
        }
    
        if (isNaN(currentItem.price)) {
            alert("Price must be a number");
            return false;
        }
        // if (!currentItem.price.trim() || isNaN(currentItem.price) || parseFloat(currentItem.price) <= 0)
        //     errors.price = 'Enter a valid price';
        if (!currentItem.status.trim()) errors.status = 'Status is required';
        if (!isEditing && !currentItem.image) errors.image = 'Item image is required';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    // Fetch items
    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/item/items');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
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
            if (currentItem.image && currentItem.image.preview) {
                URL.revokeObjectURL(currentItem.image.preview);
            }
        };
    }, [currentItem.image]);


    useEffect(() => {
        fetchItems();
        fetchCategories();
    }, []);


    // Handle dialog open/close
    const handleOpen = (item = { item_id: '', item_name: '', item_description: '', item_price: '', item_status: 'active', categoryid: '', item_image: '' }) => {
        setCurrentItem({
            id: item.item_id || '',
            Iname: item.item_name || '',
            description: item.item_description || '', 
            price: item.item_price || '', 
            status: item.item_status || 'active', 
            categoryid: item.categoryid || '', 
            image: item.item_image || ''
        });
        setIsEditing(Boolean(item.item_id));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentItem({ id: '', Iname: '', description: '', price: '', status: 'active', categoryid: '', image: '' });
    };


    // Add or update item
    const handleSave = async () => {
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append('Iname', currentItem.Iname);
        formData.append('description', currentItem.description);
        formData.append('price', currentItem.price);
        formData.append('status', currentItem.status);
        formData.append('categoryid', currentItem.categoryid);
        if (!isEditing || currentItem.image instanceof File) {
            formData.append('image', currentItem.image);
        }

        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/item/items/${currentItem.id}`, formData);
            } else {
                await axios.post('http://localhost:5000/api/item/items', formData);
            }
            fetchItems();
            handleClose();
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };


    // Delete item
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`http://localhost:5000/api/item/items/${id}`);
                fetchItems();
            } catch (error) {
                console.error('Error deleting item:', error.response ? error.response.data : error.message);
            }
        }
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];

        if (file) {
            setCurrentItem((prev) => ({
                ...prev,
                image: Object.assign(file, { preview: URL.createObjectURL(file) }), // Generate preview
            }));
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
    });




    // COLUMNS
    const columns = [
        { field: 'item_id', headerName: 'ID', width: 90 },
        {
            field: 'category_id',
            headerName: 'Category',
            width: 150,
            renderCell: (params) => {
                
                // console.log(categories);
                const category = categories.find(cat => cat.category_id === params.value);
                // return category ? category.name : 'Unknown';
                return category ? category.category_name : 'Unknown';
            },
        },
        { field: 'item_name', headerName: 'Name', width: 150 },
        {
            field: 'item_image',
            headerName: 'Image',
            width: 150,
            renderCell: (params) => (
                params.value && (
                    <img
                    src={`http://localhost:5000/${params.value}`}
                    alt={params.row.Iname}
                    style={{ width: '100px', height: '50px', objectFit: 'fit' }}
                    />
                )
            ),
        },
        { field: 'item_status', headerName: 'Status', width: 120 },
        { field: 'item_price', headerName: 'Price', width: 100 },
        { field: 'item_description', headerName: 'Description', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton color="primary" onClick={() => handleOpen(params.row)}>
                        <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(params.row.item_id)}>
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
                        Manage Items
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => handleOpen()} style={{ marginBottom: '20px', background: '#006400', color: 'white' }}>
                        Add Item
                    </Button>
                    <Paper style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={items}
                            getRowId={(row) => row.item_id}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                        />
                    </Paper>

                    {/* Add/Edit Item Dialog */}
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{isEditing ? 'Edit Item' : 'Add Item'}</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Name"
                                fullWidth
                                error={!!formErrors.Iname}
                                helperText={formErrors.Iname}
                                value={currentItem.Iname}
                                onChange={(e) => setCurrentItem({ ...currentItem, Iname: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="Description"
                                fullWidth
                                error={!!formErrors.description}
                                helperText={formErrors.description}
                                value={currentItem.description}
                                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="Price"
                                fullWidth
                                error={!!formErrors.price}
                                helperText={formErrors.price}
                                value={currentItem.price}
                                onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="Status"
                                fullWidth
                                error={!!formErrors.status}
                                helperText={formErrors.status}
                                value={currentItem.status}
                                onChange={(e) => setCurrentItem({ ...currentItem, status: e.target.value })}
                            />
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={currentItem.categoryid}
                                    onChange={(e) => setCurrentItem({ ...currentItem, categoryid: e.target.value })}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.category_id} value={category.category_id}>
                                            {/* {category.name} */}
                                            {category.category_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer', borderRadius: '4px', marginTop: '20px' }}>
                                <input {...getInputProps()} />

                                {/* Show preview if a new image is dropped */}
                                {currentItem.image && currentItem.image.preview ? (
                                    <img src={currentItem.image.preview} alt="Preview" style={{ width: '100px', height: '50px', objectFit: 'contain' }} />
                                ) : (
                                    // Show existing image if editing
                                    isEditing && currentItem.image ? (
                                        <img src={`http://localhost:5000/${currentItem.image}`} alt="Current" style={{ width: '100px', height: '50px', objectFit: 'contain' }} />
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
export default ManageItems;