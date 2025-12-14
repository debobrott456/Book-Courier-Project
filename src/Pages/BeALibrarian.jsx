import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { AuthContext } from '../Contexts/Context';

const BeALibrarian = () => {
          const { register, handleSubmit} = useForm();
          const {user}=use(AuthContext)
          const axiosSecure=UseAxiosSecure()
        
           
           const handleForm=(data)=>{
              
            console.log(data)
            data.created_At=new Date
           axiosSecure.post('/beLibrarian',data)
           .then(res=>{console.log(res.data)
               Swal.fire({
                   title: "Data Added!",
                   text: "Your request has been sent.",
                   icon: "success"
                 });
           })
         
           }
    return (
        <div>
            <p className='text-3xl font-bold text-green-500 text-center mt-5'>Be A Librarian</p>
            <form onSubmit={handleSubmit(handleForm)} className='w-3/4 mx-auto my-10'>
<div className='flex flex-col gap-1'>
    <label> Your Name</label> <br />

          <input
                type="text"
                name="name"
                placeholder="Your Name"
                defaultValue={user?.displayName}
                 {...register('name')}
                className="input input-bordered w-full"
              /> <br />
              <label> Your Email</label> <br />

              <input
                type="email"
                value={user?.email}
                readOnly
                 {...register('email')}
                className="input input-bordered w-full"
              />  <br />
              <label> Phone Number </label> <br />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                 {...register('phone')}
                className="input input-bordered w-full"
              /> <br />
              <label>Your Address</label> <br />

              <input
                type="text"
                name="address"
                placeholder="Address"
                required
                 {...register('address')}
                className="input input-bordered w-full"
              /> <br />
                      <button className="btn btn-warning mt-5" type="submit">Sent Request</button>

</div>
            </form>
        </div>
    );
};

export default BeALibrarian;