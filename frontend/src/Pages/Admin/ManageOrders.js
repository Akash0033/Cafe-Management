import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    CircularProgress,
    MenuItem,
    Select,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import NewNavbar from '../../Components/NewNavbar';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch orders
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/bookings'); // Updated API endpoint
            const ordersWithIds = response.data.map((order, index) => ({
                ...order,
                id: index + 1, // Add unique ID for DataGrid
                booking_date: new Date(order.booking_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            }));
            setOrders(ordersWithIds);
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Failed to load orders data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Update booking status
    const handleStatusChange = async (bookingId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/bookings/${bookingId}/status`, { status: newStatus });
            alert('Booking status updated successfully.');
            fetchOrders(); // Refresh orders after update
        } catch (error) {
            console.error('Error updating booking status:', error);
            alert('Failed to update booking status.');
        }
    };

    // Columns for DataGrid
    const columns = [
        { field: 'id', headerName: 'SL.No', width: 70 },
        { field: 'barcode_number', headerName: 'Token Number', width: 150 },
        {
            field: 'serving_time',
            headerName: 'Serving Time',
            width: 150,
        },
        { field: 'student_register_number', headerName: 'Student Reg No', width: 180 },
        {
            field: 'booking_date',
            headerName: 'Ordered On',
            width: 150,
            // valueFormatter: (params) => {
            //     if (!params.value) return '';
            //     return new Date(params.value).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            // },
        },
        {
            field: 'booking_status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => (
                <Select
                    value={params.row.booking_status}
                    onChange={(e) => handleStatusChange(params.row.booking_id, e.target.value)}
                    size="small"
                >
                    <MenuItem value="Order Placed">Order Placed</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
            ),
        },
    ];

    return (
        <div style={{ backgroundColor: '#f7f9f6', minHeight: '100vh' }}>
            <NewNavbar />
            <Box p={3} style={{ marginLeft: '185px' }}>
                <Typography variant="h4" gutterBottom>
                    Manage Orders
                </Typography>
                <Paper style={{ height: 500, width: '90%' }}>
                    {loading ? (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="100%"
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <DataGrid
                            rows={orders}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[5, 10, 20]}
                            disableSelectionOnClick
                        />
                    )}
                </Paper>
            </Box>
        </div>
    );
};

export default ManageOrders;
