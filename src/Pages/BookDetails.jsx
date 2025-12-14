import React, { use, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../Contexts/Context';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const BookDetails = () => {
    const books=useLoaderData()
      const book = books[0]; 
  const { user } = use(AuthContext);
  console.log(user)
  const axiosSecure = UseAxiosSecure();

  const [isOpen, setIsOpen] = useState(false);

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
    console.log(books)
    return (
        <div>
            <div className='flex gap-3 shadow-2xl rounded-xl m-10 max-h-[800px] max-w-[500px]'>
              <div >  <img src={books[0].bookImage} alt="" className="w-[380px] h-[450px]"/></div>
                <div className='p-3 flex flex-col gap-5'>
                    <p className='text-2xl font-semibold'>Book Name:{books[0].bookName}</p>
                    <p>Book Author :{books[0].authorName}</p>
                    <p className='text-amber-500'>Book Price :{books[0].bookPrice}</p>
 <button className='btn btn-warning' onClick={() => setIsOpen(true)}>
            Order Now
          </button>                  
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