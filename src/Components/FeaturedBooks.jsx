import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import BookCard from '../Pages/BookCard';

const FeaturedBooks = () => {
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedBooks = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://book-server-omega.vercel.app/allBooks?status=published');
                const data = await response.json();
                
                // Sort books by rating (highest first) and get top 5
                const topRatedBooks = data
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 5);
                
                setFeaturedBooks(topRatedBooks);
            } catch (error) {
                console.error('Error fetching featured books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedBooks();
    }, []);

    return (
        <div className="py-6 bg-white">
            <div className="w-full mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Featured <span className="text-[#d34e2d]">Books</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our top-rated books, handpicked based on customer reviews and ratings
                    </p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <>
                        {/* Featured Books Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {featuredBooks.map((book) => (
                                <BookCard key={book._id} book={book} />
                            ))}
                        </div>

                        {/* No Books Message */}
                        {featuredBooks.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No featured books available at the moment.</p>
                            </div>
                        )}
                    </>
                )}

                {/* View All Books Button */}
                <div className="text-center mt-10">
                    {/* <a
                        href="/allBooks"
                        className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#d34e2d] hover:bg-[#b8401f] transition-colors duration-300"
                    >
                        View All Books
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </a> */}
                </div>
            </div>
        </div>
    );
};

export default FeaturedBooks;
