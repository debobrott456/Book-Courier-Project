import { Link } from 'react-router';

// Import images using Vite's import method
import FictionImg from '../assets/Fiction1-8.jpg';
import FantasyImg from '../assets/fantasy1-9.jpg';
import StoryImg from '../assets/Story-11.jpg';
import HorrorImg from '../assets/horrorphoto.jpeg';
import ThrillerImg from '../assets/Thriller22-7.jpg';

const Category = () => {
    const categories = [
        {
            name: 'Fiction',
            image: FictionImg,
            description: 'Explore imaginative stories and literary works'
        },
        {
            name: 'Fantasy',
            image: FantasyImg,
            description: 'Magical worlds and supernatural adventures'
        },
        {
            name: 'Story',
            image: StoryImg,
            description: 'Captivating tales and narratives'
        },
        {
            name: 'Horror',
            image: HorrorImg,
            description: 'Spine-chilling and thrilling experiences'
        },
        {
            name: 'Thriller',
            image: ThrillerImg,
            description: 'Suspenseful and action-packed stories'
        }
    ];

    return (
        <div className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Top <span className="text-[#d34e2d]">Category</span>
                    </h2>                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover your favorite genres and explore our curated collection of books
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            to={`/allBooks?category=${category.name}`}
                            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            {/* Category Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                
                                {/* Overlay */}
                                
                                {/* Category Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                    <h3 className="text-xl font-bold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        {category.name.toUpperCase()}
                                    </h3>
                                    <p className="text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                                        {category.description}
                                    </p>
                                </div>

                                {/* Hover Effect Border */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white transition-all duration-300 rounded-xl"></div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Categories Button */}
                <div className="text-center mt-12">
                    <Link
                        to="/allBooks"
                        className="inline-flex items-center px-8 py-1 border border-transparent text-base font-medium rounded-lg text-white bg-[#480f0f] hover:bg-gray-800 transition-colors duration-300"
                    >
                        View All Books
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Category;