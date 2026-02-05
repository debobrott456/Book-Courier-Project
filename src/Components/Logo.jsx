import React from 'react';
import { Link } from 'react-router';
import logo from '../assets/logonavbar.jpg'

const Logo = () => {
    return (
        <Link to="/" className='flex ml-5 items-center gap-2 cursor-pointer'>
            <img src={logo} alt="Book Courier Logo" className="w-12 h-12 rounded-full object-cover border-2 border-[#d34e2d]"/>
            <span className='btn btn-ghost text-xl'>Book Courier</span>
        </Link>
    );
};

export default Logo;