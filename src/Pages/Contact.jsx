import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Please fill in all fields');
            return;
        }

        // Simulate sending message
        toast.success('Message sent successfully! We will get back to you soon.');
        
        // Reset form
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mb-50 lg:mb-10">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Contact <span className="text-[#d34e2d]">Us</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get in touch with us for any inquiries or support
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ height: '70vh' }}>
                    {/* Left Side - Split into Dark Info Section and White Form */}
                    <div className="flex flex-col lg:flex-row gap-0 h-full">
                        {/* Dark Info Section */}
                        <div className="bg-gray-900 text-white rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none p-6 lg:w-48 flex-shrink-0">
                            <h2 className="text-2xl font-bold mb-3">Contact Our Team</h2>
                            <p className="text-gray-300 text-sm mb-6">
                                Have a custom requirement or a question about the package? Send a direct message.
                            </p>

                            {/* Contact Info Cards */}
                            <div className="space-y-4">
                                {/* Location */}
                                <div className="flex items-start gap-3">
                                    <div className="bg-[#d34e2d] p-2 rounded-full flex-shrink-0">
                                        <MapPin size={16} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-xs text-gray-400 mb-1">LOCATION</h3>
                                        <p className="text-white text-sm">Uttara, Dhaka</p>
                                    </div>
                                </div>

                                {/* Response Time */}
                                <div className="flex items-start gap-3">
                                    <div className="bg-[#d34e2d] p-2 rounded-full flex-shrink-0">
                                        <Clock size={16} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-xs text-gray-400 mb-1">TYPICAL RESPONSE</h3>
                                        <p className="text-white text-sm">Within 24 Hours</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* White Form Section */}
                        <div className="bg-white rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none p-6 lg:p-8 flex-1 shadow-sm border border-gray-200 overflow-y-auto">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Name Input */}
                                  

                                    {/* Email Input */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d34e2d] focus:border-transparent outline-none"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                {/* Message Textarea */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d34e2d] focus:border-transparent outline-none resize-none"
                                        placeholder="Write your message here..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-[#d34e2d] hover:bg-[#b8401f] text-white font-semibold rounded-lg transition-colors duration-300"
                                >
                                    Send Message
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Side - Contact Information */}
                    <div className="space-y-6 h-full overflow-y-auto">
                        {/* Contact Cards */}
                        <div className="space-y-6">
                            {/* Phone Card */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#fde8e3] p-3 rounded-full">
                                        <Phone className="text-[#d34e2d]" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">CONTACT US</h3>
                                        <p className="text-gray-900 font-medium">+8801326-903614</p>
                                        <p className="text-gray-600 text-sm mt-1">Available Mon-Fri, 9am - 6pm</p>
                                    </div>
                                </div>
                            </div>

                            {/* Email Card */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#fde8e3] p-3 rounded-full">
                                        <Mail className="text-[#d34e2d]" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">EMAIL ADDRESS</h3>
                                        <p className="text-gray-900 font-medium">joyk3075@gmail.com</p>
                                        <p className="text-gray-600 text-sm mt-1">We respond within 8 hours</p>
                                    </div>
                                </div>
                            </div>

                            {/* Location Card */}
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#fde8e3] p-3 rounded-full">
                                        <MapPin className="text-[#d34e2d]" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">OUR LOCATION</h3>
                                        <p className="text-gray-900 font-medium">Uttara, Dhaka, Bangladesh</p>
                                        <p className="text-gray-600 text-sm mt-1">Visit our headquarters</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Contact;
