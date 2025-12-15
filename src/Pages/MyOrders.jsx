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
        <th></th>
        <th>Book Name</th>
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