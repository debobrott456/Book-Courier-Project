<<<<<<< HEAD
import React, { use } from 'react';

=======
import React from 'react';
import { useLoaderData } from 'react-router';
>>>>>>> 5523ff2 (first commit)
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { FaUserShield, FaUserSlash } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoPersonRemoveOutline } from 'react-icons/io5';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UseRole from '../Hooks/UseRole';
<<<<<<< HEAD
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Contexts/Context';

const UsersManagement = () => {
  const {user}=use(AuthContext)
    const axiosSecure=UseAxiosSecure()
    // const users=useLoaderData();

    

    const {data:users=[],refetch,isLoading}=useQuery({
      queryKey:['users'],
      queryFn:async ()=>{
        const res=await axiosSecure.get('/users')
        return res.data
      }
    })
const role=UseRole()

console.log(role)
if(!user||isLoading){
   return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
}
=======
// import { useQuery } from '@tanstack/react-query';

const UsersManagement = () => {
    const axiosSecure=UseAxiosSecure()
    const users=useLoaderData();

    console.log(users)

    // const {data:users=[]}=useQuery({
    //  queryKey:['users'],
    //   queryFn:async ()=>{
    //     const res=await axiosSecure.get()
    //   }
    // }) 
const role=UseRole()

console.log(role)

>>>>>>> 5523ff2 (first commit)

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
        
        axiosSecure.delete(`/users/${id}`)
<<<<<<< HEAD
        .then(res=>{console.log(res)
         refetch()}
      )
=======
        .then(res=>console.log(res))
>>>>>>> 5523ff2 (first commit)
        Swal.fire({
          title: "Removed!",
          text: "User has been removed.",
          icon: "success"
        });
      }
    });
        }

           const handleAdmin = (id) => {
            Swal.fire({
              title: "Make user admin?",
              text: `Change user role as admin?`,
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "Yes, make admin",
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  const res = await axiosSecure.patch(`/usersrole/${id}`, {
                    role:"admin",
                  });
        
                  console.log(res.data);
                  Swal.fire("Updated!", "User set to be as admin.", "success");
<<<<<<< HEAD
                  refetch();
                  // Refresh page
                  // window.location.reload();
=======
        
                  // Refresh page
                  window.location.reload();
>>>>>>> 5523ff2 (first commit)
                } catch (err) {
                  console.error(err);
                  Swal.fire("Error!", "Failed to update status", "error");
                }
              }
            });
          };
           const handleRemoveAdmin = (id) => {
            Swal.fire({
              title: "Change the permission?",
              text: `Change admin to a user?`,
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "Yes, make it user",
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  const res = await axiosSecure.patch(`/usersrole/${id}`, {
                    role:"users",
                  });
        
                  console.log(res.data);
                  Swal.fire("Updated!", "Admission permission off.", "success");
<<<<<<< HEAD
                  refetch()
                  // Refresh page
                  // window.location.reload();
=======
        
                  // Refresh page
                  window.location.reload();
>>>>>>> 5523ff2 (first commit)
                } catch (err) {
                  console.error(err);
                  Swal.fire("Error!", "Failed to update status", "error");
                }
              }
            });
          };


//         const handleRemoveAdmin = async (id) => {
//     try {
//         const res = await axiosSecure.patch(`/usersrole/${id}`, {
//             role: "users"
//         });

//         if (res.data.modifiedCount > 0) {
//         toast.success("admin permission off!")
//             window.location.reload(); 
//             // or you can update state instead of reload
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };
       return (
        <div>
             <div>
<<<<<<< HEAD
            <p className='text-2xl text-orange-400 font-semibold m-5'>All my users{users.length}</p>
=======
            <p>All my users{users.length}</p>
>>>>>>> 5523ff2 (first commit)

            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
<<<<<<< HEAD
        <th>No</th>
=======
        <th></th>
>>>>>>> 5523ff2 (first commit)
        <th> Name</th>
        <th> Email</th>
        <th>role</th>
        <th>Admin Action</th>
        <th>Others Action</th>
      </tr>
    </thead>

    <tbody>
      {/* row 1 */}
      {
        users.map((user,index)=> <tr key={user._id}>
        <th>{index+1}</th>
        <td>{user.displayName}</td>
        <td>{user.email}</td>
      <td>{user.role}</td>
        <td className='flex gap-3 ml-4'>
<<<<<<< HEAD
       <td>{user.role=="users"?<button onClick={()=>handleAdmin(user.email)}  className='bg-green-500 btn'><FaUserShield /></button>:<button onClick={()=>handleRemoveAdmin(user.email)} className='btn bg-red-400'><FaUserSlash/></button> }</td>
=======
       <td>{user.role=="users"?<button onClick={()=>handleAdmin(user._id)}  className='bg-green-500 btn'><FaUserShield /></button>:<button onClick={()=>handleRemoveAdmin(user._id)} className='btn bg-red-400'><FaUserSlash/></button> }</td>
>>>>>>> 5523ff2 (first commit)
        </td>
        <td><button className='btn bg-red-400' onClick={()=>handleDelete(user._id)}><IoPersonRemoveOutline /></button></td>
      </tr>)
      }
     
      {/* row 2 */}
   
    </tbody>
  </table>
</div>
        </div>
        <ToastContainer/>
        </div>
    );
};

export default UsersManagement;