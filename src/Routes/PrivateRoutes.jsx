import React, { use } from 'react';
import { AuthContext } from '../Contexts/Context';
import { Navigate, useLocation } from 'react-router';


const PrivateRoutes = ({children}) => {
     const location=useLocation()
    // console.log(location)
   
    const {user,loading}=use(AuthContext);
    
    if(loading){
        return <span className="loading loading-spinner loading-xl text-center"></span>
    }
    if (user){
        return children;
    }

    return (
        <Navigate state={location?.pathname} to="/login"></Navigate>
    );
};

export default PrivateRoutes;