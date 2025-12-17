import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Root.jsx';
import Home from './Components/Home.jsx';
import AddBooks from './Pages/AddBooks.jsx';
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
import BeALibrarian from './Pages/BeALibrarian.jsx';
import LibraryManagement from './Pages/LibraryManagement.jsx';
import DashBoard from './Pages/DashBoard.jsx';
import AdminDashBoard from './Pages/AdminDashBoard.jsx';
import AllBooks from './Pages/AllBooks.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import MyWishList from './Pages/MyWishList.jsx';
import ManageBooks from './Pages/ManageBooks.jsx';

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
     errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        
        path:"/",
       
        Component:Home
      },
      
      {
        path:"/bookDetails/:id",
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
   path:"/userDashboard",
   element:<UserDashboard></UserDashboard>,

   children:[
     {
      path : "myOrders",
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
      loader:({params})=>fetch(`https://book-server-omega.vercel.app/orders/${params.id}`)   
     },
     {
      path:'payment-success',
      Component:PaymentSuccess,
     },
     {
      path:'myWishList',

      Component:MyWishList,
     },
    
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
        loader:()=>fetch('https://book-server-omega.vercel.app/books') ,
      Component:MyBooks,
     },
     {
     path:'orders',
    //  loader:()=>fetch('https://book-server-omega.vercel.app/librarian') ,
     Component:Orders,
     },
     {
      path:"update/:id",
      Component:Update
     },
     {
      path:"myProfile",
      Component:MyProfile
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
