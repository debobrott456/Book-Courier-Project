import { use } from 'react';
import { XCircle, CreditCard } from 'lucide-react';
import { Link } from 'react-router';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { AuthContext } from '../Contexts/Context';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
const MyOrders = () => {
    const { user } = use(AuthContext);
    const axiosSecure = UseAxiosSecure();
    
    const { data: books = [], refetch } = useQuery({
        queryKey: ['books', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user.email}`);
            return res.data;
        }
    });

    const handleCancel = async (id) => {
        Swal.fire({
            title: "Cancel Order?",
            text: "Are you sure you want to cancel this order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d34e2d",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/userOrders/${id}`, {
                        status: "cancelled"
                    });

                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Cancelled!",
                            text: "Your order has been cancelled.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to cancel order.",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    My <span className="text-[#d34e2d]">Orders</span>
                </h2>
                <p className="text-gray-600 mt-2">Total Orders: {books.length}</p>
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
                                    Book
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                                    Book Name
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {books.map((book, index) => (
                                <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img 
                                            src={book.bookImage} 
                                            alt={book.bookName}
                                            className="w-12 h-16 object-cover rounded shadow-sm"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 hidden md:table-cell">
                                        <div className="max-w-xs truncate">{book.bookName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {book.bookPrice} Tk
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            book.status === 'paid' 
                                                ? 'bg-green-100 text-green-800' 
                                                : book.status === 'cancelled'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {book.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-2">
                                            {book.status !== "cancelled" && book.status !== "paid" && (
                                                <>
                                                    <button 
                                                        onClick={() => handleCancel(book._id)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <XCircle size={16} />
                                                        Cancel
                                                    </button>
                                                    <Link to={`../payment/${book._id}`}>
                                                        <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-[#d34e2d] hover:bg-[#b8401f] rounded-lg transition-colors">
                                                            <CreditCard size={16} />
                                                            Pay
                                                        </button>
                                                    </Link>
                                                </>
                                            )}
                                            {book.status === "paid" && (
                                                <span className="text-green-600 text-sm font-medium">Completed</span>
                                            )}
                                            {book.status === "cancelled" && (
                                                <span className="text-red-600 text-sm font-medium">Cancelled</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {books.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No orders found. Start shopping!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
