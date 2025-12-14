import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import UseRole from '../Hooks/UseRole';
import Swal from 'sweetalert2';
import { IoPersonRemoveOutline } from 'react-icons/io5';
import { FaUserShield, FaUserSlash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';

const LibraryManagement = () => {

const axiosSecure=UseAxiosSecure()
  const {data:users=[],refetch,isLoading}=useQuery({
      queryKey:['users'],
      queryFn:async ()=>{
        const res=await axiosSecure.get('/beLibrarian')
        return res.data
      }
    })
// const role=UseRole()
if(isLoading){
    return    <span className="loading loading-spinner loading-xl text-center"></span>
}
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
        
        axiosSecure.delete(`/libUser/${id}`)
        .then(res=>{console.log(res)
            refetch()
             Swal.fire({
          title: "Removed!",
          text: "User has been removed.",
          icon: "success"
        });
        })
       
      }
    });
        }

           const handleLibrarian = (id) => {
            Swal.fire({
              title: "Make the user as librarian?",
              text: `Change user role as Librarian?`,
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "Yes, make Librarian",
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  const res = await axiosSecure.patch(`/usersrole/${id}`, {
                    role:"librarian",
                  });
                  const res1=await axiosSecure.patch(`/librarianrole/${id}`,{
                    role:"librarian"
                  })
                   console.log(res1)
                  console.log(res.data);
                  Swal.fire("Updated!", "User set to be as Librarian.", "success");
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
           const handleRemoveAdmin = (id) => {
            Swal.fire({
              title: "Change the permission?",
              text: `Change Librarian to a user?`,
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "Yes, make it user",
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  const res = await axiosSecure.patch(`/usersrole/${id}`, {
                    role:"users",
                  });
                  const res1 = await axiosSecure.patch(`/librarianrole/${id}`, {
                    role:"users",
                  });
                  console.log(res1)
                  console.log(res.data);
                  Swal.fire("Updated!", "Librarian permission off.", "success");
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
            <p className='text-3xl font-bold text-center text-orange-500 m-5'>All Librarian Request :{users.length}</p>

            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th> Name</th>
        <th> Email</th>
        <th>role</th>
        <th>Librarian Action</th>
        <th>Others Action</th>
      </tr>
    </thead>

    <tbody>
      {/* row 1 */}
      {
        users.map((user,index)=> <tr key={user._id}>
        <th>{index+1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
      <td>{user.role}</td>
        <td className='flex gap-3 ml-4'>
       <td>{user.role=="users"?<button onClick={()=>handleLibrarian(user._id)}  className='bg-green-500 btn'><FaUserShield /></button>:<button onClick={()=>handleRemoveAdmin(user._id)} className='btn bg-red-400'><FaUserSlash/></button> }</td>
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

export default LibraryManagement;