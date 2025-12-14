import React, { use } from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Contexts/Context';

const Invoices = () => {
    
           const {user}=use(AuthContext)
        const axiossecure=UseAxiosSecure()
        const {data:payments=[]}=useQuery({
            queryKey:['payments',user?.email],
            queryFn:async()=>{
            const res=await axiossecure.get(`/payments?email=${user.email}`)
            return res.data
            }
        }
    
    )
    console.log(payments)
    return (
        <div>
            <h3 className='text-3xl font-semibold text-amber-600 m-4'>Payment History</h3>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Parcel  Name</th>
        <th>Price</th>
        <th>Transaction Id </th>
        <th>Tracking Id</th>
      </tr>
    </thead>

    <tbody>
      {/* row 1 */}
      {
        payments.map((book,index)=> <tr key={book._id}>
        <th>{index+1}</th>
        <td>{book.parcelName}</td>
       <td>{book.amount}</td>
       <td>{book.transactionId}</td>
       <td>{book.trackingId}</td>
        
      
       
      </tr>)
      }
     
      {/* row 2 */}
   
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Invoices;