import { Truck, Shield, Headphones, RotateCcw } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <Truck size={40} />,
            title: 'Free delivery',
            description: 'For all orders above $45'
        },
        {
            icon: <Shield size={40} />,
            title: 'Secure payments',
            description: 'Confidence on all your devices'
        },
        {
            icon: <Headphones size={40} />,
            title: 'Top-notch support',
            description: 'sayhello@kapier.com'
        },
        {
            icon: <RotateCcw size={40} />,
            title: '180 Days Return',
            description: '180 Days Return'
        }
    ];

    return (
        <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Our <span className="text-[#d34e2d]">Features</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover the benefits that make shopping with us exceptional
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Icon Container */}
                            <div className="flex justify-center mb-4">
                                <div className="text-[#d34e2d] group-hover:text-[#b8401f] transition-colors duration-300 transform group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Hover Effect Border */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#d34e2d] rounded-lg transition-all duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
