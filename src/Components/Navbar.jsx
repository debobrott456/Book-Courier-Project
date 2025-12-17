import React, { use, useEffect, useState} from 'react';
import { Link, Links, NavLink } from 'react-router';
import { AuthContext } from '../Contexts/Context';
import { MdLightMode, MdNightlight } from 'react-icons/md';
import Logo from './Logo';
<<<<<<< HEAD
=======
// core version + navigation, pagination modules:


// init Swiper:
>>>>>>> 5523ff2 (first commit)


const Navbar = () => {
const {user,signOutUser}=use(AuthContext);
<<<<<<< HEAD
console.log("Navbar user:", user);
console.log("photoURL:", user?.photoURL);

=======
console.log(user)
>>>>>>> 5523ff2 (first commit)
 
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

<<<<<<< HEAD
{/*hamle dog*/ }
=======

>>>>>>> 5523ff2 (first commit)
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

const handleSignOut=()=>{
signOutUser()
.then(result=>console.log(result.user))
.catch(error=>console.log(error))
}
<<<<<<< HEAD
    const links=<>
    <li><NavLink
=======
    const links=<><li><NavLink
>>>>>>> 5523ff2 (first commit)
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-orange-600"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        Home
      </NavLink></li>
   
      <li><NavLink
        to="/allBooks"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-orange-600"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        All Books
      </NavLink></li>

<<<<<<< HEAD
      {user && <>
       <li><NavLink
        to="/beALibrarian"
=======
       <li><NavLink
        to="/myBooks"
>>>>>>> 5523ff2 (first commit)
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-orange-600"
            : "text-gray-600 hover:text-blue-500"
        }
      >
<<<<<<< HEAD
        Be A Librarian
      </NavLink></li>
      </>}
      {user && <>
       <li><NavLink
        to="/dashBoard"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-orange-600"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        DashBoard
      </NavLink></li>
      </>}
   

    {user && <>
    
=======
        My Books
      </NavLink></li>
    
    <li><NavLink
        to="/addBooks"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-orange-600"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        Add Books
      </NavLink></li>

    {user && <><li><NavLink
        to="/invoices"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-orange-600"
            : "text-gray-600 hover:text-blue-500"
        }
      >
        Invoices
      </NavLink></li>
>>>>>>> 5523ff2 (first commit)
  <button
        onClick={toggleTheme}
        className="btn btn-ghost text-xl"
      >
        {theme === "light" ? (
          <MdNightlight />   // show moon in light mode
        ) : (
          <MdLightMode />    // show sun in dark mode
        )}
      </button>
    </>}
   </>
    return (
<<<<<<< HEAD
      
          <div>
            <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
       <div className='mr-2'> <Logo></Logo></div>

    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
             {links}

      </ul>
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
            {links}

    </ul>
  </div>
   <div className="navbar-end">{user ? (
=======
       

        <nav className="navbar bg-base-100 shadow-sm ">
   <div className="navbar-start">
    <Logo></Logo>
  </div>

  <div className="navbar-center ">
    <ul className="menu menu-horizontal px-1 flex flex-col md:flex-row">
      {links}
    </ul>
  </div>
  <div className="navbar-end">{user ? (
>>>>>>> 5523ff2 (first commit)
  <div className="flex items-center gap-1 md:gap-2">
    {user?.photoURL && (
      <div  className="relative inline-block"
><img src={user.photoURL}
        alt="User"
        className="w-10 h-10 rounded-full border border-gray-300"
      />
       
   </div>
    )}
    <a onClick={handleSignOut} className="btn btn-warning">Sign Out</a>
  </div>
) : (
  <Link to="/login">
    <button className="btn btn-warning">Login</button>
  </Link>
)}
    
  </div>
<<<<<<< HEAD
</div>
          </div>
     
=======
</nav>
>>>>>>> 5523ff2 (first commit)
    );
};

export default Navbar;