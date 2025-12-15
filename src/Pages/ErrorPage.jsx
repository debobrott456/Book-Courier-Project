
import React from 'react';
import error from '../assets/error-404.png'
import { Link } from 'react-router';

const ErrorPage = () => {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-6xl font-bold mb-4">Oops!</h1>
      <p className="text-2xl mb-2">Something went wrong.</p>
      <p className="text-lg mb-6">
        <img src={error} alt="" />
       
      </p>
      <Link
        to="/"
        className="bg-white text-blue-600 px-5 py-2 rounded-xl font-semibold hover:bg-gray-200 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;


