
import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import Home from "../Pages/Home";
import BrowseCars from "../Pages/BrowseCars";
import CarDetails from "../Pages/CarDetails";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddCar from "../Pages/AddCar";
import MyListings from "../Pages/MyListings";
import MyBookings from "../Pages/MyBookings";
import NotFound from "../Pages/NotFound";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Profile from "../Pages/Dashboard/Profile";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import PrivateRoute from "../Provider/PrivateRoute";
import AdminRoute from "../Provider/AdminRoute";
import Contact from "../Pages/Contact";
import About from "../Pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "browse-cars",
        element: <BrowseCars />,
        loader: () =>
          fetch("https://rentwheels-server-five.vercel.app/cars"),
      },
      {
        path: "cars/:id",
        element: (
          <PrivateRoute>
            <CarDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://rentwheels-server-five.vercel.app/cars/${params.id}`
          ),
      },
            {
        path: "about",
        element: <About/>,
      },
      {
        path: "contact",
        element: <Contact/>,
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "my-listings",
        element: <MyListings />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "add-car",
        element: <AddCar />,
      }
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-listings",
        element: <MyListings />,
      },
      {
        path: "add-car",
        element: <AddCar />,
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;


// import React from 'react';
// import { createBrowserRouter } from "react-router";
// import { RouterProvider } from "react-router/dom";
// import MainLayout from '../Layouts/MainLayout';
// import Home from '../Pages/Home';
// import BrowseCars from '../Pages/BrowseCars';
// import CarDetails from '../Pages/CarDetails';
// import PrivateRoute from '../Provider/PrivateRoute';
// import Login from '../Pages/Login';
// import Register from '../Pages/Register';
// import AddCar from '../Pages/AddCar';
// import MyListings from '../Pages/MyListings';
// import MyBookings from '../Pages/MyBookings';
// import NotFound from '../Pages/NotFound';
// import DashboardHome from '../Pages/Dashboard/DashboardHome';
// import DashboardLayout from '../Layouts/DashboardLayout';
// import Profile from '../Pages/Dashboard/Profile';
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout></MainLayout>,
//     children:[
//       {
//         index: true,
//         element: <Home></Home>
//       },
//       {
//         path: '/browse-cars',
//         element:<BrowseCars></BrowseCars>,
//         loader :()=> fetch('https://rentwheels-server-five.vercel.app/cars')
//       },
//       {
//         path: '/cars/:id',
//         element: <PrivateRoute>
//           <CarDetails></CarDetails>
//         </PrivateRoute>,
//         loader: ({params}) => fetch(`https://rentwheels-server-five.vercel.app/cars/${params.id}`)
//       },
//       {
//         path: '/add-car',
//         element: (
//           <PrivateRoute>
//             <AddCar />
//           </PrivateRoute>
//         )
//       },
//       {
//         path: '/my-listings',
//         element: (
//           <PrivateRoute>
//             <MyListings />
//           </PrivateRoute>
//         )
//       },
//       {
//         path: '/my-bookings',
//         element: (
//           <PrivateRoute>
//             <MyBookings />
//           </PrivateRoute>
//         )
//       },
//       {
//         path: '/login',
//         element: <Login />
//       },    
//       {   
//         path: '/register',
//         element: <Register></Register>
//       },
//     ]   
//   },
//   {
//   path: "/dashboard",
//   element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
//   children: [
//     { index: true, element: <DashboardHome /> },
//     { path: "profile", element: <Profile /> },
//     { path: "my-listings", element: <MyListings /> },
//     { path: "add-car", element: <AddCar /> },
//     { path: "users", element: <AdminRoute><ManageUsers /></AdminRoute> }
//   ]
// }
// ,
//   {
//     path: '*',
//     element: <NotFound></NotFound>
//   }
   
// ]);
// export default router ;
