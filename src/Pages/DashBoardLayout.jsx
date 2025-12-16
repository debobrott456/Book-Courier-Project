import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaBook,  FaShoppingCart, FaTruck, FaUser, FaUsers } from 'react-icons/fa';
import { IoBookOutline } from 'react-icons/io5';
import { Link, Outlet } from 'react-router';

const DashBoardLayout = () => {

   return (
   <div>
      
    <div>
       <div className="drawer lg:drawer-open">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      
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
                Librarian Dashboard
              </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      </div>
            </nav>
      
           
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
      
              
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
            {/* Settings icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
            <span className="is-drawer-close:hidden">Settings</span>
          </button>
        </li>
      
        {/* My parcel */}
        <li>
          <Link to={'/dashboard/addBooks'}><button>
            <IoBookOutline  className="size-4" />
            <span>Add Books</span>
          </button></Link>
        </li>
        <li>
          <Link to={'/dashboard/myBooks'}>
          <button>
            <FaBook className="size-4" />
            <span>My Books</span>
          </button></Link>
        </li>
        <li>
          <Link to={'/dashboard/orders'}>
          <button>
            <FaShoppingCart className="size-4" />
            <span>Orders</span>
          </button></Link>
        </li>
        <li>
          <Link to={'/dashboard/myProfile'}>
          <button>
            <FaUser className="size-4" />
            <span>My Profile</span>
          </button></Link>
        </li>
     
              </ul>
            </aside>
          </div>
        </div>
    </div>
    
   </div>
       
    );
};

export default DashBoardLayout;