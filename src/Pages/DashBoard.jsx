import React from 'react';
import UseRole from '../Hooks/UseRole';
import UserDashboard from './UserDashboard';
import DashBoardLayout from './dashBoardLayout';
import AdminDashBoard from './AdminDashBoard';

const DashBoard = () => {
    const {role,roleLoading}=UseRole();
    console.log(role)
     if(roleLoading){
         return  <span className="loading loading-spinner loading-xl text-center"></span>

            }
  if(role.role=='users') return <UserDashboard></UserDashboard>
  else if(role.role=='librarian') return <DashBoardLayout></DashBoardLayout>
  else return <AdminDashBoard></AdminDashBoard>
   
};

export default DashBoard;