import React from 'react';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import BrowseCars from '../Pages/BrowseCars';
import CarDetails from '../Pages/CarDetails';
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
        element: <CarDetails></CarDetails>,
        loader: ({params}) => fetch(`http://localhost:3000/cars/${params.id}`)
},
      
    ]
  },
]);
export default router ;