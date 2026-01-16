# RentWheels – Car Rental Platform

## Live Site:
**Client :** [ https://mellow-tartufo-668815.netlify.app/ ]
<br>
**Server :** [ https://rentwheels-server-five.vercel.app/ ]

## Project Overview
RentWheels is a full-stack MERN application that connects users with local car owners and rental providers. Users can browse available cars, view details, and book rentals for specific dates. Car providers can list vehicles, manage bookings, and update availability. The platform focuses on ease of use, real-time booking updates, and a professional car rental experience.

---

## 🧩 Core Technologies Used
## 💻 Frontend
- React, React Router,
- TailwindCSS, React Icons, Framer Motion,
- SweetAlert, React Hot Toast
- Axios
## ⚙️ Backend:
- Node.js,
- Express,
- MongoDB,
  
 ## 🚀 Deployment
- Client → Netlify ,
- Server → Vercel ,
- Database: MongoDB Atlas

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

## 📦 Dependencies:
### Client site:
- @tailwindcss/vite ^4.1.15
- aos ^2.3.4
- firebase ^12.4.0
- react ^19.1.1
- react-dom ^19.1.1
- react-hot-toast ^2.6.0
- react-icons ^5.5.0
- react-router ^7.9.4
- react-router-dom ^7.9.4
- react-toastify ^11.0.5
- sweetalert2 ^11.26.3
- swiper ^12.0.3
- tailwindcss ^4.1.15
  
 ### Server Site:
- express@4.18.2
- cors@2.8.5
- dotenv@16.4.5
- mongodb@6.5.0

 ## How to Run Locally

**Client Setup**
- git clone https://github.com/Farzia-esha/rentWheels-Client.git
- cd rentWheels-Client
- npm install
- npm run dev

📁 .env file (Do not push this to GitHub):

- VITE_FIREBASE_API_KEY=your_api_key
- VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
- VITE_FIREBASE_PROJECT_ID=your_project_id
- VITE_FIREBASE_STORAGE_BUCKET=your_bucket
- VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
- VITE_FIREBASE_APP_ID=your_app_id
- VITE_BACKEND_BASE_URL=https://your-server.vercel.app

**⚙️ Server Setup**

- git clone https://github.com/Farzia-esha/rentwheels-server.git
- cd rentwheels-server
- npm install
- npm run start

📁 .env file (Do not push this to GitHub):

- PORT=3000
- MONGODB_URI=your_mongodb_uri
- ACCESS_TOKEN_SECRET=your_secret_key

