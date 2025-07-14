import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, ShoppingBag, Coffee, UserCheck, TrendingUp, DollarSign, Clock, Calendar } from 'lucide-react';
import NewNavbar from '../../Components/NewNavbar';

const AdminDash = () => {
    const [counts, setCounts] = useState({
        categories: 0,
        items: 0,
        students: 0,
        staff: 0,
        totalOrders: 0,
        revenue: 0,
        pendingOrders: 0
    });

    const [recentOrders, setRecentOrders] = useState([]);
    const [popularItems, setPopularItems] = useState([]);
    const [orderTrends, setOrderTrends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all required data when component mounts
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                // Fetch counts
                const countsResponse = await fetch('http://localhost:5000/api/admin/counts');
                if (!countsResponse.ok) throw new Error('Failed to fetch counts data');
                const countsData = await countsResponse.json();
                setCounts(countsData);

                // Fetch recent orders
                const ordersResponse = await fetch('http://localhost:5000/api/admin/recent-orders');
                if (!ordersResponse.ok) throw new Error('Failed to fetch recent orders');
                const ordersData = await ordersResponse.json();
                setRecentOrders(ordersData);

                // Fetch popular items
                const popularItemsResponse = await fetch('http://localhost:5000/api/admin/popular-items');
                if (!popularItemsResponse.ok) throw new Error('Failed to fetch popular items');
                const popularItemsData = await popularItemsResponse.json();
                // Transform data for pie chart if needed
                const formattedPopularItems = popularItemsData.map(item => ({
                    name: item.item_name,
                    value: item.order_count
                }));
                setPopularItems(formattedPopularItems);

                // Fetch order trends by day of week
                const trendResponse = await fetch('http://localhost:5000/api/admin/order-trends');
                if (!trendResponse.ok) throw new Error('Failed to fetch order trends');
                const trendData = await trendResponse.json();
                // Transform data for bar chart if needed
                const formattedTrends = trendData.map(day => ({
                    name: day.day_name.substring(0, 3), // Abbreviate day names
                    orders: day.order_count
                }));
                setOrderTrends(formattedTrends);

                setError(null);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();

        // Set up interval to refresh data every 5 minutes
        const intervalId = setInterval(fetchDashboardData, 300000);
        
        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
    const statusColors = {
        'Completed': 'bg-green-500',
        'Preparing': 'bg-blue-500',
        'Pending': 'bg-yellow-500',
        'Ready': 'bg-purple-500',
        'Cancelled': 'bg-red-500'
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    // Format date and time
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
        });
    };

    if (loading && !recentOrders.length) {
        return (
            <div className="flex h-screen bg-gray-100">
                <NewNavbar />
                <div className="flex-1 overflow-auto pl-64 flex items-center justify-center">
                    <div className="text-xl text-gray-600">Loading dashboard data...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen bg-gray-100">
                <NewNavbar />
                <div className="flex-1 overflow-auto pl-64 flex items-center justify-center">
                    <div className="text-xl text-red-600">Error loading dashboard: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <NewNavbar />
            
            <div className="flex-1 overflow-auto pl-64">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                            <p className="text-gray-600">Manage your online canteen ordering system</p>
                        </div>
                        <div className="flex space-x-4">
                          
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow p-6 flex items-center">
                            <div className="rounded-full bg-blue-100 p-3 mr-4">
                                <Coffee className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Menu Categories</p>
                                <h3 className="text-2xl font-bold">{counts.categories}</h3>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-xl shadow p-6 flex items-center">
                            <div className="rounded-full bg-green-100 p-3 mr-4">
                                <ShoppingBag className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Menu Items</p>
                                <h3 className="text-2xl font-bold">{counts.items}</h3>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-xl shadow p-6 flex items-center">
                            <div className="rounded-full bg-purple-100 p-3 mr-4">
                                <Users className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Students</p>
                                <h3 className="text-2xl font-bold">{counts.students}</h3>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-xl shadow p-6 flex items-center">
                            <div className="rounded-full bg-orange-100 p-3 mr-4">
                                <UserCheck className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Staff</p>
                                <h3 className="text-2xl font-bold">{counts.staff}</h3>
                            </div>
                        </div>
                    </div>

                    {/* Additional Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow p-6 flex items-center">
                            <div className="rounded-full bg-red-100 p-3 mr-4">
                                <TrendingUp className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Total Orders</p>
                                <h3 className="text-2xl font-bold">{counts.totalOrders}</h3>
                            </div>
                        </div>
                        
                    
                        
                        <div className="bg-white rounded-xl shadow p-6 flex items-center">
                            <div className="rounded-full bg-indigo-100 p-3 mr-4">
                                <Clock className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Pending Orders</p>
                                <h3 className="text-2xl font-bold">{counts.pendingOrders}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Orders Summary */}
                        <div className="bg-white rounded-xl shadow col-span-2">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-bold text-gray-800">Orders This Week</h2>
                            </div>
                            <div className="p-6 h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    {orderTrends.length > 0 ? (
                                        <BarChart
                                            data={orderTrends}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="orders" fill="#8884d8" />
                                        </BarChart>
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <p className="text-gray-500">No order data available</p>
                                        </div>
                                    )}
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Popular Items */}
                        <div className="bg-white rounded-xl shadow">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-bold text-gray-800">Popular Items</h2>
                            </div>
                            <div className="p-6 h-64 flex justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    {popularItems.length > 0 ? (
                                        <PieChart>
                                            <Pie
                                                data={popularItems}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {popularItems.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <p className="text-gray-500">No item data available</p>
                                        </div>
                                    )}
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-white rounded-xl shadow mb-8">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                            <button className="text-blue-600 hover:text-blue-800" onClick={() => window.location.href = '/admin/ManageOrders'}>
                                View All Orders →
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            {recentOrders.length > 0 ? (
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left text-gray-500 text-sm border-b">
                                            <th className="px-6 py-3">Order ID</th>
                                            <th className="px-6 py-3">Customer</th>
                                            <th className="px-6 py-3">Items</th>
                                            {/* <th className="px-6 py-3">Total</th> */}
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3">Time</th>
                                            {/* <th className="px-6 py-3">Actions</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map((order) => (
                                            <tr key={order.booking_id} className="border-b hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-sm">#{order.booking_id}</td>
                                                <td className="px-6 py-4 text-sm">{order.student_name || 'N/A'}</td>
                                                <td className="px-6 py-4 text-sm">{order.item_count || 1}</td>
                                                {/* <td className="px-6 py-4 text-sm">{formatCurrency(order.total_amount || 0)}</td> */}
                                                <td className="px-6 py-4 text-sm">
                                                    <span className={`inline-block px-2 py-1 rounded-full text-xs text-white ${statusColors[order.booking_status] || 'bg-gray-500'}`}>
                                                        {order.booking_status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm">{formatDateTime(order.booking_date)}</td>
                                                
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-6 text-center text-gray-500">
                                    No recent orders found
                                </div>
                            )}
                        </div>
                    </div>

               
                </div>
            </div>
        </div>
    );
};

export default AdminDash;