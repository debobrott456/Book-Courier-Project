import { use, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { AuthContext } from '../Contexts/Context';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { toast, ToastContainer } from 'react-toastify';
import { Heart, ShoppingCart, Star, Truck, Gift, CreditCard, Clock } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { FaStar } from 'react-icons/fa';
import Rating from './Rating';


const BookDetails = () => {
    const books = useLoaderData();
    const book = books[0];
    const { user } = use(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [quantity, setQuantity] = useState(1);
const [reviewText, setReviewText] = useState("");
const [rating, setRating] = useState(0);
const [hover, setHover] = useState(0);
 
  const { id } = useParams();

const handleReviewSubmit = async (e) => {
  e.preventDefault();
  
  if (rating === 0) return toast.error("Please select a star rating");

  const reviewData = {
    bookId: id,
    userName: user?.displayName,
    userEmail: user?.email,
    userPhoto: user?.photoURL,
    rating: rating,
    comment: reviewText,
    date: new Date().toISOString()
  };

  try {
    const res = await axiosSecure.post("/reviews", reviewData);
    if (res.data.insertedId) {
      toast.success("Review posted successfully!");
      setReviewText("");
      setRating(0);
      // Optional: Refresh book data to show new rating
    }
  } catch (err) {
    toast.error("Failed to post review");
    console.error(err);
  }
};
    // Service icons mapping
    const serviceIcons = {
        "Home Delivery": <Truck size={16} />,
        "Gift Wrap": <Gift size={16} />,
        "Cash on Delivery": <CreditCard size={16} />,
        "24-Hour Dispatch": <Clock size={16} />
    };

    const addToWishlist = async () => {
        try {
            const data = {
                bookId: book._id,
                bookName: book.bookName,
                authorName: book.authorName,
                bookPrice: book.bookPrice,
                bookImage: book.bookImage,
                sellerEmail: book.sellerEmail,
                userEmail: user.email,
            };

            const response = await axiosSecure.post("/wishBooks", data);

            if (response.data.insertedId) {
                setIsWishlisted(true);
                Swal.fire({
                    title: "Added to Wishlist!",
                    text: "Book has been added to your wishlist.",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            toast.error("Failed to add to wishlist");
        }
    };


    const handleOrder = async (e) => {
        e.preventDefault();

        const form = e.target;
        const orderData = {
            name: user?.displayName || form.name.value,
            email: user?.email,
            phone: form.phone.value,
            address: form.address.value,
            bookName: book.bookName,
            bookImage: book.bookImage,
            bookPrice: book.bookPrice,
            sellerEmail: book.sellerEmail,
            quantity: quantity,
            created_At: new Date(),
            status: "pending",
            lstatus: "pending"
        };

        try {
            const res = await axiosSecure.post("/orders", orderData);
            const res2 = await axiosSecure.post("/librarian", orderData);
            console.log(res,res2)
            
            toast.success("Order created successfully!");
            setIsOpen(false);
        } catch (err) {
            toast.error("Failed to create order");
            console.error(err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="flex flex-col gap-5 justify-center">
                    <div className="relative">
                        <img 
                            src={book.bookImage} 
                            alt={book.bookName}
                            className="w-96 h-[500px] object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white text-sm font-bold uppercase tracking-wider rounded">
                            {book.status}
                        </div>
                    </div>
                       <div>
                        <h4 className="font-semibold mb-2">Description:</h4>
                        <p className="text-gray-700 leading-relaxed">{book.description}</p>
                    </div>
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                    {/* Title and Author */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.bookName}</h1>
                        <p className="text-lg text-gray-600">by {book.authorName}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    size={20} 
                                    className={i < Math.floor(book.rating) ? "text-yellow-400 fill-current" : "text-gray-300"} 
                                />
                            ))}
                        </div>
                        <span className="text-lg font-semibold">{book.rating}</span>
                        <span className="text-gray-500">({Math.floor(Math.random() * 100) + 50} reviews)</span>
                    </div>

                    {/* Price Section with Title */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Price</h3>
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold text-gray-900">{book.bookPrice} Tk</span>
                            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">{book.availability}</span>
                        </div>
                    </div>

                    {/* Quantity and Actions */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <label className="font-semibold">Quantity:</label>
                            <div className="flex items-center border rounded-lg">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3 py-2 hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 border-x">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3 py-2 hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button 
                                onClick={() => setIsOpen(true)}
                                className="flex-1 flex items-center justify-center gap-2 bg-[#480f0f] hover:bg-[#62292b] text-white font-bold py-3 px-6 rounded-lg transition-colors"
                            >
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>
                            
                            <button 
                                onClick={addToWishlist}
                                className={`p-3 border-2 rounded-lg transition-colors ${
                                    isWishlisted 
                                        ? 'border-red-500 bg-red-50 text-red-500' 
                                        : 'border-gray-300 hover:border-red-500 hover:text-red-500'
                                }`}
                            >
                                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                            </button>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3 border-t pt-6">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-semibold">SKU:</span> {book.sku}
                            </div>
                            <div>
                                <span className="font-semibold">Vendor:</span> {book.vendor}
                            </div>
                            <div>
                                <span className="font-semibold">Category:</span> {book.category}
                            </div>
                            <div>
                                <span className="font-semibold">Seller:</span> {book.sellerName}
                            </div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <h4 className="font-semibold mb-2">Tags:</h4>
                        <div className="flex flex-wrap gap-2">
                            {book.tags.map((tag, index) => (
                                <span 
                                    key={index}
                                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Features (Services) */}
                    <div>
                        <h4 className="font-semibold mb-3">Features:</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {book.services.map((service, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                    {serviceIcons[service] || <Truck size={16} />}
                                    <span>{service}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                 
                </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 border-gray-200 mt-8 w-full lg:w-[400px]">
  <h3 className="text-xl font-bold text-gray-800 mb-6">Leave a Review</h3>
  
  <form onSubmit={handleReviewSubmit} className="space-y-4">
    {/* Star Rating Selector */}
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-600">Your Rating</span>
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              type="button"
              key={starValue}
              className={`text-2xl transition-colors ${
                starValue <= (hover || rating) ? "text-orange-500" : "text-gray-300"
              }`}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            >
              <FaStar />
            </button>
          );
        })}
      </div>
    </div>

    {/* Textarea */}
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-600">Your Feedback</span>
      <textarea
        required
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Share your experience with this service..."
        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none min-h-[120px] transition-all"
      />
    </div>

    <button
      type="submit"
      className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg"
    >
      Submit Review
    </button>
  </form>

  {/* Dummy Review Card */}
  

  {/* Display Visual Statistics (Matching your image_c75fc3.png) */}
  {/* <div className="mt-10 pt-10 border-t grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div className="text-center md:text-left">
      <h4 className="text-5xl font-bold text-gray-900">{book.rating || "5.0"}<span className="text-xl text-gray-400">/5</span></h4>
      <p className="text-gray-500 mt-1">Total Reviews</p>
      <div className="flex justify-center md:justify-start gap-1 mt-2 text-orange-500">
     
        <Rating rating={book.rating}></Rating>
      </div>
    </div>
    
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((num) => (
        <div key={num} className="flex items-center gap-4 text-sm">
          <span className="w-4 font-bold">{num}★</span>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gray-800" 
              style={{ width: num === 5 ? '100%' : '0%' }} 
            />
          </div>
          <span className="text-gray-400">1</span>
        </div>
      ))}
    </div>
  
  </div> */}

</div >
            </div>
            <div className="mt-8 lg:w-[700px] w-full ">
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start gap-4">
        {/* User Avatar */}
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700 flex-shrink-0">
          <span className="text-lg">MV</span>
        </div>

        <div className="flex-1">
          {/* Header with name and date */}
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">Marco Verratti</h4>
            <span className="text-sm text-gray-500">10/25/2023</span>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className="text-yellow-400"
                size={16}
              />
            ))}
          </div>

          {/* Review Comment */}
          <p className="text-gray-700 leading-relaxed">
            "Their customer service is second to none." Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Semper auctor neque vitae tempus quam. Viverra tellus in hac habitasse. Eros donec ac odio tempor orci dapibus ultrices. Nisl porta lorem mollis aliquam ut porttitor leo.
          </p>
        </div>
      </div>
    </div>
  </div>

            {/* Order Modal */}
            {isOpen && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Place Your Order</h3>

                        <form onSubmit={handleOrder} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                defaultValue={user?.displayName}
                                required
                                className="input input-bordered w-full"
                            />

                            <input
                                type="email"
                                value={user?.email}
                                readOnly
                                className="input input-bordered w-full"
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                required
                                className="input input-bordered w-full"
                            />

                            <textarea
                                name="address"
                                placeholder="Delivery Address"
                                required
                                className="textarea textarea-bordered w-full"
                                rows="3"
                            />

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">Order Summary</h4>
                                <div className="flex justify-between">
                                    <span>{book.bookName}</span>
                                    <span>{book.bookPrice} Tk</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Quantity:</span>
                                    <span>{quantity}</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between font-bold">
                                    <span>Total:</span>
                                    <span>{book.bookPrice * quantity} Tk</span>
                                </div>
                            </div>

                            <button className="btn btn-primary w-full">
                                Place Order
                            </button>
                        </form>

                        <div className="modal-action">
                            <button className="btn" onClick={() => setIsOpen(false)}>Close</button>
                        </div>
                    </div>
                </dialog>
            )}
            
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
    
};

export default BookDetails;