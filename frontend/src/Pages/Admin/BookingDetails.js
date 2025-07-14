import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Button,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Divider,
    Chip,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NewNavbar from '../../Components/NewNavbar';

const BookingDetails = () => {
    const { id } = useParams();
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/bookings/${id}`);
                setBookingData(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching booking details:', error);
                setError('Failed to load booking details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [id]);

    const handleStatusChange = async (newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/bookings/${id}/status`, {
                status: newStatus
            });
            // Refresh booking data
            const response = await axios.get(`http://localhost:5000/api/bookings/${id}`);
            setBookingData(response.data);
            alert(`Status updated to ${newStatus}`);
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    if (loading) {
        return (
            <div style={{ backgroundColor: '#f7f9f6', minHeight: '100vh' }}>
                <NewNavbar />
                <Box 
                    p={3} 
                    style={{ marginLeft: '185px' }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="80vh"
                >
                    <CircularProgress />
                </Box>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ backgroundColor: '#f7f9f6', minHeight: '100vh' }}>
                <NewNavbar />
                <Box p={3} style={{ marginLeft: '185px' }}>
                    <Typography color="error" variant="h6">{error}</Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => window.history.back()}
                        style={{ marginTop: '20px' }}
                    >
                        Go Back
                    </Button>
                </Box>
            </div>
        );
    }

    const { booking, items, totalAmount } = bookingData;

    return (
        <div style={{ backgroundColor: '#f7f9f6', minHeight: '100vh' }}>
            <NewNavbar />
            <Box p={3} style={{ marginLeft: '185px' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4">Booking Details</Typography>
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        onClick={() => window.history.back()}
                    >
                        Back to List
                    </Button>
                </Box>

                <Grid container spacing={3}>
                    {/* Booking Information */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>Booking Information</Typography>
                            <Divider sx={{ mb: 2 }} />
                            
                            <Box display="flex" justifyContent="space-between" mb={1}>
                                <Typography variant="subtitle1">Booking ID:</Typography>
                                <Typography>{booking.booking_id}</Typography>
                            </Box>
                            
                            <Box display="flex" justifyContent="space-between" mb={1}>
                                <Typography variant="subtitle1">Token Number:</Typography>
                                <Typography>{booking.barcode_number}</Typography>
                            </Box>
                            
                            <Box display="flex" justifyContent="space-between" mb={1}>
                                <Typography variant="subtitle1">Serving Time:</Typography>
                                <Typography>{booking.serving_time || 'Not specified'}</Typography>
                            </Box>
                            
                            <Box display="flex" justifyContent="space-between" mb={1}>
                                <Typography variant="subtitle1">Booking Date:</Typography>
                                <Typography>
                                    {booking.booking_date 
                                        ? new Date(booking.booking_date).toLocaleString() 
                                        : 'Not specified'}
                                </Typography>
                            </Box>
                            
                            <Box display="flex" justifyContent="space-between" mb={1}>
                                <Typography variant="subtitle1">Status:</Typography>
                                <Chip 
                                    label={booking.booking_status || 'Pending'} 
                                    color={
                                        booking.booking_status === 'completed' ? 'success' : 
                                        booking.booking_status === 'canceled' ? 'error' : 'primary'
                                    }
                                />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Student Information */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>Student Information</Typography>
                            <Divider sx={{ mb: 2 }} />
                            
                            <Box display="flex" justifyContent="space-between" mb={1}>
                                <Typography variant="subtitle1">Student ID:</Typography>
                                <Typography>{booking.student_id}</Typography>
                            </Box>
                            
                            <Box display="flex" justifyContent="space-between" mb={1}>
                                <Typography variant="subtitle1">Name:</Typography>
                                <Typography>{booking.student_name || 'Not available'}</Typography>
                            </Box>
                            
                            <Box display="flex" justifyContent="space-between" mb={1}>
                                <Typography variant="subtitle1">Register Number:</Typography>
                                <Typography>{booking.student_register_number || 'Not available'}</Typography>
                            </Box>
                            
                            <Box display="flex" justifyContent="space-between" mb={1}>
                                <Typography variant="subtitle1">Phone:</Typography>
                                <Typography>{booking.student_phone_number || 'Not available'}</Typography>
                            </Box>
                            
                            <Box display="flex" justifyContent="space-between" mb={1}>
                                <Typography variant="subtitle1">Email:</Typography>
                                <Typography>{booking.student_email_address || 'Not available'}</Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Order Items */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>Ordered Items</Typography>
                            <Divider sx={{ mb: 2 }} />
                            
                            {items && items.length > 0 ? (
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Item Name</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                                <TableCell align="right">Quantity</TableCell>
                                                <TableCell align="right">Total</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {items.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{item.item_name}</TableCell>
                                                    <TableCell align="right">₹{item.item_price}</TableCell>
                                                    <TableCell align="right">{item.quantity}</TableCell>
                                                    <TableCell align="right">₹{item.item_price * item.quantity}</TableCell>
                                                </TableRow>
                                            ))}
                                            <TableRow>
                                                <TableCell colSpan={3} align="right"><strong>Total Amount</strong></TableCell>
                                                <TableCell align="right"><strong>₹{totalAmount}</strong></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Typography>No items found for this booking.</Typography>
                            )}
                        </Paper>
                    </Grid>

                    {/* Action Buttons */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>Actions</Typography>
                            <Divider sx={{ mb: 2 }} />
                            
                            <Box display="flex" gap={2}>
                                <Button 
                                    variant="contained" 
                                    color="success"
                                    onClick={() => handleStatusChange('completed')}
                                    disabled={booking.booking_status === 'completed'}
                                >
                                    Mark as Completed
                                </Button>
                                
                                <Button 
                                    variant="contained" 
                                    color="warning"
                                    onClick={() => handleStatusChange('processing')}
                                    disabled={booking.booking_status === 'processing'}
                                >
                                    Mark as Processing
                                </Button>
                                
                                <Button 
                                    variant="contained" 
                                    color="error"
                                    onClick={() => handleStatusChange('canceled')}
                                    disabled={booking.booking_status === 'canceled'}
                                >
                                    Cancel Booking
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default BookingDetails;