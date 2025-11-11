import React from 'react';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import BrowseCars from '../Pages/BrowseCars';
import CarDetails from '../Pages/CarDetails';
import PrivateRoute from '../Provider/PrivateRoute';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import AddCar from '../Pages/AddCar';
import MyListings from '../Pages/MyListings';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/browse-cars',
        element:<BrowseCars></BrowseCars>,
        loader :()=> fetch('http://localhost:3000/cars')
      },
      {
        path: '/cars/:id',
        element: <PrivateRoute>
          <CarDetails></CarDetails>
        </PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:3000/cars/${params.id}`)
      },
      {
        path: '/add-car',
        element: (
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        )
      },
      {
  path: '/my-listings',
  element: (
    <PrivateRoute>
      <MyListings />
    </PrivateRoute>
  )
},


      {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register></Register>
  },

      
    ]
  },
   
]);
export default router ;