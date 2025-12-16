import { CreditCard } from 'lucide-react';
import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import {  FaBook, FaClipboardList,  FaUser,  FaUsers } from 'react-icons/fa';
import { IoBookOutline } from 'react-icons/io5';
import { Link, Outlet } from 'react-router';
import UseRole from '../Hooks/UseRole';
import { MdOutlineLocalLibrary } from 'react-icons/md';

const AdminDashBoard = () => {
    
const {role}=UseRole();
  
  

  
   
   return (
   <div>
 
  <div className="drawer lg:drawer-open">
    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

    {/* Main Content */}
    <div className="drawer-content flex flex-col lg:pl-64">
      {/* Navbar */}
      <nav className="navbar bg-base-300 sticky top-0 z-30">
        <label
          htmlFor="my-drawer-4"
          className="btn btn-square btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>

   <h1 className="text-3xl font-bold text-orange-400 mx-auto">
          Admin Dashboard
        </h1>
      </nav>

      {/* Page Content */}
      <div className="p-10 bg-gray-100 min-h-screen">
       
        <Outlet />
      </div>
    </div>

    {/* Sidebar */}
    <div className="drawer-side z-40">
      <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

      <aside className="bg-base-200 w-64 lg:w-64 lg:fixed lg:h-full">
        <ul className="menu p-4 gap-1">

          {/* Home */}
          <li>
            <Link to="/" className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z" />
              </svg>
              <span className="">Homepage</span>
            </Link>
          </li>

          {/* Admin Links */}
          {role.role === "admin" && (
            <>
              <li>
                <Link to="/adminDash/users-management" className="flex items-center gap-3">
                  <FaUsers />
                  <span className="">Users Manage</span>
                </Link>
              </li>

              <li>
                <Link to="/adminDash/libmanage" className="flex items-center gap-3">
                  <MdOutlineLocalLibrary />
                  <span className="">Librarian Manage</span>
                </Link>
              </li>

              <li>
                <Link to="/adminDash/booksmanage" className="flex items-center gap-3">
                  <FaBook />
                  <span className="">Books Manage</span>
                </Link>
              </li>

              <li>
                <Link to="/adminDash/myProfile" className="flex items-center gap-3">
                  <FaUser />
                  <span className="">My Profile</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </aside>
    </div>
  </div>
   </div>
       
    );
};

export default AdminDashBoard;