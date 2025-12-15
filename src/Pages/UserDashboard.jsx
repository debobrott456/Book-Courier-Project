import { BaggageClaim, CreditCard, House, Settings, SquareUserRound } from 'lucide-react';
import React from 'react';
import { Link, Outlet } from 'react-router';
import UseRole from '../Hooks/UseRole';

const UserDashboard = () => {
  const {role}=UseRole()
  console.log(role)
   return (
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
          <Link to={'/userDashboard/myWishList'}>
          <button className='flex gap-3'>
            {/* <FaShoppingCart className="size-4" /> */}
            <CreditCard />
            <span className='text-red-400'>My WishList</span>
          </button></Link>
        </li>
     

      </ul>
    </div>
  </div>
</div>

        </div>
    );
};

export default UserDashboard;