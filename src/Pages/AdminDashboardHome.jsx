import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, BookOpen, ShoppingCart, DollarSign, UserCheck, Library } from 'lucide-react';

const AdminDashboardHome = () => {
    const axiosSecure = UseAxiosSecure();

    // Fetch all users
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // Fetch all books
    const { data: books = [] } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await axiosSecure.get('/books');
            return res.data;
        }
    });

    // Fetch all orders
    const { data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders');
            return res.data;
        }
    });

    // Calculate statistics
    const totalUsers = users.length;
    const adminCount = users.filter(user => user.role === 'admin').length;
    const librarianCount = users.filter(user => user.role === 'librarian').length;
    const regularUsers = users.filter(user => !user.role || user.role === 'user').length;
    const totalBooks = books.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.price || 0), 0);

    // User role distribution
    const roleData = [
        { name: 'Users', value: regularUsers },
        { name: 'Librarians', value: librarianCount },
        { name: 'Admins', value: adminCount },
    ];

    // Book category distribution
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

    // Monthly revenue (mock data - replace with actual)
    const monthlyRevenue = [
        { month: 'Jan', revenue: 45000, orders: 120 },
        { month: 'Feb', revenue: 52000, orders: 145 },
        { month: 'Mar', revenue: 48000, orders: 132 },
        { month: 'Apr', revenue: 61000, orders: 168 },
        { month: 'May', revenue: 55000, orders: 151 },
        { month: 'Jun', revenue: 67000, orders: 189 },
    ];

    const COLORS = ['#d34e2d', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Users</p>
                            <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {regularUsers} regular users
                            </p>
                        </div>
                        <div className="p-3 bg-[#fde8e3] rounded-lg">
                            <Users className="text-[#d34e2d]" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Librarians</p>
                            <p className="text-3xl font-bold text-gray-900">{librarianCount}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                Managing books
                            </p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Library className="text-purple-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Admins</p>
                            <p className="text-3xl font-bold text-gray-900">{adminCount}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                System administrators
                            </p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <UserCheck className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Books</p>
                            <p className="text-3xl font-bold text-gray-900">{totalBooks}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                In catalog
                            </p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <BookOpen className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                            <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                All time
                            </p>
                        </div>
                        <div className="p-3 bg-amber-100 rounded-lg">
                            <ShoppingCart className="text-amber-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                            <p className="text-3xl font-bold text-gray-900">৳{totalRevenue}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                All time earnings
                            </p>
                        </div>
                        <div className="p-3 bg-emerald-100 rounded-lg">
                            <DollarSign className="text-emerald-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Line Chart - Monthly Revenue */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Monthly <span className="text-[#d34e2d]">Revenue</span>
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyRevenue}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#d34e2d" strokeWidth={2} name="Revenue (৳)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart - User Roles */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        User <span className="text-[#d34e2d]">Roles</span>
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={roleData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {roleData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart - Category Distribution */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Book <span className="text-[#d34e2d]">Categories</span>
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#d34e2d" name="Books" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart - Monthly Orders */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Monthly <span className="text-[#d34e2d]">Orders</span>
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyRevenue}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="orders" fill="#10b981" name="Orders" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
