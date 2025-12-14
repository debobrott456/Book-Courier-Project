import React, { use } from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { AuthContext } from '../Contexts/Context';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {

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
            
        </div>
    );
};

export default PaymentHistory;