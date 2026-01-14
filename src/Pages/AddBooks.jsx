import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { AuthContext } from '../Contexts/Context';
import Swal from 'sweetalert2';

const AddBooks = () => {
      
    const axiosSecure=UseAxiosSecure()
    const {user}=use(AuthContext)
    
    const handleForm=(data)=>{
  const price = Number(data.bookPrice);
          data.bookPrice=price
          data.likes=0
     console.log(data)
     data.created_At=new Date
    axiosSecure.post('/books',data)
    .then(res=>{console.log(res.data)
        Swal.fire({
            title: "Books Added!",
            text: "Your Book has been added.",
            icon: "success"
          });
    })
  
    }

      const { register, handleSubmit, setValue } = useForm();
  const [selected, setSelected] = useState("");

 

  const handleSelect = (value) => {
    setSelected(value);
    setValue("status", value); // register submenu
  };

    return (
        <div>
            <form onSubmit={handleSubmit(handleForm)} action="">
               <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-5'>
             
              <div>
                  <label>Book Name</label> <br />
              <input type="text" placeholder="Book Name" {...register('bookName')} className="input w-full" /> <br />
            
                <label>Author Name</label> <br />
              <input type="text" placeholder="Author Name" {...register('authorName')} className="input w-full" /> <br />
            
            
                 <label > Book Image</label> <br />
                <input type="text" placeholder="Type here" {...register('bookImage')} className="input w-full"  />
              </div>
<div>
                 <label> Book Price</label> <br />
                <input type="number" placeholder="Enter Price"  {...register('bookPrice')} className="input w-full"  /> <br />
                 <label> Seller Email</label> <br />
                <input type="email" placeholder="Enter email" defaultValue={user.email} {...register('sellerEmail')} className="input w-full"  /> <br />

                
                  
         <div className="navbar-center hidden lg:flex ">
            <label>Type of published</label>
   <ul className="menu menu-horizontal px-1">
      <li>
        <details>
              <summary>{selected || "unpublished"}</summary>
              <ul className="p-2 bg-base-100 w-40 z-10">
                <li>
                  <a onClick={() => handleSelect("published")}>
                    published
                  </a>
                </li>
                <li>
                  <a onClick={() => handleSelect("unpublished")}>
                    unpublished
                  </a>
                </li>
              </ul>
            </details>
      </li>
    </ul>
  </div>

               </div>
                <input type="hidden" {...register("status")} />

      <button className="btn btn-warning mt-5" type="submit">Add Books</button></div>
            </form>
        </div>
    );
};

export default AddBooks;