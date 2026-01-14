import { use, useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../Contexts/Context";
import { getAuth, updateProfile } from "firebase/auth";
import { User, Mail, Image, Save } from 'lucide-react';

const auth = getAuth();

const MyProfile = () => {
    const { user } = use(AuthContext);
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
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            toast.error("Failed to update profile!");
            console.log(error);
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    My <span className="text-[#d34e2d]">Profile</span>
                </h1>
                <p className="text-gray-600 mt-2">Manage your account information</p>
            </div>

            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-8">
                    {/* Profile Picture Section */}
                    <div className="flex flex-col items-center mb-8 pb-8 border-b border-gray-200">
                        <div className="relative">
                            <img
                                src={user?.photoURL || "https://via.placeholder.com/150"}
                                alt="profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-[#d34e2d] shadow-lg"
                            />
                            <div className="absolute bottom-0 right-0 bg-[#d34e2d] rounded-full p-2 shadow-lg">
                                <User className="text-white" size={20} />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mt-4">{user?.displayName}</h2>
                        <p className="text-gray-600 mt-1 flex items-center gap-2">
                            <Mail size={16} />
                            {user?.email}
                        </p>
                    </div>

                    {/* Update Form */}
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <User size={18} className="text-[#d34e2d]" />
                                Display Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d34e2d] focus:border-transparent outline-none transition-all"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <Image size={18} className="text-[#d34e2d]" />
                                Photo URL
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d34e2d] focus:border-transparent outline-none transition-all"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                placeholder="Enter photo URL"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <Mail size={18} className="text-[#d34e2d]" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                                value={user?.email}
                                disabled
                            />
                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-[#d34e2d] hover:bg-[#b8401f] text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <Save size={20} />
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MyProfile;
