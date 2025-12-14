import React from 'react';
import { useLoaderData } from 'react-router';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
const Payment = () => {
    const axiossecure=UseAxiosSecure()
    const books =useLoaderData();
        const handlePayment =async()=>{
          const paymentInfo={
            bookPrice :books[0].bookPrice,
            email:books[0].email,
            bookName:books[0].bookName,
            parcelId:books[0]._id
          }
          const res =await axiossecure.post('/create-checkout-session',paymentInfo)
          console.log(res.data)
          window.location.href=res.data.url;
        }
    
    console.log(books)
    return (
        <div>
            <h3>Pay for {books[0].bookName}</h3>
            <button onClick={handlePayment} className="btn">Pay</button>
        </div>
    );
};

export default Payment;