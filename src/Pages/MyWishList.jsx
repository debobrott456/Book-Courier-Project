import { use } from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { AuthContext } from '../Contexts/Context';
import { useQuery } from '@tanstack/react-query';
import { Heart, User, DollarSign } from 'lucide-react';

const MyWishList = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = use(AuthContext);

    const { data: books = [] } = useQuery({
        queryKey: ['books', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishBooks?email=${user.email}`);
            console.log(res.data);
            return res.data;
        }
    });

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    My <span className="text-[#d34e2d]">WishList</span>
                    <Heart className="text-[#d34e2d]" size={32} />
                </h1>
                <p className="text-gray-600 mt-2">
                    {books.length} {books.length === 1 ? 'book' : 'books'} in your wishlist
                </p>
            </div>

            {/* Wishlist Grid */}
            {books.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <Heart className="mx-auto text-gray-300 mb-4" size={64} />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500">Start adding books you love to your wishlist!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {books.map((book) => (
                        <div key={book._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="flex gap-4 p-4">
                                {/* Book Image */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={book.bookImage}
                                        alt={book.bookName}
                                        className="w-32 h-44 object-cover rounded-lg shadow-sm"
                                    />
                                </div>

                                {/* Book Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {book.bookName}
                                        </h3>
                                        
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <User size={16} className="text-[#d34e2d]" />
                                                <span>{book.authorName}</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                                <DollarSign size={16} className="text-[#d34e2d]" />
                                                <span>৳{book.bookPrice}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-4">
                                        <button className="w-full px-4 py-2 bg-[#d34e2d] hover:bg-[#b8401f] text-white text-sm font-medium rounded-lg transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyWishList;
