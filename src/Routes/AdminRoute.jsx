import React, { use } from 'react';
import { AuthContext } from '../Contexts/Context';
import UseRole from '../Hooks/UseRole';
import { FaLock } from 'react-icons/fa';

const AdminRoute = ({children}) => {

    // console.log(location)
   
    const {loading}=use(AuthContext);
    const {role,roleLoading}=UseRole()
    console.log(role)
<<<<<<< HEAD
 if(loading||roleLoading){
        return <span className="loading loading-spinner loading-xl text-center"></span>
    }

=======
>>>>>>> 5523ff2 (first commit)
    if(role.role!=='admin'){
        return   <div className="flex flex-col items-center justify-center h-screen text-center p-5">
      <FaLock className="text-red-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="text-gray-600 mt-2">
        You do not have permission to view this page. <br />
        Only administrators can access this section.
      </p>

      <a href="/" className="btn btn-primary mt-5">
        Go Back Home
      </a>
    </div>
    }
<<<<<<< HEAD
   
=======
    if(loading||roleLoading){
        return <span className="loading loading-spinner loading-xl text-center"></span>
    }
>>>>>>> 5523ff2 (first commit)
   
    return  children;
};

export default AdminRoute;