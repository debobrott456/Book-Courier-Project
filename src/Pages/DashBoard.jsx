import React from 'react';
import UseRole from '../Hooks/UseRole';
import UserDashboard from './UserDashboard';
import DashBoardLayout from './dashBoardLayout';

const DashBoard = () => {
    const {role,roleLoading}=UseRole();
    console.log(role)
     if(roleLoading){
         return  <span className="loading loading-spinner loading-xl text-center"></span>

            }
  if(role.role=='users') return <UserDashboard></UserDashboard>
  if(role.role=='librarian') return <DashBoardLayout></DashBoardLayout>
   
};

export default DashBoard;