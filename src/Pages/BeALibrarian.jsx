import { use } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { AuthContext } from '../Contexts/Context';
import { BookOpen, User, Mail, Phone, MapPin, Send, CheckCircle, Clock, Shield } from 'lucide-react';

const BeALibrarian = () => {
    const { register, handleSubmit } = useForm();
    const { user } = use(AuthContext);
    const axiosSecure = UseAxiosSecure();

    const handleForm = (data) => {
        console.log(data);
        data.created_At = new Date();
        axiosSecure.post('/beLibrarian', data)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    title: "Request Sent!",
                    text: "Your librarian application has been submitted successfully.",
                    icon: "success",
                    confirmButtonColor: "#d34e2d"
                });
            });
    };

    const benefits = [
        {
            icon: <BookOpen className="text-[#d34e2d]" size={24} />,
            title: "Manage Books",
            description: "Add, edit, and organize book collections"
        },
        {
            icon: <CheckCircle className="text-green-600" size={24} />,
            title: "Approve Orders",
            description: "Process and manage customer orders"
        },
        {
            icon: <Clock className="text-blue-600" size={24} />,
            title: "Flexible Hours",
            description: "Work on your own schedule"
        },
        {
            icon: <Shield className="text-purple-600" size={24} />,
            title: "Trusted Role",
            description: "Be part of our trusted team"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Become a <span className="text-[#d34e2d]">Librarian</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Join our team and help manage our growing book collection
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Benefits */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Why Join <span className="text-[#d34e2d]">Us?</span>
                            </h2>
                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="p-3 bg-gray-100 rounded-lg flex-shrink-0">
                                            {benefit.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">
                                                {benefit.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Info Card */}
                        <div className="bg-gradient-to-br from-[#d34e2d] to-[#b8401f] rounded-lg shadow-sm p-8 text-white">
                            <h3 className="text-xl font-bold mb-3">What You'll Do</h3>
                            <ul className="space-y-2 text-white/90">
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={18} />
                                    <span>Manage book inventory and catalog</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={18} />
                                    <span>Process customer orders efficiently</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={18} />
                                    <span>Maintain accurate book records</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={18} />
                                    <span>Provide excellent customer service</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Application Form */}
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Application <span className="text-[#d34e2d]">Form</span>
                        </h2>
                        
                        <form onSubmit={handleSubmit(handleForm)} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <User size={18} className="text-[#d34e2d]" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    defaultValue={user?.displayName}
                                    {...register('name', { required: true })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d34e2d] focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Mail size={18} className="text-[#d34e2d]" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={user?.email}
                                    readOnly
                                    {...register('email')}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                                />
                                <p className="text-xs text-gray-500 mt-1">Your registered email</p>
                            </div>

                            {/* Phone Field */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Phone size={18} className="text-[#d34e2d]" />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    required
                                    {...register('phone', { required: true })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d34e2d] focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Address Field */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <MapPin size={18} className="text-[#d34e2d]" />
                                    Address
                                </label>
                                <textarea
                                    placeholder="Enter your complete address"
                                    required
                                    rows="3"
                                    {...register('address', { required: true })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d34e2d] focus:border-transparent outline-none transition-all resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-[#d34e2d] hover:bg-[#b8401f] text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <Send size={20} />
                                Submit Application
                            </button>

                            <p className="text-xs text-gray-500 text-center">
                                By submitting, you agree to our terms and conditions
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeALibrarian;
