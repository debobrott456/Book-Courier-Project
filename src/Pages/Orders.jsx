import React, { use } from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { MdDelete, MdOutlineCancel } from 'react-icons/md';
import { AuthContext } from '../Contexts/Context';
import { useQuery } from '@tanstack/react-query';



const Orders = () => {
    const axiosSecure=UseAxiosSecure()
    
const {user}=use(AuthContext)
const email=user.email

    const {data:orders=[],refetch}=useQuery({
        queryKey:['books'],
        queryFn:async ()=>{
            const res=await axiosSecure.get(`/librarian/${email}`);
            console.log(res.data)
            return res.data;
        }
    })
 // variable to store response


    console.log(orders)
    
   const handleStatusChange = (id, newStatus) => {
    Swal.fire({
      title: "Update Status?",
      text: `Change order status to "${newStatus}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/librarian/${id}`, {
            lstatus: newStatus,
          });
           refetch()
          console.log(res.data);
          Swal.fire("Updated!", "Order status updated.", "success");

          // Refresh page
            // setTimeout(() => {window.location.reload();},1800);
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Failed to update status", "error");
        }
      }
    });
  };

        const handleDelete=(id)=>{
      console.log(id);
      Swal.fire({
      title: "Are you sure?",
      text: "Order will be cancelled!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel!"
    }).then((result) => {
      if (result.isConfirmed) {
    
        axiosSecure.delete(`/librarian/${id}`)
        .then(res=>{console.log(res)
            refetch()
        })
        Swal.fire({
          title: "Cancelled!",
          text: "Order has been cancelled.",
          icon: "success"
        });
        
      }
    });
        }
    return (
     
      
              <div>
             <div>
            <p className='text-center text-3xl font-semibold text-red-400 m-5'>All my Orders :{orders.length}</p>

            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Customer Name</th>
        <th>Customer Email</th>
        <th>Customer address</th>
        <th>Book Name</th>
        <th>Book Price</th>
        <th>Status</th>
        <th>Action</th>

      </tr>
    </thead>

    <tbody>
      {/* row 1 */}
      {
        orders.map((order,index)=> <tr key={order._id}>
        <th>{index+1}</th>
        <td>{order.name}</td>
      <td>{order.email}</td>
      <td>{order.address}</td>
      <td>{order.bookName}</td>
      <td>{order.bookPrice}</td>
           <td>
                  <select
                    className="select select-bordered select-xs"
                    value={order.lstatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="pending">pending</option>
                    <option value="shipped">shipped</option>
                    <option value="delivered">delivered</option>
                  </select>
                </td>
        <td className='flex gap-3'>
       <button onClick={()=>handleDelete(order._id)}><MdOutlineCancel /></button><button ></button>
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

export default Orders;