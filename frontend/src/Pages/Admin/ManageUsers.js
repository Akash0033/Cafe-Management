import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../Components/AdminNavbar';
import NewNavbar from '../../Components/NewNavbar';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ userName: '', userType: '', password: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/user/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleOpen = () => {
        setIsEditing(false);
        setFormData({ userName: '', userType: '', password: '' });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/user/users/${editUserId}`, formData);
            } else {
                await axios.post('http://localhost:5000/api/auth/register', formData);
            }
            fetchUsers();
            handleClose();
        } catch (error) {
            console.error('Error saving user', error);
        }
    };

    const handleEdit = (id) => {
        const user = users.find((user) => user.login_id === id);
        setFormData({ userName: user.user_name, userType: user.user_type, password: '' });
        setEditUserId(id);
        setIsEditing(true);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/user/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    return (
        <div className="flex">
            {/* <AdminNavbar /> */}
            <NewNavbar />
            <div className="ml-64 p-6 w-full">
                <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
                <button onClick={handleOpen} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                    Add User
                </button>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border">ID</th>
                                <th className="p-2 border">User name</th>
                                <th className="p-2 border">User type</th>
                                <th className="p-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.login_id} className="text-center border">
                                    <td className="p-2 border">{user.login_id}</td>
                                    <td className="p-2 border">{user.user_name}</td>
                                    <td className="p-2 border">{user.user_type}</td>
                                    <td className="p-2 border">
                                        <button onClick={() => handleEdit(user.login_id)} className="text-blue-500 mx-2">Edit</button>
                                        <button onClick={() => handleDelete(user.login_id)} className="text-red-500">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {open && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Edit User' : 'Add User'}</h3>
                            <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded mb-2" required />
                            {/* <input type="text" name="userType" value={formData.userType} onChange={handleChange} placeholder="User type" className="w-full p-2 border rounded mb-2" required /> */}

                            {/* Replaced the text input with a dropdown */}
                            <select name="userType" value={formData.userType} onChange={handleChange} className="w-full p-2 border rounded mb-2" required>
                                <option value="">Select User Type</option>
                                <option value="student">Student</option>
                                <option value="staff">Staff</option>
                                <option value="admin">Admin</option>
                            </select>
                            {/* Dropdown for selecting user type */}
                            
                            {!isEditing && (
                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full p-2 border rounded mb-2" required />
                            )}
                            <div className="flex justify-end">
                                <button onClick={handleClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                                <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">{isEditing ? 'Update' : 'Add'}</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
