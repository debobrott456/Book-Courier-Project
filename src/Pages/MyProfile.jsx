import { use, useState } from "react";

import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../Contexts/Context";

import { getAuth, updateProfile } from "firebase/auth";
const auth = getAuth();


const MyProfile = () => {
  const {user}=use(AuthContext)

  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      toast.success("Profile updated successfully!");
      window.location.reload(); // refresh UI after update
    } catch (error) {
      toast.error("Failed to update profile!");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="shadow-xl p-8 w-[400px] rounded-xl bg-white">

        <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>

        {/* User Info */}
        <div className="text-center mb-6">
          <img
            src={user?.photoURL}
            alt="profile"
            className="w-24 h-24 rounded-full mx-auto mb-3 border"
          />
          <p className="text-lg font-semibold">{user?.displayName}</p>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
          <div>
            <label className="font-semibold">Update Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Update Photo URL</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-full" type="submit">
            Update Profile
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default MyProfile;
