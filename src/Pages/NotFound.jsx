
import React from 'react'
import errorImg from '../assets/error-404.png'
import { Link } from 'react-router'
import { FaArrowRight } from "react-icons/fa";
const NotFound = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-center min-h-[80vh]">
        <img
          src={errorImg}
          alt="404 Error"
          className="w-[300px] mb-6"
        />
        <h1 className="font-bold text-3xl mb-2">Oops, page not found!</h1>
        <p className="text-gray-500 txt-sm">The page you are looking for is not available.</p>
         <Link to='/'><button className='bg-purple-500 text-white flex items-center gap-1 rounded-md p-2 font-bold mt-5'>Go Back to Home <FaArrowRight /></button></Link>
      </div>
    </>
  );
};

export default NotFound;
