import React, { use, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../Contexts/Context';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlineLike } from "react-icons/ai";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { MdBookmarkAdded } from 'react-icons/md';


const BookDetails = () => {
    const books=useLoaderData()
    

  const handleLike = async (bookId, currentLikes) => {
  try {
    const updatedLikes = currentLikes + 1;

    const response = await axiosSecure.patch(`/booksLike/${bookId}`, {
      likes: updatedLikes,
    });

    if (response.data.modifiedCount > 0) {
      window.location.reload()
      // update UI immediately
    }
  } catch (error) {
    console.error("Error updating like:", error);
  }
};
      const book = books[0]; 
  const { user } = use(AuthContext);
  console.log(user)
  const axiosSecure = UseAxiosSecure();

  const [isOpen, setIsOpen] = useState(false);



const addToWishlist = async (book) => {
  try {
    // Prepare the payload
    const data = {
      bookId: book._id,
      bookName: book.bookName,
      authorName: book.authorName,
      bookPrice: book.bookPrice,
      bookImage: book.bookImage,
      sellerEmail: book.sellerEmail,
      userEmail:user.email,
      likes: book.likes || 0, // optional
      
    };

    // Send POST request
    const response = await axiosSecure.post("/wishBooks", data);

    if (response.data.insertedId) {
      Swal.fire({
                 title: "Books Added to WishList!",
                 text: "Your Book has been added to WishList.",
                 icon: "success"
               });
    } else {
     console.log("Book already in wishlist or could not be added.");
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    
  }
};


    const handleOrder = async (e) => {
    e.preventDefault();

    const form = e.target;
    const orderData = {
      name: user?.displayName||form.name.value,
      email: user?.email,
      phone: form.phone.value,
      address: form.address.value,
      bookName: book.bookName,
      bookImage: book.bookImage,
      bookPrice: book.bookPrice,
      sellerEmail:book.sellerEmail,
      created_At: new Date(),
      status:"pending",
      lstatus:"pending"
    };

   try {
  const res = await axiosSecure.post("/orders", orderData);

      

    // 2️⃣ Save to Librarian Collection with SAME DATA
    const res2 = await axiosSecure.post("/librarian", orderData);
  console.log(res2.data)
  toast.success("Order created successfully!");

  console.log(res.data);

} catch (err) {
  toast.error("Failed to create order");
  console.error(err);
}
  

    // close modal
    setIsOpen(false);
  };
    console.log(books[0].bookImage)
    return (
        <div>
            <div className='flex gap-3 shadow-2xl rounded-xl m-10 max-h-[800px] max-w-[500px]'>
            <div > 
                 <img src={books[0].bookImage} alt="" className="w-[350px] h-[450px] object-cover"/>
                 </div>
                <div className='p-3 flex flex-col gap-5'>
                    <p className='text-2xl font-semibold'>Book Name:{books[0].bookName}</p>
                    <p>Book Author :{books[0].authorName}</p>
                    <p>Seller Email :{books[0].sellerEmail}</p>
                    <p className='text-amber-500'>Book Price :{books[0].bookPrice}</p>
 <button className='btn btn-warning' onClick={() => setIsOpen(true)}>
            Order Now
          </button>   
           <div className="flex items-center gap-6 mt-2">
            <button
            onClick={() => handleLike(books[0]._id, books[0].likes)}           
            className="btn btn-sm btn-outline btn-primary"
            >
              Like <AiOutlineLike/>
            </button>
            <span>{books[0].likes}</span>
            <button className='btn' onClick={()=>addToWishlist(book)}><span>Add to <br></br> WishList</span> <MdBookmarkAdded /></button>
          </div>                
                </div>
                </div>

                {isOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Place Your Order</h3>

            <form onSubmit={handleOrder} className="space-y-3">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                defaultValue={user?.displayName}
                
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

              <input
                type="text"
                name="address"
                placeholder="Address"
                required
                className="input input-bordered w-full"
              />

              <button className="btn btn-primary w-full">
                Place Order
              </button>
            </form>

            <div className="modal-action">
              <button className="btn" onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </div>
        </dialog>
)}  <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};

export default BookDetails;