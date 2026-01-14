import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { AuthContext } from '../Contexts/Context';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ShoppingBag, Heart, DollarSign, Package } from 'lucide-react';

const UserDashboardHome = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = use(AuthContext);

    // Fetch user orders
    const { data: orders = [] } = useQuery({
        queryKey: ['myOrders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user.email}`);
            return res.data;
        }
    });

    // Fetch wishlist
    const { data: wishlist = [] } = useQuery({
        queryKey: ['wishlist', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishBooks?email=${user.email}`);
            return res.data;
        }
    });

    // Calculate statistics
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const completedOrders = orders.filter(order => order.status === 'delivered').length;
    const totalSpent = orders.reduce((sum, order) => sum + (order.price || 0), 0);
    const wishlistCount = wishlist.length;

    // Order status distribution
    const statusData = [
        { name: 'Pending', value: orders.filter(o => o.status === 'pending').length },
        { name: 'Processing', value: orders.filter(o => o.status === 'processing').length },
        { name: 'Shipped', value: orders.filter(o => o.status === 'shipped').length },
        { name: 'Delivered', value: orders.filter(o => o.status === 'delivered').length },
        { name: 'Cancelled', value: orders.filter(o => o.status === 'cancelled').length },
    ].filter(item => item.value > 0);

    // Monthly spending (mock data - replace with actual)
    const monthlySpending = [
        { month: 'Jan', amount: 1200 },
        { month: 'Feb', amount: 1800 },
        { month: 'Mar', amount: 1500 },
        { month: 'Apr', amount: 2200 },
        { month: 'May', amount: 1900 },
        { month: 'Jun', amount: 2500 },
    ];

    const COLORS = ['#d34e2d', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

    return (
        <div className="space-y-6">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-[#d34e2d] to-[#b8401f] rounded-lg shadow-sm p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.displayName}!</h2>
                <p className="text-white/90">Here's an overview of your book shopping activity</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                            <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
                        </div>
                        <div className="p-3 bg-[#fde8e3] rounded-lg">
                            <ShoppingBag className="text-[#d34e2d]" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Completed</p>
                            <p className="text-3xl font-bold text-gray-900">{completedOrders}</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Package className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Wishlist</p>
                            <p className="text-3xl font-bold text-gray-900">{wishlistCount}</p>
                        </div>
                        <div className="p-3 bg-pink-100 rounded-lg">
                            <Heart className="text-pink-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                            <p className="text-3xl font-bold text-gray-900">৳{totalSpent}</p>
                        </div>
                        <div className="p-3 bg-amber-100 rounded-lg">
                            <DollarSign className="text-amber-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart - Monthly Spending */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Monthly <span className="text-[#d34e2d]">Spending</span>
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlySpending}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#d34e2d" name="Amount (৳)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart - Order Status */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Order <span className="text-[#d34e2d]">Status</span>
                    </h3>
                    {statusData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-[300px] text-gray-500">
                            No orders yet
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboardHome;
