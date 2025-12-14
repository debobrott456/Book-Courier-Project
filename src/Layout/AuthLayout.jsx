import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.jpg'
import Logo from '../Components/Logo';
const AuthLayout = () => {
    return (
        <div>
            <Logo></Logo>
            <div className='max-w-6xl mx-auto flex gap-10'>
                <div className='flex-1'><Outlet ></Outlet></div>
                <img className='flex-1 rounded-xl' src={authImg} alt="" style={{width:400, height:400}}/>
            </div>
        </div>
    );
};

export default AuthLayout;