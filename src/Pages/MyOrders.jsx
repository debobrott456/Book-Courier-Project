<<<<<<< HEAD
import React, { use } from 'react';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Contexts/Context';

const MyOrders = () => {
    // const books=useLoaderData()
    // console.log(books)
    const {user}=use(AuthContext)
     const axiosSecure = UseAxiosSecure(); // if you use axiosSecure
 const {data:books=[]}=useQuery({
        queryKey:['books',user?.email],
        queryFn:async ()=>{
            const res=await axiosSecure.get(`/orders?email=${user.email}`);
            console.log(res.data)
            return res.data;
        }
    })
=======
import React from 'react';
import { MdDelete } from 'react-icons/md';
import { Link, useLoaderData } from 'react-router';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';

const MyOrders = () => {
    const books=useLoaderData()
    console.log(books)
     const axiosSecure = UseAxiosSecure(); // if you use axiosSecure
>>>>>>> 5523ff2 (first commit)

const handleCancel = async (id) => {
    try {
        const res = await axiosSecure.patch(`/userOrders/${id}`, {
            status: "cancelled"
        });

        if (res.data.modifiedCount > 0) {
            alert("Order cancelled!");
            window.location.reload(); 
            // or you can update state instead of reload
        }
    } catch (error) {
        console.log(error);
    }
};
    
    
    return (
        <div className='m-7'>
             <div>
            <p className='m-5 text-2xl font-semibold text-green-400'>All my Books :{books.length}</p>

            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
<<<<<<< HEAD
        <th>No</th>
        <th>Book Name</th>
        <th>Book Image</th>
=======
        <th></th>
        <th>Book Name</th>
>>>>>>> 5523ff2 (first commit)
        <th>Price</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {/* row 1 */}
      {
        books.map((book,index)=> <tr key={book._id}>
        <th>{index+1}</th>
        <td>{book.bookName}</td>
<<<<<<< HEAD
        <td><img className='w-8 h-8' src={book.bookImage} /></td>
=======
>>>>>>> 5523ff2 (first commit)
       <td>{book.bookPrice}</td>
        <td className={book.status === "paid" ? "text-green-500" : ""}>{book.status}</td>
      
        <td className='flex gap-3'>
       <button onClick={()=>handleCancel(book._id)} className={book.status==="cancelled"?"hidden":'btn btn-warning btn-sm'}>Cancel</button>
       <Link to={`../payment/${book._id}`}>
       <button  className={book.status==="paid"||book.status==="cancelled"?"hidden":"btn btn-outline btn-sm bg-green-400"}> pay</button>
       </Link>
        </td>
      </tr>)
      }
     
      {/* row 2 */}
   
    </tbody>
  </table>
</div>
        </div>
        </div>
    );
};

export default MyOrders;