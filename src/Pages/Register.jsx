// import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { use, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, Navigate, useNavigate } from 'react-router';

import { AuthContext } from '../Contexts/Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';




const Register = () => {
const axiosSecure=UseAxiosSecure();
   const {createUser,signInWithGoogle}=use(AuthContext);
   
    

const [error, setError]=useState(null);
const [password, setPassword] = useState("");
 const navigate=useNavigate()
const [showpass, setShowpass]=useState(false)

let charregex=/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/


const handlePasswordChange = (e) => {
  const value = e.target.value;
  setPassword(value);

   

  if (!charregex.test(value)) {
    setError("Password must have at least 1 uppercase, 1 lowercase, and be 6+ characters.");
  } else {
    setError(""); // clear error when valid
  }
};

const handleRegister=(event)=>{
 event.preventDefault();
 const email=event.target.email.value;
 const password=event.target.password.value
 const displayName=event.target.name.value
 const photoURL=event.target.photoURL.value

  if(!charregex.test(password)){
    setError('password must consist one uppercase lowercase and must at least 6 character ')
    toast.error(error)
    return ;
}
 createUser(email,password)
 .then(result=>{
  console.log(result.user)
  const userInfo={
    email:email,
    displayName:displayName,
    photoURL:photoURL
  }
axiosSecure.post('/users',userInfo)
.then(res=>console.log("user data has been stored",res.data))
toast.success(' Account created successfully!');
 setTimeout(() => {
        navigate( '/');
      }, 1200);
}
)
 .catch(error=>{console.log(error)
    toast.error(error.message);

 })




}
const handleGoogleLogin=()=>{
signInWithGoogle() 
.then(result=>{console.log(result.user)
    const userInfo={
    email:result.user.email,
    displayName:result.user.displayName,
    photoURL:result.user.photoURL
  }
axiosSecure.post('/users',userInfo)
.then(res=>console.log("user data has been stored",res.data))
   
})
.catch(error=>console.log(error))
}
const handlebutton=(e)=>{
    e.preventDefault();
setShowpass(!showpass);

}

    return (
        <div className="max-w-[500px] mx-auto m-10"><form onSubmit={handleRegister} action=""><fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Register</legend>
 <label className="label">Name</label>
  <input type="text" className="input" name="name" placeholder="Name" />
   <label className="label">PhotoUrl</label>
  <input type="text" className="input" name="photoURL" placeholder="Link of photo" />
  <label className="label">Email</label>
   <input type="email" className="input" name="email" placeholder="Email" />


 <div className='relative'> <label className="label">Password</label>
 <input
    type={showpass ? "text" : "password"}
    name="password"
    value={password}
    onChange={handlePasswordChange}
    className="input"
    placeholder="Password"
    required
  />          <button onClick={handlebutton} type='button' className='absolute top-7 right-3 z-10'>{showpass?<FaEyeSlash/>:<FaEye/>}</button>
    {error && (
    <p className="text-red-500 text-sm mt-1">{error}</p>
  )}
          </div>

     <p>Already have an account <Link className='text-blue-400 underline' to ="/login">Login</Link></p>
       <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>


  <button className="btn btn-neutral mt-4">Register</button>
</fieldset></form><ToastContainer position="top-center" autoClose={3000} /></div>
    );
};

export default Register;