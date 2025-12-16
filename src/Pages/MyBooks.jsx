import React, { use } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoSearchSharp } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../Contexts/Context';
import {
  useQuery,
 
} from '@tanstack/react-query'
const MyBooks = () => {
   
    const axiosSecure=UseAxiosSecure();
    const {user}=use(AuthContext)

    console.log(user)
    // console.log(books)

     const {data:books=[],refetch}=useQuery({
        queryKey:['books',user?.email],
        queryFn:async ()=>{
            const res=await axiosSecure.get(`/myBooks?email=${user.email}`);
            console.log(res.data)
            return res.data;
        }
    })


    const handleDelete=(id)=>{
  console.log(id);
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    
    axiosSecure.delete(`/allBooks/${id}`)
    .then(res=>{console.log(res)
       refetch()})
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});
    }

    return (
        <div>
             <div>
            <p className='text-3xl font-semibold text-orange-400'>All my Books :{books.length}</p>

            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th className='hidden lg:inline'>Name</th>
        <th>BookImage</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {/* row 1 */}
      {
        books.map((book,index)=> <tr key={book._id}>
        <th>{index+1}</th>
        <td className='hidden lg:inline'>{book.bookName}</td>
       <td className='rounded-xl'><img src={book.bookImage} style={{width:40,height:50}} /></td> 
        <td>{book.status}</td>
      
        <td className='flex gap-3'>
       <button onClick={()=>handleDelete(book._id)}><MdDelete /></button><Link to={`/dashboard/update/${book._id}`}><button ><FaRegEdit /></button></Link>
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

export default MyBooks;