import React from 'react';
import { BookOpen, Truck, ShieldCheck, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header Section */}
      <section className="py-20 bg-[#FDFBF7] text-center border-b border-gray-100">
        <h1 className="text-4xl md:text-5xl font-serif text-[#C5A37D] mb-4">
          Our Story
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto px-4 font-sans leading-relaxed">
          Bridging the gap between timeless literature and modern logistics. 
          We don't just sell books; we deliver worlds to your doorstep.
        </p>
      </section>

      {/* Main Content Section - Styled based on your screenshot */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="space-y-16">
          
          {/* Our Company */}
          <div className="max-w-4xl">
            <h2 className="text-3xl font-serif text-[#C5A37D] mb-6">Our Company</h2>
            <p className="text-gray-700 font-sans leading-loose text-lg italic">
              Founded as a passion project for bibliophiles, our company has evolved into a 
              technology-driven platform focusing on delivering high-quality literary solutions. 
              Our mission is to help readers discover their next great story while ensuring 
              thoughtful design and modern delivery practices. Every order we take on is built 
              with attention to detail, speed, and long-term value for our community.
            </p>
          </div>

          {/* Our Team */}
          <div className="max-w-4xl">
            <h2 className="text-3xl font-serif text-[#C5A37D] mb-6">Our Team</h2>
            <p className="text-gray-700 font-sans leading-loose text-lg">
              Our team is made up of passionate curators, logistics experts, and problem-solvers 
              who love what they do. We believe in collaboration, continuous learning, and 
              clear communication. By working closely with publishers and our dedicated 
              courier fleet, we ensure that each delivery benefits from multiple perspectives 
              and strong technical expertise.
            </p>
          </div>

          {/* Our Commitment */}
          <div className="max-w-4xl">
            <h2 className="text-3xl font-serif text-[#C5A37D] mb-6">Our Commitment</h2>
            <p className="text-gray-700 font-sans leading-loose text-lg">
              We are committed to transparency, reliability, and client satisfaction. From 
              the first click on our bookstore to the final delivery by our courier, we 
              prioritize your reading goals and vision. Our approach is simple: deliver 
              clean, scalable solutions on time while building lasting relationships based 
              on trust and literary excellence.
            </p>
          </div>

        </div>
      </section>

      {/* Statistics Section - For visual weight */}
      <section className="bg-[#C5A37D] py-16 text-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">50k+</div>
            <div className="text-sm uppercase tracking-widest opacity-80">Books Delivered</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">12k+</div>
            <div className="text-sm uppercase tracking-widest opacity-80">Active Readers</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24h</div>
            <div className="text-sm uppercase tracking-widest opacity-80">Avg. Delivery</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">4.9/5</div>
            <div className="text-sm uppercase tracking-widest opacity-80">User Rating</div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#FDFBF7] rounded-full flex items-center justify-center text-[#C5A37D] mb-6 border border-[#C5A37D]/20">
              <BookOpen size={30} />
            </div>
            <h4 className="text-xl font-bold mb-3">Premium Curation</h4>
            <p className="text-gray-500 text-sm">Every book in our collection is handpicked for its quality and impact.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#FDFBF7] rounded-full flex items-center justify-center text-[#C5A37D] mb-6 border border-[#C5A37D]/20">
              <Truck size={30} />
            </div>
            <h4 className="text-xl font-bold mb-3">Elite Logistics</h4>
            <p className="text-gray-500 text-sm">Our in-house courier service ensures your books arrive in pristine condition.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#FDFBF7] rounded-full flex items-center justify-center text-[#C5A37D] mb-6 border border-[#C5A37D]/20">
              <ShieldCheck size={30} />
            </div>
            <h4 className="text-xl font-bold mb-3">Secure Handling</h4>
            <p className="text-gray-500 text-sm">Your data and your physical orders are protected with the highest security.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;