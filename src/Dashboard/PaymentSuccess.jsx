import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
const [searchParams] = useSearchParams();
const [paymentInfo,setPaymentInfo]=useState({})
 const sessionId =searchParams.get('session_id')
 const axiossecure=UseAxiosSecure()
 console.log(sessionId)
 
 useEffect(()=>{
if(sessionId){
    axiossecure.patch(`/payment-success?session_id=${sessionId}`)
    .then(res=>{
        console.log(res.data)
     setPaymentInfo({trackingId:res.data.trackingId,
      transactionId:res.data.transactionId 
    }
     )
   
    })
}
 },[sessionId])
   console.log(paymentInfo)
    return (
        <div>
            
          
        
        <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[400px] text-center">

        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>

        <p className="text-gray-600 mb-6">
          Thank you! Your payment has been completed successfully.
        </p>

        <div className="border-t pt-4 text-left mb-6">
          <p className="font-semibold">Transaction Status: <span className="text-green-600">Paid</span></p>
          <p className="font-semibold">Order Date: {new Date().toLocaleDateString()}</p>
            <p>Transaction Id :{paymentInfo.transactionId}</p>
            <p>tracking Id :{paymentInfo.trackingId}</p>
        </div>

        <Link to="/userDashboard/myOrders">
          <button className="btn btn-success w-full">Go to My Orders</button>
        </Link>

      </div>
    </div>
        </div>
    );
};

export default PaymentSuccess;