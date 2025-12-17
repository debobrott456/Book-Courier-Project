import { BaggageClaim, CreditCard, House, Settings, SquareUserRound } from 'lucide-react';
import React from 'react';
import { Link, Outlet } from 'react-router';
import UseRole from '../Hooks/UseRole';

const UserDashboard = () => {
  const {role}=UseRole()
  console.log(role)
   return (
<<<<<<< HEAD
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
                User Dashboard
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
      
              
               <li>
=======
        <div className='w-full'>
           <div className="drawer lg:drawer-open">
  {/* We keep the checkbox only because DaisyUI requires it, but it stays permanently checked by default */}
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked readOnly />

  <div className="drawer-content flex flex-col">
    {/* Navbar */}
    <nav className="navbar w-full bg-red-300">
      <div className="px-4 text-3xl font-bold">User Dashboard</div>
    </nav>

   

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
          <Link to={'/'}><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-3" data-tip="Homepage">
            {/* Home icon */}
<House />            <span className="is-drawer-close:hidden">Homepage</span>
          </button></Link>
        </li>

        {/* List item */}
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-3 " data-tip="Settings">
            {/* Settings icon */}
<Settings />            <span className="is-drawer-close:hidden">Settings</span>
          </button>
        </li>
      
        {/* My parcel */}
        <li>
>>>>>>> 5523ff2 (first commit)
          <Link to={'/userDashboard/myOrders'}><button className='flex gap-2'>
            {/* <IoBookOutline  className="size-4" /> */}
            <BaggageClaim />
            <span className='text-red-400'>My Orders</span>

          </button></Link>
        </li>
        <li>
          <Link to={'/userDashboard/myProfile'}>
          <button className='flex gap-3'>
            {/* <FaBook className="size-4" /> */}
            <SquareUserRound />
            <span className='text-red-400'>My Profile</span>
          </button></Link>
        </li>
        <li>
          <Link to={'/userDashboard/invoices'}>
          <button className='flex gap-3'>
            {/* <FaShoppingCart className="size-4" /> */}
            <CreditCard />
            <span className='text-red-400'>Invoices</span>
          </button></Link>
<<<<<<< HEAD
          <Link to={'/userDashboard/myWishList'}>
          <button className='flex gap-3'>
            {/* <FaShoppingCart className="size-4" /> */}
            <CreditCard />
            <span className='text-red-400'>My WishList</span>
          </button></Link>
        </li>
     
              </ul>
            </aside>
          </div>
        </div>


        
    </div>
       
=======
        </li>
       {role.role==="admin" && <>
        <li>
          <Link to={'/userDashboard/users-management'}>
          <button className='flex gap-3'>
            {/* <FaShoppingCart className="size-4" /> */}
            <CreditCard />
            <span>Users Manage</span>
          </button></Link>
        </li></>}

      </ul>
    </div>
  </div>
</div>

        </div>
>>>>>>> 5523ff2 (first commit)
    );
};

export default UserDashboard;