import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BookOpen, ShoppingCart, DollarSign, Package } from 'lucide-react';

const LibrarianDashboardHome = () => {
    const axiosSecure = UseAxiosSecure();

    // Fetch books data
    const { data: books = [] } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await axiosSecure.get('/books');
            return res.data;
        }
    });

    // Fetch orders data
    const { data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders');
            return res.data;
        }
    });

    // Calculate statistics
    const totalBooks = books.length;
    const publishedBooks = books.filter(book => book.status === 'published').length;
    const unpublishedBooks = books.filter(book => book.status === 'unpublished').length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.price || 0), 0);

    // Category distribution data
    const categoryData = books.reduce((acc, book) => {
        const category = book.category || 'Other';
        const existing = acc.find(item => item.name === category);
        if (existing) {
            existing.value += 1;
        } else {
            acc.push({ name: category, value: 1 });
        }
        return acc;
    }, []);

    // Monthly orders data (mock data - replace with actual monthly data)
    const monthlyData = [
        { month: 'Jan', orders: 45, revenue: 12500 },
        { month: 'Feb', orders: 52, revenue: 15200 },
        { month: 'Mar', orders: 48, revenue: 13800 },
        { month: 'Apr', orders: 61, revenue: 17500 },
        { month: 'May', orders: 55, revenue: 16200 },
        { month: 'Jun', orders: 67, revenue: 19800 },
    ];

    // Status distribution
    const statusData = [
        { name: 'Published', value: publishedBooks },
        { name: 'Unpublished', value: unpublishedBooks },
    ];

    const COLORS = ['#d34e2d', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Books</p>
                            <p className="text-3xl font-bold text-gray-900">{totalBooks}</p>
                        </div>
                        <div className="p-3 bg-[#fde8e3] rounded-lg">
                            <BookOpen className="text-[#d34e2d]" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                            <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <ShoppingCart className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Published</p>
                            <p className="text-3xl font-bold text-gray-900">{publishedBooks}</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Package className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                            <p className="text-3xl font-bold text-gray-900">৳{totalRevenue}</p>
                        </div>
                        <div className="p-3 bg-amber-100 rounded-lg">
                            <DollarSign className="text-amber-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart - Monthly Orders */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Monthly <span className="text-[#d34e2d]">Orders</span>
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="orders" fill="#d34e2d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart - Book Status */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Book <span className="text-[#d34e2d]">Status</span>
                    </h3>
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
                </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Category <span className="text-[#d34e2d]">Distribution</span>
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#d34e2d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LibrarianDashboardHome;
