import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';

const Update = () => {

    const { register, handleSubmit, setValue } = useForm();
  const [selected, setSelected] = useState("");
const axiosSecure=UseAxiosSecure()
 const {id}=useParams();

  const handleSelect = (value) => {
    setSelected(value);
    setValue("status", value); // register submenu
  };

  const handleForm=(data)=>{
    const price=parseInt(data.bookPrice)
    console.log(data)
    axiosSecure.patch(`/myBooks/${id}`, {
    bookName: data.bookName,
    bookImage:data.bookImage,
    bookPrice: price,
    status:data.status
    
    // any field you want to update
})
.then(res => {
    console.log(res.data);

    if (res.data.modifiedCount > 0) {
        Swal.fire({
            title: "Updated!",
            text: "Book information updated successfully",
            icon: "success"
        });
        
           // refresh UI
    }
})
.catch(error => {
    console.error(error);
});
  }

  return (
        <div>
            <form onSubmit={handleSubmit(handleForm)} action="">
               <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-5'>
             
              <div>
                  <label>Book Name</label> <br />
              <input type="text" placeholder="Book Name" {...register('bookName')} className="input w-full" /> <br />
        
                 <label > Book Image</label> <br />
                <input type="text" placeholder="Type here" {...register('bookImage')} className="input w-full"  />
              </div>
<div>
                 <label> Book Price</label> <br />
                <input type="text" placeholder="Enter Price"  {...register('bookPrice')} className="input w-full"  /> <br />
                
                
                  
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

      <button className="btn btn-warning mt-5" type="submit">Update Books</button></div>
            </form>
        </div>
    );
};

export default Update;