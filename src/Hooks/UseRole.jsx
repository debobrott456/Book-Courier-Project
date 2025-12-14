import React, { use } from 'react';
import { AuthContext } from '../Contexts/Context';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseRole = () => {
          const {user}=use(AuthContext)
        const axiossecure=UseAxiosSecure()
        const {isLoading:roleLoading,data:role='users'}=useQuery({
            queryKey:['user-role',user?.email],
            queryFn:async()=>{
            const res=await axiossecure.get(`/users/${user.email}/role`)
            return res.data
            }
        })
        
    return  {roleLoading,role};
};

export default UseRole;