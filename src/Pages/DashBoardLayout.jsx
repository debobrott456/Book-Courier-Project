import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaBook, FaClipboardList, FaCreditCard, FaShoppingCart, FaTruck, FaUsers } from 'react-icons/fa';
import { IoBookOutline } from 'react-icons/io5';
import { Link, Outlet } from 'react-router';

const DashBoardLayout = () => {
    
  const totalUsers = 45;
  
  

  
   
   return (
        <div className='w-full'>
           <div className="drawer lg:drawer-open">
  {/* We keep the checkbox only because DaisyUI requires it, but it stays permanently checked by default */}
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked readOnly />

  <div className="drawer-content flex flex-col">
    {/* Navbar */}
    <nav className="navbar w-full bg-base-300">
      <div className="px-4">Navbar Title</div>
    </nav>

    {/* Page content */}
   <div className="p-10 bg-gray-100 ">
      <h1 className="text-3xl font-bold mb-8">Librarian Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Books */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4">
          <FaBook className="text-4xl text-blue-500" />
          <div>
            <p className="text-gray-500">Total Books</p>
            <p className="text-2xl font-bold">--</p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4">
          <FaClipboardList className="text-4xl text-green-500" />
          <div>
            <p className="text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold">--</p>
          </div>
        </div>

        {/* Pending Deliveries */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4">
          <FaTruck className="text-4xl text-yellow-500" />
          <div>
            <p className="text-gray-500">Pending Deliveries</p>
            <p className="text-2xl font-bold">--</p>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4">
          <FaUsers className="text-4xl text-purple-500" />
          <div>
            <p className="text-gray-500">Total Users</p>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>
        </div>
      </div>

      
      
    </div>

    <Outlet />
  </div>

  {/* Permanent Sidebar */}
  <div className="drawer-side">
    <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
        {/* List item */}
        <li>
          <Link to={'/'}><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            {/* Home icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span className="is-drawer-close:hidden">Homepage</span>
          </button></Link>
        </li>

        {/* List item */}
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

      </ul>
    </div>
  </div>
</div>

        </div>
    );
};

export default DashBoardLayout;