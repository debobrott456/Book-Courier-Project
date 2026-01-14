import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactInfoSection = () => {
  const contactData = [
    {
      id: 1,
      title: "Contact Us",
      value: "+8801326-903614",
      description: "Available Mon-Fri, 9am - 6pm",
      icon: <Phone className="w-8 h-8 text-amber-500" />,
    },
    {
      id: 2,
      title: "Email Address",
      value: "joyk3075@gmail.com",
      description: "We respond within 8 hours",
      icon: <Mail className="w-8 h-8 text-amber-500" />,
    },
    {
      id: 3,
      title: "Our Location",
      value: "Uttara, Dhaka, Bangladesh",
      description: "Visit our headquarters",
      icon: <MapPin className="w-8 h-8 text-amber-500" />,
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* flex-col ensures they stack vertically */}
        <div className="flex flex-col gap-6 w-full">
          {contactData.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Icon Container */}
              <div className="p-4 bg-amber-50 rounded-full">
                {item.icon}
              </div>

              {/* Text Content */}
              <div className="ml-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-xl font-bold text-gray-800 mt-1">
                  {item.value}
                </p>
                <p className="text-gray-500 text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;