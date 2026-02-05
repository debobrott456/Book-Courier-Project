import { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { AuthContext } from '../Contexts/Context';
import Swal from 'sweetalert2';
import { BookPlus, DollarSign, Mail, Image, User, FileText } from 'lucide-react';

const AddBooks = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = use(AuthContext);
    const { register, handleSubmit, setValue } = useForm();
    const [selected, setSelected] = useState("unpublished");

    const handleForm = (data) => {
        const price = Number(data.bookPrice);
        data.bookPrice = price;
        data.likes = 0;
        data.created_At = new Date();
        
        console.log(data);
        
        axiosSecure.post('/books', data)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    title: "Books Added!",
                    text: "Your Book has been added.",
                    icon: "success",
                    confirmButtonColor: "#d34e2d"
                });
            });
    };

  
    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Add <span className="text-[#d34e2d]">Books</span>
                </h1>
                <p className="text-gray-600 mt-2">Add a new book to your collection</p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-sm p-8">
                <form onSubmit={handleSubmit(handleForm)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Book Name */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <BookPlus size={18} className="text-[#d34e2d]" />
                                Book Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter book name"
                                {...register('bookName', { required: true })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d34e2d] focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        {/* Author Name */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <User size={18} className="text-[#d34e2d]" />
                                Author Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter author name"
                                {...register('authorName', { required: true })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d34e2d] focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        {/* Book Image */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <Image size={18} className="text-[#d34e2d]" />
                                Book Image URL
                            </label>
                            <input
                                type="text"
                                placeholder="Enter image URL"
                                {...register('bookImage', { required: true })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d34e2d] focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        {/* Book Price */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <DollarSign size={18} className="text-[#d34e2d]" />
                                Book Price
                            </label>
                            <input
                                type="number"
                                placeholder="Enter price"
                                {...register('bookPrice', { required: true })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d34e2d] focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        {/* Seller Email */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <Mail size={18} className="text-[#d34e2d]" />
                                Seller Email
                            </label>
                            <input
                                type="email"
                                defaultValue={user?.email}
                                {...register('sellerEmail', { required: true })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                                readOnly
                            />
                        </div>

                        {/* Publication Status */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <FileText size={18} className="text-[#d34e2d]" />
                                Publication Status
                            </label>
                            <div className="relative">
                               <select
  {...register("status")}
  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d34e2d]"
>
  <option value="unpublished">Unpublished</option>
  <option value="published">Published</option>
</select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <input type="hidden" {...register("status")} />

                    {/* Submit Button */}
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-8 py-3 bg-[#d34e2d] hover:bg-[#b8401f] text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <BookPlus size={20} />
                            Add Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBooks;
