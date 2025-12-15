import React from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { IoPersonRemoveOutline } from 'react-icons/io5';
import { FaUserShield, FaUserSlash } from 'react-icons/fa';
import { MdOutlinePublishedWithChanges, MdOutlineUnpublished } from 'react-icons/md';
import { RiDeleteBinLine } from "react-icons/ri";

const ManageBooks = () => {
     const axiosSecure=UseAxiosSecure();
     
       const {data:books=[],refetch}=useQuery({
        queryKey:['books'],
        queryFn:async ()=>{
            const res=await axiosSecure.get(`/books`);
            console.log(res.data)
            return res.data;
        }
    })
    console.log(books)
        const handleDelete=(id)=>{
          console.log(id);
          Swal.fire({
          title: "Are you sure?",
          text: "This will be parmanently removed!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!"
        }).then((result) => {
          if (result.isConfirmed) {
            
            axiosSecure.delete(`/allBooks/${id}`)
            .then(res=>console.log(res))
            refetch()
            Swal.fire({
              title: "Removed!",
              text: "book has been removed.",
              icon: "success"
            });
          }
        });
            }

             const handlePublish = (id) => {
                Swal.fire({
                  title: "Make book published?",
                  text: `Change book status as published?`,
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonText: "Yes, make published",
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    try {
                      const res = await axiosSecure.patch(`/booksP/${id}`, {
                        status:"published",
                      });
            
                      console.log(res.data);
                      Swal.fire("Updated!", "book set to be as published.", "success");
                      refetch();
                      // Refresh page
                      // window.location.reload();
                    } catch (err) {
                      console.error(err);
                      Swal.fire("Error!", "Failed to update status", "error");
                    }
                  }
                });
              };
               const handleRemovePublish = (id) => {
                Swal.fire({
                  title: "Change the status?",
                  text: `Change published to a unpublished?`,
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonText: "Yes, make it unpublished",
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    try {
                      const res = await axiosSecure.patch(`/booksP/${id}`, {
                        status:"unpublished",
                      });
            
                      console.log(res.data);
                      Swal.fire("Updated!", "Books status updated.", "success");
                      refetch()
                      // Refresh page
                      // window.location.reload();
                    } catch (err) {
                      console.error(err);
                      Swal.fire("Error!", "Failed to update status", "error");
                    }
                  }
                });
              };
    return (
        <div>
            <div>
                       <p className='text-2xl font-semibold text-orange-400 m-5'>All  books :{books.length}</p>
           
                       <div className="overflow-x-auto">
             <table className="table table-zebra">
               {/* head */}
               <thead>
                 <tr>
                   <th></th>
                   <th> Name</th>
                   <th> Book Image</th>
                   <th>Seller Email</th>
                   <th>Price</th>
                   <th>Status</th>
                   <th>Action</th>
                   <th>Others Action</th>
                 </tr>
               </thead>
           
               <tbody>
                 {/* row 1 */}
                 {
                   books.map((book,index)=> <tr key={book._id}>
                   <th>{index+1}</th>
                   <td>{book.bookName}</td>
                 <td className='rounded-xl'><img src={book.bookImage} style={{width:40,height:50}} /></td> 

                   <td>{book.sellerEmail}</td>
                 <td>{book.bookPrice}</td>
                 <td>{book.status}</td>
                   <td className='flex gap-3 ml-4'>
                  <td>{book.status=="unpublished"?<button onClick={()=>handlePublish(book._id)}  className='bg-green-500 btn'><MdOutlinePublishedWithChanges /></button>
                  :<button onClick={()=>handleRemovePublish(book._id)} className='btn bg-red-400'><MdOutlineUnpublished /></button> }</td>
                   </td>
                   <td><button className='btn bg-red-400' onClick={()=>handleDelete(book._id)}><RiDeleteBinLine /></button></td>
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

export default ManageBooks;