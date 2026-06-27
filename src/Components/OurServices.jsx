import { Truck, Package, MapPin, CreditCard, RotateCcw } from 'lucide-react';
import ServiceImage from '../assets/book-library2R7G52F.jpg';

const OurServices = () => {
    const services = [
        {
            icon: <Truck size={20} />,
            title: 'Doorstep Delivery',
            description: 'Fast, reliable nationwide shipping directly to your home or office.'
        },
        {
            icon: <Package size={20} />,
            title: 'Safe Packaging',
            description: 'Protective, moisture-resistant wrapping to ensure books arrive in mint condition.'
        },
        {
            icon: <MapPin size={20} />,
            title: 'Live Tracking',
            description: 'Real-time SMS and email updates to monitor your order\'s journey.'
        },
        {
            icon: <CreditCard size={20} />,
            title: 'Flexible Payment',
            description: 'Secure online checkout and hassle-free Cash on Delivery options.'
        },
        {
            icon: <RotateCcw size={20} />,
            title: 'Easy Returns',
            description: 'A simple 7-day exchange policy for any damaged or incorrect titles.'
        }
    ];

    return (
        <div className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    {/* Left Side - Image */}
                    <div className="lg:w-1/2 ">
                        <img 
                            src={ServiceImage} 
                            alt="Our Services" 
                            className="w-full h-[450px] rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Right Side - Services Content */}
                    <div className="lg:w-1/2">
                        {/* Header */}
                        <div className="mb-8">
                            <p className="text-[#d34e2d] text-sm font-semibold mb-2">We're expanding day by day</p>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                                Our <span className="text-[#d34e2d]">Services</span>
                            </h2>
                            <p className="text-gray-800 text-lg mb-2 font-medium">
                                Global Trust of a Million Businesses and Counting
                            </p>
                            <p className="text-gray-600 text-base">
                                Connect with skilled professionals, streamline collaboration, and unlock success.
                            </p>
                        </div>

                        {/* Services List */}
                        <div className="space-y-4">
                            {services.map((service, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    {/* Icon Circle */}
                                    <div className="bg-[#d34e2d] text-white p-2 rounded-full flex-shrink-0 mt-1">
                                        {service.icon}
                                    </div>
                                    
                                    {/* Service Content */}
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                                        <p className="text-gray-600 text-sm">{service.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurServices;
