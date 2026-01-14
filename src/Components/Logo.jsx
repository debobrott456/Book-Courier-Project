import React from 'react';
import logo from '../assets/logo-book.png'
const Logo = () => {
    return (
        <div className='flex ml-5 items-center'>
            <img src={logo} alt="" style={{width:50}}/>
               
            <span className='btn btn-ghost text-xl '> Book Courier</span>
        </div>
    );
};

export default Logo;