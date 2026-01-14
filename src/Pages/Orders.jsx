import { use } from 'react';
import { XCircle, Package } from 'lucide-react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../Contexts/Context';
import { useQuery } from '@tanstack/react-query';

const Orders = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = use(AuthContext);
    const email = user?.email;

    const { data: orders = [], refetch } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/librarian/${email}`);
            return res.data;
        }
    });

    const handleStatusChange = (id, newStatus) => {
        Swal.fire({
            title: "Update Status?",
            text: `Change order status to "${newStatus}"?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d34e2d",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, update",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/librarian/${id}`, {
                        lstatus: newStatus,
                    });
                    refetch();
                    Swal.fire("Updated!", "Order status updated.", "success");
                } catch (err) {
                    console.error(err);
                    Swal.fire("Error!", "Failed to update status", "error");
                }
            }
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Order will be cancelled!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d34e2d",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Cancel!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/librarian/${id}`)
                    .then(res => {
                        refetch();
                        Swal.fire({
                            title: "Cancelled!",
                            text: "Order has been cancelled.",
                            icon: "success"
                        });
                    });
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3">
                    <Package className="text-[#d34e2d]" size={28} />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            All <span className="text-[#d34e2d]">Orders</span>
                        </h2>
                        <p className="text-gray-600 mt-1">Total Orders: {orders.length}</p>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    #
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                                    Address
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Book
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order, index) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                                        {order.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                                        <div className="max-w-xs truncate">{order.address}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        <div className="max-w-xs truncate">{order.bookName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.bookPrice} Tk
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border-0 outline-none cursor-pointer ${
                                                order.lstatus === 'delivered'
                                                    ? 'bg-green-100 text-green-800'
                                                    : order.lstatus === 'shipped'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                            value={order.lstatus}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button
                                            onClick={() => handleDelete(order._id)}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <XCircle size={16} />
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {orders.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="mx-auto text-gray-400 mb-4" size={48} />
                        <p className="text-gray-500">No orders found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
