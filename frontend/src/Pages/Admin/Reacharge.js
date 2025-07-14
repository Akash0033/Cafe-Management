// import React, { useState, useEffect } from 'react';
// import {
//     Box,
//     Button,
//     TextField,
//     Paper,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Typography,
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';

// const Recharge = () => {
//     const [students, setStudents] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [currentStudent, setCurrentStudent] = useState(null);
//     const [rechargeAmount, setRechargeAmount] = useState('');

//     // Fetch students
//     const fetchStudents = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/student/students');
//             setStudents(response.data);
//         } catch (error) {
//             console.error('Error fetching students:', error);
//         }
//     };

//     useEffect(() => {
//         fetchStudents();
//     }, []);

//     // Handle dialog open/close
//     const handleOpen = (student) => {
//         setCurrentStudent(student);
//         setRechargeAmount('');
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setCurrentStudent(null);
//     };

//     // Handle recharge
//     const handleRecharge = async () => {
//         if (!rechargeAmount || isNaN(rechargeAmount) || rechargeAmount <= 0) {
//             alert('Please enter a valid recharge amount.');
//             return;
//         }

//         try {
//             const updatedBalance = parseFloat(currentStudent.balance) + parseFloat(rechargeAmount);
//             await axios.put(`http://localhost:5000/api/student/students/${currentStudent.id}`, {
//                 balance: updatedBalance,
//             });
//             alert('Recharge successful.');
//             fetchStudents();
//             handleClose();
//         } catch (error) {
//             console.error('Error recharging balance:', error);
//             alert('Unable to process recharge.');
//         }
//     };

//     // Columns for DataGrid
//     const columns = [
//         { field: 'student_id', headerName: 'ID', width: 90 },
//         { field: 'student_name', headerName: 'Name', width: 150 },
//         { field: 'student_register_number', headerName: 'Register Number', width: 150 },
//         { field: 'balance', headerName: 'Balance', width: 120 },
//         { field: 'student_status', headerName: 'Status', width: 120 },
//         { field: 'student_date_create', headerName: 'Created On', width: 150 },
//         {
//             field: 'actions',
//             headerName: 'Actions',
//             width: 150,
//             renderCell: (params) => (
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleOpen(params.row)}
//                 >
//                     Recharge
//                 </Button>
//             ),
//         },
//     ];

//     return (
//         <Box p={3}>
//             <Typography variant="h4" gutterBottom>
//                 Recharge
//             </Typography>
//             <Paper style={{ height: 400, width: '100%' }}>
//                 <DataGrid
//                     rows={students}
//                     columns={columns}
//                     pageSize={5}
//                     rowsPerPageOptions={[5]}
//                     disableSelectionOnClick
//                     getRowId={(row) => row.student_id} 
//                 />
//             </Paper>

//             {/* Recharge Dialog */}
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>Recharge</DialogTitle>
//                 <DialogContent>
//                     <Typography variant="body1" gutterBottom>
//                         Student: {currentStudent?.name}
//                     </Typography>
//                     <Typography variant="body1" gutterBottom>
//                         Current Balance: {currentStudent?.balance}
//                     </Typography>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="Recharge Amount"
//                         type="number"
//                         fullWidth
//                         value={rechargeAmount}
//                         onChange={(e) => setRechargeAmount(e.target.value)}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button onClick={handleRecharge} variant="contained" color="primary">
//                         Recharge
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default Recharge;










import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import NewNavbar from '../../Components/NewNavbar';

const Recharge = () => {
    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [rechargeAmount, setRechargeAmount] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch students
    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/student/students');
            
            // Ensure each student object has an 'id' property for DataGrid
            const studentsWithIds = response.data.map(student => ({
                ...student,
                id: student.student_id,
                // Ensure balance is not null or undefined
                balance: student.balance || 0
            }));
            
            setStudents(studentsWithIds);
        } catch (error) {
            console.error('Error fetching students:', error);
            alert('Failed to load students data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Handle dialog open/close
    const handleOpen = (student) => {
        setCurrentStudent(student);
        setRechargeAmount('');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentStudent(null);
    };

    // Handle recharge
    const handleRecharge = async () => {
        if (!rechargeAmount || isNaN(rechargeAmount) || parseFloat(rechargeAmount) <= 0) {
            alert('Please enter a valid recharge amount.');
            return;
        }

        try {
            setLoading(true);
            const updatedBalance = parseFloat(currentStudent.balance || 0) + parseFloat(rechargeAmount);
            
            // Fixed typo in URL: 'reachaege' -> 'recharge'
            await axios.put(`http://localhost:5000/api/student/students/recharge/${currentStudent.id}`, {
                balance: updatedBalance,
            });
            
            alert('Recharge successful.');
            await fetchStudents(); // Refresh the students list
            handleClose();
        } catch (error) {
            console.error('Error recharging balance:', error);
            alert('Unable to process recharge. ' + (error.response?.data?.error || ''));
        } finally {
            setLoading(false);
        }
    };

    // Columns for DataGrid
    const columns = [
        { field: 'student_id', headerName: 'ID', width: 70 },
        { field: 'student_name', headerName: 'Name', width: 180 },
        { field: 'student_register_number', headerName: 'Register Number', width: 180 },
        { field: 'balance', headerName: 'Balance', width: 120 },
        { field: 'student_status', headerName: 'Status', width: 100 },
        // { 
        //     field: 'student_date_create', 
        //     headerName: 'Created On', 
        //     width: 180,
        //     valueFormatter: (params) => {
        //         if (!params.value) return '';
        //         return new Date(params.value).toLocaleDateString();
        //     }
        // },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleOpen(params.row)}
                >
                    Recharge
                </Button>
            ),
        },
    ];

    return (
        <div style={{ backgroundColor: '#f7f9f6', minHeight: '100vh'}}>
        <NewNavbar/>
        <Box p={3} style={{marginLeft:'185px'}}>
            <Typography variant="h4" gutterBottom>
             Recharge
            </Typography>
            <Paper style={{ height: 500, width: '90%' }}>
                <DataGrid
                    rows={students}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                    loading={loading}
                />
            </Paper>

            {/* Recharge Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Recharge Student Balance</DialogTitle>
                <DialogContent>
                    {currentStudent && (
                        <>
                            <Typography variant="body1" gutterBottom>
                                Student: {currentStudent.student_name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Register Number: {currentStudent.student_register_number}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Current Balance: ₹{currentStudent.balance || 0}
                            </Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Recharge Amount"
                                type="number"
                                fullWidth
                                value={rechargeAmount}
                                onChange={(e) => setRechargeAmount(e.target.value)}
                                inputProps={{ min: 1 }}
                            />
                            {rechargeAmount && !isNaN(rechargeAmount) && parseFloat(rechargeAmount) > 0 && (
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                    New Balance: ₹{parseFloat(currentStudent.balance || 0) + parseFloat(rechargeAmount)}
                                </Typography>
                            )}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button 
                        onClick={handleRecharge} 
                        variant="contained" 
                        color="primary"
                        disabled={loading || !rechargeAmount || isNaN(rechargeAmount) || parseFloat(rechargeAmount) <= 0}
                    >
                        {loading ? 'Processing...' : 'Recharge'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
        </div>
    );
};

export default Recharge;