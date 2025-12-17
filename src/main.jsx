import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Root.jsx';
import Home from './Components/Home.jsx';
import AddBooks from './Pages/AddBooks.jsx';
<<<<<<< HEAD
=======
import PrivateRoutes from './Routes/PrivateRoutes.jsx';
>>>>>>> 5523ff2 (first commit)
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import AuthProvider from './Contexts/Authprovider.jsx';
import AuthLayout from './Layout/AuthLayout.jsx';
import Orders from './Pages/Orders.jsx';
import MyBooks from './Pages/MyBooks.jsx';
import DashBoardLayout from './Pages/dashBoardLayout.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Update from './Pages/Update.jsx';
import UserDashboard from './Pages/UserDashboard.jsx';
import MyOrders from './Pages/MyOrders.jsx';
import MyProfile from './Pages/MyProfile.jsx';
import Invoices from './Pages/Invoices.jsx';
import BookDetails from './Pages/BookDetails.jsx';
import Payment from './Dashboard/Payment.jsx';
import PaymentSuccess from './Dashboard/PaymentSuccess.jsx';
import UsersManagement from './Pages/UsersManagement.jsx';
import AdminRoute from './Routes/AdminRoute.jsx';
<<<<<<< HEAD
import BeALibrarian from './Pages/BeALibrarian.jsx';
import LibraryManagement from './Pages/LibraryManagement.jsx';
import DashBoard from './Pages/DashBoard.jsx';
import AdminDashBoard from './Pages/AdminDashBoard.jsx';
import AllBooks from './Pages/AllBooks.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import MyWishList from './Pages/MyWishList.jsx';
import ManageBooks from './Pages/ManageBooks.jsx';
=======
>>>>>>> 5523ff2 (first commit)

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
<<<<<<< HEAD
     errorElement:<ErrorPage></ErrorPage>,
=======
>>>>>>> 5523ff2 (first commit)
    children:[
      {
        index:true,
        
        path:"/",
       
        Component:Home
      },
      
      {
        path:"/bookDetails/:id",
<<<<<<< HEAD
         loader:({params})=>fetch(`https://book-server-omega.vercel.app/books/${params.id}`) ,
        Component:BookDetails
      },
      {
        path:"/beALibrarian",
        Component:BeALibrarian
      },
      {
        path:'/dashBoard',
        Component:DashBoard
      },
      {
        path:'/allBooks',
        Component:AllBooks
=======
         loader:({params})=>fetch(`http://localhost:5000/books/${params.id}`) ,
        Component:BookDetails
>>>>>>> 5523ff2 (first commit)
      }
     
    ]
  },
  {
    path:"/",
    Component:AuthLayout,

    children:[
      {
        
        path:"/login",
        
        element:<Login></Login>
      },
      {
        
        path:"/register",
        
        element:<Register></Register>
      }
    ]
},
{
<<<<<<< HEAD
   path:"/adminDash",
   element:<AdminDashBoard></AdminDashBoard>,

   children:[
     {
      path:'users-management',
      // loader:()=>fetch(`https://book-server-omega.vercel.app/users`) ,
      element:<AdminRoute><UsersManagement></UsersManagement></AdminRoute>
     },
     {
      path:'libmanage',
      // loader:()=>fetch(`https://book-server-omega.vercel.app/users`) ,
      element:<AdminRoute><LibraryManagement></LibraryManagement></AdminRoute>
     },
     {
      path:'booksmanage',
      // loader:()=>fetch(`https://book-server-omega.vercel.app/users`) ,
      element:<AdminRoute><ManageBooks></ManageBooks></AdminRoute>
     },
     {
      path:'myProfile',
      element:<AdminRoute><MyProfile></MyProfile></AdminRoute>
     }
  ]},
{
=======
>>>>>>> 5523ff2 (first commit)
   path:"/userDashboard",
   element:<UserDashboard></UserDashboard>,

   children:[
     {
      path : "myOrders",
<<<<<<< HEAD
=======
     loader:()=>fetch('http://localhost:5000/orders') ,
>>>>>>> 5523ff2 (first commit)
      Component:MyOrders
    },
     {
      path : "myProfile",
     
      Component:MyProfile
    },
     {
      path : "invoices",
     
      Component:Invoices
    },
    
      {
      path:"payment/:id",
      Component:Payment,
<<<<<<< HEAD
      loader:({params})=>fetch(`https://book-server-omega.vercel.app/orders/${params.id}`)   
=======
      loader:({params})=>fetch(`http://localhost:5000/orders/${params.id}`)   
>>>>>>> 5523ff2 (first commit)
     },
     {
      path:'payment-success',
      Component:PaymentSuccess,
     },
     {
<<<<<<< HEAD
      path:'myWishList',

      Component:MyWishList,
     },
    
=======
      path:'users-management',
      loader:()=>fetch(`http://localhost:5000/users`) ,
      element:<AdminRoute><UsersManagement></UsersManagement></AdminRoute>
     }
>>>>>>> 5523ff2 (first commit)
   ]
},
{
  path:"/dashboard",
  element:<DashBoardLayout></DashBoardLayout>,

  children:[
    {
      path : "addBooks",
     
      Component:AddBooks
    },
   
     {
      path:'myBooks',
<<<<<<< HEAD
        loader:()=>fetch('https://book-server-omega.vercel.app/books') ,
=======
        loader:()=>fetch('http://localhost:5000/books') ,
>>>>>>> 5523ff2 (first commit)
      Component:MyBooks,
     },
     {
     path:'orders',
<<<<<<< HEAD
    //  loader:()=>fetch('https://book-server-omega.vercel.app/librarian') ,
=======
    //  loader:()=>fetch('http://localhost:5000/librarian') ,
>>>>>>> 5523ff2 (first commit)
     Component:Orders,
     },
     {
      path:"update/:id",
      Component:Update
<<<<<<< HEAD
     },
     {
      path:"myProfile",
      Component:MyProfile
=======
>>>>>>> 5523ff2 (first commit)
     }
    
  ]
}

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>    <AuthProvider> <RouterProvider router={router}></RouterProvider></AuthProvider>
</QueryClientProvider>
       

  </StrictMode>,
)
