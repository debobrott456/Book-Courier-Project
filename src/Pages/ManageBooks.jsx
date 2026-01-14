import React from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';

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
          confirmButtonColor: "#d34e2d",
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
                  confirmButtonColor: "#d34e2d",
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
                  confirmButtonColor: "#d34e2d",
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
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Manage <span className="text-[#d34e2d]">Books</span>
                </h1>
                <p className="text-gray-600 mt-2">Total Books: {books.length}</p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">#</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Book</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Seller</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {books.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        No books found
                                    </td>
                                </tr>
                            ) : (
                                books.map((book, index) => (
                                    <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img 
                                                    src={book.bookImage} 
                                                    alt={book.bookName}
                                                    className="w-12 h-16 object-cover rounded shadow-sm"
                                                />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{book.bookName}</p>
                                                    <p className="text-xs text-gray-500">{book.authorName}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{book.sellerEmail}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">৳{book.bookPrice}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                book.status === 'published' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {book.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {book.status === "unpublished" ? (
                                                    <button 
                                                        onClick={() => handlePublish(book._id)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
                                                        title="Publish"
                                                    >
                                                        <CheckCircle size={16} />
                                                        Publish
                                                    </button>
                                                ) : (
                                                    <button 
                                                        onClick={() => handleRemovePublish(book._id)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
                                                        title="Unpublish"
                                                    >
                                                        <XCircle size={16} />
                                                        Unpublish
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleDelete(book._id)}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageBooks;