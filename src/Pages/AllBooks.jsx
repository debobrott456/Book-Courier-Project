
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const AllBooks = () => {
    
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");



 

  useEffect(() => {
    fetch(`http://localhost:5000/allBooks?sort=${sortOrder}&status=published`)
      .then(res => res.json())
      .then(data => {
      
          setJobs(data);
        
      });
  }, [sortOrder]);


  const term = search.trim().toLowerCase();
  const filtered = term
    ? jobs.filter(app => app.bookName.toLowerCase().includes(term))
    : jobs;
    return (
        <div>
             <div className='flex items-center '>
      <div className="navbar-center flex">
    <ul className="menu menu-horizontal px-1">
     
      <li>
        <details>
          <summary>Sort</summary>
          <ul className="p-2 w-60">
            <button onClick={() => setSortOrder('desc')}><li><a>Larger Price</a></li></button>
            <button onClick={() => setSortOrder('asc')}><li><a>Lowest Price</a></li></button>
          </ul>
        </details>
      </li>
     
    </ul>
  </div>
  <div className='border border-gray-300 rounded-xl w-[200px] h-7'>  <input value={search} onChange={e=>setSearch(e.target.value)} type="search"
   name="search" id="" placeholder='search by title'/></div>
 </div>
<div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10 mx-8 my-16'>
  {
   filtered.map((book)=>
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

        </div>
    );
};

export default AllBooks;