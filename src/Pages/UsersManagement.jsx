import { use } from 'react';
import { Shield, ShieldOff, UserX } from 'lucide-react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Contexts/Context';

const UsersManagement = () => {
    const { user } = use(AuthContext);
    const axiosSecure = UseAxiosSecure();

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    if (!user || isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will be permanently removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d34e2d",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        refetch();
                        Swal.fire({
                            title: "Removed!",
                            text: "User has been removed.",
                            icon: "success"
                        });
                    });
            }
        });
    };

    const handleAdmin = (id) => {
        Swal.fire({
            title: "Make user admin?",
            text: `Change user role to admin?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d34e2d",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, make admin",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/usersrole/${id}`, {
                        role: "admin",
                    });
                    Swal.fire("Updated!", "User set as admin.", "success");
                    refetch();
                } catch (err) {
                    console.error(err);
                    Swal.fire("Error!", "Failed to update status", "error");
                }
            }
        });
    };

    const handleRemoveAdmin = (id) => {
        Swal.fire({
            title: "Change the permission?",
            text: `Change admin to a user?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d34e2d",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, make it user",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/usersrole/${id}`, {
                        role: "users",
                    });
                    Swal.fire("Updated!", "Admin permission removed.", "success");
                    refetch();
                } catch (err) {
                    console.error(err);
                    Swal.fire("Error!", "Failed to update status", "error");
                }
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Users <span className="text-[#d34e2d]">Management</span>
                </h2>
                <p className="text-gray-600 mt-2">Total Users: {users.length}</p>
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
                                    Name
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {user.displayName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            user.role === 'admin' 
                                                ? 'bg-purple-100 text-purple-800' 
                                                : 'bg-blue-100 text-blue-800'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-2">
                                            {user.role === "users" ? (
                                                <button 
                                                    onClick={() => handleAdmin(user.email)}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                >
                                                    <Shield size={16} />
                                                    Make Admin
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => handleRemoveAdmin(user.email)}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                                >
                                                    <ShieldOff size={16} />
                                                    Remove Admin
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => handleDelete(user._id)}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <UserX size={16} />
                                                Remove
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {users.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No users found.</p>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default UsersManagement;
