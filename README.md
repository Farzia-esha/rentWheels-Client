# RentWheels – Car Rental Platform



## Project Overview

RentWheels is a full-stack MERN application that connects users with local car owners and rental providers. Users can browse available cars, view details, and book rentals for specific dates. Car providers can list vehicles, manage bookings, and update availability. The platform focuses on ease of use, real-time booking updates, and a professional car rental experience.

---

## Main Features

1. **User Authentication**  
   - Email/Password login and registration  
   - Google login integration  
   - Conditional navbar showing profile image for logged-in users  

2. **Car Management (CRUD)**  
   - Providers can add, update, and delete their car listings  
   - View all bookings made by users  
   - Real-time status update of car availability  

3. **Browse Cars**  
   - Public page displaying all available cars  
   - Each car card shows name, price, type, provider info, and "View Details" button  

4. **Booking System**  
   - Logged-in users can book cars  
   - Prevents double booking  
   - Updates car status in the database (Available / Unavailable)  
   - Confirmation shown via SweetAlert or toast  

5. **Responsive UI**  
   - Fully responsive design for mobile, tablet, and desktop  
   - Clean grid layouts, equal card heights, and consistent typography  
   - Hero banner with carousel, top-rated cars, customer testimonials, and benefits section  

---

## UI & Design Features

- **Navbar & Footer**: Persistent on all pages except 404  
- **Hero Banner**: Carousel with meaningful slides  
- **Featured Cars Section**: Display 6 newest cars from database  
- **Extra Sections**: Top-rated cars and testimonials  
- **Loading Spinner**: Shown during API calls  
- **Animations**: Framer Motion and Typewriter React for smooth effects  

---

## Technologies Used

- **Frontend:** React, React Router, TailwindCSS, React Icons, Framer Motion, SweetAlert, React Hot Toast  
- **Backend:** Node.js, Express, MongoDB  
- **Deployment:** Client → Netlify , Server → Vercel  


**Client Live Site:** [ https://mellow-tartufo-668815.netlify.app/ ]
<br>
**Server Live Site:** [ https://rentwheels-server-five.vercel.app/ ]


