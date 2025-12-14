import axios from 'axios';
import React, { use, useEffect } from 'react';
import { AuthContext } from '../Contexts/Context';
import { useNavigate } from 'react-router';

const axiosSecure=axios.create({
    baseURL:'http://localhost:5000'
}
)

const UseAxiosSecure = () => {
  const navigate=useNavigate()
    const {user,signOutUser}=use(AuthContext)
    useEffect(() => {
  const interceptor = axiosSecure.interceptors.request.use((config) => {
    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  });
const resInterceptor=axiosSecure.interceptors.response.use((response)=>{
return response;
},(error)=>{console.log(error)
  const statuscode =error.statuscode ;
  if(statuscode===401||statuscode===403){
    signOutUser()
    .then(()=>{
      navigate('/login')
    })

    }
     return Promise.reject(error)
  })
   

  // cleanup → remove old interceptor
  return () => {
    axios.interceptors.request.eject(interceptor);
    axios.interceptors.response.eject(resInterceptor);
  };
}, [user]);
    return (
        axiosSecure
    );
};

export default UseAxiosSecure;