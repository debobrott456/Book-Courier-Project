import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img1 from '../assets/book1.jpg'
import img2 from '../assets/photo1.jpg'
import img3 from '../assets/photo2.jpg';
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

const Home = () => {


 const [datas, setDatas] = useState([]);
 const [books, setBooks] = useState([]);


  useEffect(() => {
    fetch("/service_center.json")
      .then(res => res.json())
      .then(data => setDatas(data));
  }, []);
  useEffect(() => {
    fetch('http://localhost:5000/recentbooks')
      .then(res => res.json())
      .then(data => {setBooks(data)
    console.log(data)});
  }, []);




    return (
        <div className='max-w-7xl mx-auto my-10 '>
            <div className='max-h-[700px]'>
                 <Carousel  infiniteLoop={true} autoPlay={true} stopOnHover={false}   showThumbs={false} >
<div>
<img  style={{width:600 ,height:600}} src={img1} />

</div>
<div>
<img style={{width:600 ,height:600}} src={img2} />

</div>
<div>
<img style={{width:600  ,height:600}} src={img3} />

</div>
</Carousel>
            </div>

<div className='m-14'><Coverage datas={datas}></Coverage></div>

            <section className="reliability-section m-8">
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
    </section>

    <section>
        <div className='grid grid-cols-3 gap-10'>
            {
                books.map((book)=>
                <div className='flex gap-3 shadow-2xl rounded-xl '>
                <img src={book.bookImage} alt="" style={{width:150, heigth:150}}/>
                <div className='p-3'>
                    <p>Book name :{book.bookName}</p>
                    <p>Book Author :{book.authorName}</p>
                    <p>Book Price :{book.bookPrice}</p>
                    <Link to={`/bookDetails/${book._id}`}><button className='btn btn-warning'>View Details</button></Link>
                  
                </div>
                </div>)
            }
        </div>
    </section>
            
        </div>
        
    );
};

export default Home;