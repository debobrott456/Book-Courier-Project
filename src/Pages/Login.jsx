import React, {  useContext, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/Context';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';


const Login = () => {
  
 const navigate=useNavigate()
 const location=useLocation()
 const emailref=useRef()
const axiosSecure=UseAxiosSecure()

const {signInUser,signInWithGoogle}=useContext(AuthContext)
   

const handleLogin=(event)=>{
    event.preventDefault();
    const email =event.target.email.value
    const password=event.target.password.value
    
     signInUser(email, password)
    .then(result => {
      console.log(result.user);

      event.target.reset();
      toast.success('Log in successful!');

      // Navigate after short delay
      setTimeout(() => {
        navigate(location.state?.from?.pathname || '/');
      }, 1200);
    })
    .catch(error => {
      console.log(error);
      toast.error(error.message);
    });
   
}
const handleGoogleLogin = () => {
  signInWithGoogle()
    .then(result => {
      const user = result.user;
      console.log(user);

      toast.success("Login successful!");

      const userInfo = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      };

      return axiosSecure.post('/users', userInfo);
    })
    .then(() => {
      setTimeout(() => {
        navigate(location.state?.from?.pathname || '/');
      }, 1200);
    })
    .catch(error => {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log("Popup closed by user — ignoring");
        return;
      }

      console.error("Auth error:", error);
      toast.error("Authentication failed");
    });
};



return (
  <div className="max-w-[500px] mx-auto m-10">

    <form onSubmit={handleLogin}>

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          ref={emailref}
          placeholder="Email"
          className="input"
          required
        />

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          required
        />

        
        <button type="submit" className="btn btn-neutral mt-4 w-full">
          Login
        </button>

        
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn bg-white text-black border-[#e5e5e5] w-full mt-2 flex items-center gap-2"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
            </g>
          </svg>
          Login with Google
        </button>

        <p className="mt-2">
          Dont have an account?{" "}
          <Link className="text-blue-400 underline" to="/register">
            Register
          </Link>
        </p>
      </fieldset>
    </form>

    <ToastContainer />
  </div>
);

};

export default Login;