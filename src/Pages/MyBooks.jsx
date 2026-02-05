import { use, useState} from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../Contexts/Context';
import { useQuery } from '@tanstack/react-query';

const MyBooks = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = use(AuthContext);
   const [loading, setLoading] = useState(true);

    const { data: books = [], refetch } = useQuery({
        queryKey: ['books', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myBooks?email=${user.email}`);
            setLoading(false);
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d34e2d",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/allBooks/${id}`)
                    .then(res => {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your book has been deleted.",
                            icon: "success"
                        });
                    });
            }
        });
        
    };
       if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars loading-lg text-amber-500"></span></div>;


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    My <span className="text-[#d34e2d]">Books</span>
                </h2>
                <p className="text-gray-600 mt-2">Total Books: {books.length}</p>
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
                                    Name
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
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            book.status === 'published' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {book.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-2">
                                            <Link to={`/dashboard/update/${book._id}`}>
                                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Edit2 size={18} />
                                                </button>
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(book._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
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
                        <p className="text-gray-500">No books found. Add your first book!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBooks;
