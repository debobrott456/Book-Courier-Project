import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img1 from '../assets/blog6-best-1330x620.jpg'
import img2 from '../assets/banner2-1330x620 (1).jpg'
import img3 from '../assets/janko-ferlic-sfL_QOnmy00-unsplash.jpg';
import img4 from '../assets/blog-5.jpg';

import 'swiper/css';
import 'swiper/css/pagination';
import '../Styles/Banner.css'
// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Coverage from '../Pages/Coverage';
// import book1 from '../assets/silent.jpg'
// import book2 from '../assets/Atomic_Habits.jpg'
// import book3 from '../assets/alchemist.jpg'
// import book4 from '../assets/rich_dad-1000.jpg'
// import book5 from '../assets/harry_potter.jpg'
// import book6 from '../assets/psychology_money_crwg.jpg'
import { Link } from 'react-router';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import Category from './Category';
import BookCard from '../Pages/BookCard';
import Features from './Features';
import Contact from '../Pages/Contact';
import FAQ from '../Pages/FAQ';
import FeaturedBooks from './FeaturedBooks';
import { Outdent } from 'lucide-react';
import OurServices from './OurServices';


const Home = () => {


 const [datas, setDatas] = useState([]);
 const [books, setBooks] = useState([]);
   const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetch("/service_center.json")
      .then(res => res.json())
      .then(data => setDatas(data));
  }, []);
  useEffect(() => {
    fetch(`https://book-server-omega.vercel.app/recentbooks?status=published`)
      .then(res => res.json())
      .then(data => {setBooks(data)
        setLoading(false)
    console.log(data)});
  }, []);


   if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars loading-lg text-amber-500"></span></div>;
  if (!books) return <p>Job not found</p>;

    return (
        <div className='max-w-8xl mx-auto my-10'>
          <div className="max-h-[700px]">
  <Carousel
    infiniteLoop={true}
    autoPlay={true}
    stopOnHover={false}
    showThumbs={false}
  >
    {/* Slide 1 */}
    <div className="relative">
      <img
        src={img1}
        className="w-full h-[480px] object-cover"
        alt="Book Courier Service"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40">
        <h2 className="text-4xl font-bold mb-2">
          Book Courier Service
        </h2>
        <p className="text-lg">
          Fast & reliable book delivery
        </p>
      </div>
    </div>

    {/* Slide 2 */}
    <div className="relative">
      <img
        src={img2}
        className="w-full h-[480px] object-cover"
        alt="Nationwide Delivery"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40">
        <h2 className="text-4xl font-bold mb-2">
          Nationwide Delivery
        </h2>
        <p className="text-lg">
          We deliver books all over the country
        </p>
      </div>
    </div>

    {/* Slide 3 */}
    <div className="relative">
      <img
        src={img3}
        className="w-full h-[480px] object-cover"
        alt="Safe & Secure"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40">
        <h2 className="text-4xl font-bold mb-2">
          Safe & Secure
        </h2>
        <p className="text-lg">
          Your books are handled with care
        </p>
      </div>
    </div>
  </Carousel>
</div>

<section className="mx-[50px]"><Features></Features></section>
<section className="mx-[50px]"><OurServices></OurServices></section>


<div className="mx-[50px]"><Category></Category></div>

            {/* <section className="reliability-section m-8">
      <div className="reliability-content">
        <h2>Why Choose Book Courier</h2>
        <p>
          Our platform ensures 99.9% uptime, secure transactions, and verified
          Librarian. We prioritize reliability so you can focus on buying <br /> your book without any interruptions.
        </p>
        <div className="features">
          <div className="feature">
            <h3>24/7 Uptime</h3>
            <p>Always online to serve your needs anytime, anywhere.</p>
          </div>
          <div className="feature">
            <h3>Secure Payments</h3>
            <p>Encrypted transactions to keep your data and money safe.</p>
          </div>
          <div className="feature">
            <h3>Verified Experts</h3>
            <p>Every Librarian is verified for quality and trustworthiness.</p>
          </div>
        </div>
      </div>
    </section> */}
    <section className="mx-[50px]">
      <FeaturedBooks></FeaturedBooks>
    </section>

    <section className="mx-[50px]">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
                        Recent <span className="text-[#d34e2d]">Books</span>
                    </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 gap-3'>
          
            {
                books.map((book)=>
                  <BookCard book={book}></BookCard>
               )
            }
        </div>
    </section>
    <section className='flex flex-col lg:flex-row gap-5 mx-[50px] my-[50px]'><div className='flex-1'><img className='w-full h-[520px]' src={img4} alt="" /></div><div className='flex-1'><FAQ></FAQ></div></section>
    <div className='mx-[50px] my-14'><Coverage datas={datas}></Coverage></div>
<section className="mx-[50px]"><Contact></Contact></section>
    
            
        </div>
        
    );
};

export default Home;