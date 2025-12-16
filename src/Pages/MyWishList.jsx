import React, { use } from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { AuthContext } from '../Contexts/Context';
import { useQuery } from '@tanstack/react-query';

const MyWishList = () => {
    const axiosSecure=UseAxiosSecure();
    const {user}=use(AuthContext)

    console.log(user)

     const {data:books=[]}=useQuery({
        queryKey:['books',user?.email],
        queryFn:async ()=>{
            const res=await axiosSecure.get(`/wishBooks?email=${user.email}`);
            console.log(res.data)
            return res.data;
        }
    })
    console.log(books)
    
    return ( <div>
                    <p className='text-3xl font-bold text-orange-400 text-center m-5'>My WishList</p>

         <div className='grid grid-cols-2 gap-5 m-8'>
             { books.map((book)=>
                <div className='flex gap-3 shadow-2xl rounded-xl max-w-[500px] '>
                <img src={book.bookImage} alt="" style={{width:200, heigth:350}}/>
                <div className='p-3 flex flex-col gap-4'>
                    <p>Book name :{book.bookName}</p>
                    <p>Book Author :{book.authorName}</p>
                    <p>Book Price :{book.bookPrice}</p>
                  
                </div>
                </div>)}
        </div></div>
      
       
    );
};

export default MyWishList;