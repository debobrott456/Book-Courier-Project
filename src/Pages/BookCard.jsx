import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router';
import Rating from './Rating';

const BookCard = ({ book }) => {
  // Data destructuring based on your provided object
  const { 
    bookName, 
    authorName, 
    bookImage, 
    bookPrice, 
    sellerName, 
    rating, 
    
  } = book;

  return (
    <div className="w-full lg:w-64 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      
      {/* Top Image Section */}
      <div className="relative h-80 overflow-hidden bg-gray-100">
        <img 
          src={bookImage} 
          alt={bookName} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Wishlist Button - Top Right */}
        {/* <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 hover:bg-white transition-all shadow-sm">
          <Heart size={20} fill="currentColor" className="fill-transparent hover:fill-red-500" />
        </button> */}

        {/* Status Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider rounded">
          Published
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1">
            {bookName}
          </h3>
          {/* <div className="flex items-center gap-1 text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-sm font-semibold text-gray-700">{rating}</span>
          </div> */}
        </div>
         <Rating rating={rating}></Rating>
        <p className="text-sm text-gray-500 mb-2 font-medium">by {authorName}</p>
        
        {/* <p className="text-xs text-gray-400 line-clamp-2 mb-4 ">
          "{description}"
        </p> */}

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xl font-black text-gray-900">{bookPrice} Tk</span>
            <p className="text-[10px] text-gray-400">Sold by: {sellerName}</p>
          </div>
        </div>

        {/* Add to Cart Button */}
       <Link to={`/bookDetails/${book._id}`}><button className="w-full flex items-center justify-center  bg-[#480f0f] hover:bg-[#62292b] text-white font-bold py-1 rounded-xl transition-colors shadow-lg shadow-blue-100">
          <ShoppingCart size={18} />
          View Deatils
        </button></Link>
      </div>
    </div>
  );
};

// Example Usage Component





export default BookCard;