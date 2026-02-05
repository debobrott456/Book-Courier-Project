
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ChevronDown, Filter, Search, X } from 'lucide-react';
import BookCard from './BookCard';

const AllBooks = () => {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [searchParams] = useSearchParams();
      const [loading, setLoading] = useState(true);

    
    // Filter states
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedCategories, setSelectedCategories] = useState([]);
    
    // Available categories
    const categories = ['Fiction', 'Story', 'Thriller', 'Fantasy', 'Horror'];

    // Handle URL category parameter
    useEffect(() => {
        const categoryFromUrl = searchParams.get('category');
        if (categoryFromUrl && categories.includes(categoryFromUrl)) {
            setSelectedCategories([categoryFromUrl]);
        }
    }, [searchParams]);

    useEffect(() => {
        fetch(`https://book-server-omega.vercel.app/allBooks?sort=${sortOrder}&status=published`)
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setLoading(false)
            });
    }, [sortOrder]);

    // Filter and search logic
    const getFilteredBooks = () => {
        let filtered = jobs;

        // Search filter
        const term = search.trim().toLowerCase();
        if (term) {
            filtered = filtered.filter(book => 
                book.bookName.toLowerCase().includes(term) ||
                book.authorName.toLowerCase().includes(term)
            );
        }

        // Price range filter
        if (priceRange.min !== '' || priceRange.max !== '') {
            filtered = filtered.filter(book => {
                const price = book.bookPrice;
                const min = priceRange.min === '' ? 0 : Number(priceRange.min);
                const max = priceRange.max === '' ? Infinity : Number(priceRange.max);
                return price >= min && price <= max;
            });
        }

        // Category filter
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(book => 
                selectedCategories.includes(book.category)
            );
        }

        return filtered;
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const clearFilters = () => {
        setPriceRange({ min: '', max: '' });
        setSelectedCategories([]);
    };

    const applyFilters = () => {
        setShowFilterModal(false);
    };

    const filteredBooks = getFilteredBooks();
       if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars loading-lg text-amber-500"></span></div>;
  if (!jobs) return <p>Job not found</p>;
    return (
        <div className="m-[50px]">
            {/* Page Title - Show category name if filtering */}
        

            {/* Header with Search, Filter, and Sort */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                {/* Left side - Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search by title or author..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                </div>

                {/* Right side - Filter and Sort */}
                <div className="flex items-center gap-4">
                    {/* Filter Button */}
                    <button
                        onClick={() => setShowFilterModal(true)}
                        className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Filter size={20} />
                        <span>Apply Filter</span>
                        <ChevronDown size={16} />
                    </button>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        >
                            <option value="desc">Price: High to Low</option>
                            <option value="asc">Price: Low to High</option>
                            <option value="name">Name: A to Z</option>
                            <option value="rating">Rating: High to Low</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                </div>
            </div>

            {/* Active Filters Display */}
            {(selectedCategories.length > 0 || priceRange.min !== '' || priceRange.max !== '') && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="text-sm font-medium text-gray-700">Active Filters:</span>
                    
                    {/* Price Range Filter Tag */}
                    {(priceRange.min !== '' || priceRange.max !== '') && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                            Price: {priceRange.min || '0'} - {priceRange.max || '∞'} Tk
                            <button
                                onClick={() => setPriceRange({ min: '', max: '' })}
                                className="hover:bg-blue-200 rounded-full p-0.5"
                            >
                                <X size={14} />
                            </button>
                        </span>
                    )}

                    {/* Category Filter Tags */}
                    {selectedCategories.map(category => (
                        <span key={category} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                            {category}
                            <button
                                onClick={() => handleCategoryChange(category)}
                                className="hover:bg-green-200 rounded-full p-0.5"
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}

                    {/* Clear All Button */}
                    <button
                        onClick={clearFilters}
                        className="text-sm text-red-600 hover:text-red-800 font-medium"
                    >
                        Clear All
                    </button>
                </div>
            )}

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    Showing {filteredBooks.length} of {jobs.length} books
                </p>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-2 gap-3">
                {filteredBooks.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>

            {/* No Results */}
            {filteredBooks.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
                    <button
                        onClick={clearFilters}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            {/* Filter Modal */}
            {showFilterModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">Filter Books</h3>
                            <button
                                onClick={() => setShowFilterModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Price Range */}
                            <div>
                                <h4 className="text-base font-medium text-gray-900 mb-4">Price Range</h4>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={priceRange.min}
                                            onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <span className="text-gray-500">to</span>
                                    <div className="flex-1">
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={priceRange.max}
                                            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Categories */}
                            <div>
                                <h4 className="text-base font-medium text-gray-900 mb-4">Categories</h4>
                                <div className="space-y-3">
                                    {categories.map(category => (
                                        <label key={category} className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => handleCategoryChange(category)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-gray-700">{category}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                            >
                                Clear All
                            </button>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowFilterModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={applyFilters}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllBooks;