// // // import React from "react";
// // // import { Bar } from "react-chartjs-2";

// // // const DashboardHome = ({ stats }) => {
// // //   const data = {
// // //     labels: stats.map(item => item.month),
// // //     datasets: [
// // //       {
// // //         label: "Bookings",
// // //         data: stats.map(item => item.bookings),
// // //         backgroundColor: "rgba(128, 0, 128, 0.7)",
// // //       },
// // //     ],
// // //   };

// // //   return (
// // //     <div>
// // //       <h2 className="text-2xl font-bold mb-4">Overview</h2>
// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
// // //         <div className="bg-white p-4 rounded shadow">Total Cars: {stats.totalCars}</div>
// // //         <div className="bg-white p-4 rounded shadow">Total Bookings: {stats.totalBookings}</div>
// // //         <div className="bg-white p-4 rounded shadow">Revenue: ${stats.totalRevenue}</div>
// // //       </div>
// // //       <div className="bg-white p-4 rounded shadow">
// // //         <Bar data={data} />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default DashboardHome;
// // import React from "react";
// // import { Bar } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";

// // // Chart.js registration
// // ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // const DashboardHome = ({ stats }) => {
// //   // Default dummy data if no stats provided
// //   const s = stats || {
// //     totalCars: 12,
// //     totalBookings: 25,
// //     totalRevenue: 1200,
// //     monthly: [
// //       { month: "Jan", bookings: 2 },
// //       { month: "Feb", bookings: 4 },
// //       { month: "Mar", bookings: 5 },
// //       { month: "Apr", bookings: 3 },
// //       { month: "May", bookings: 6 },
// //     ],
// //   };

// //   const data = {
// //     labels: s.monthly.map((item) => item.month),
// //     datasets: [
// //       {
// //         label: "Bookings",
// //         data: s.monthly.map((item) => item.bookings),
// //         backgroundColor: "rgba(128, 0, 128, 0.7)",
// //       },
// //     ],
// //   };

// //   return (
// //     <div>
// //       <h2 className="text-2xl font-bold mb-4">Overview</h2>

// //       {/* Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
// //         <div className="bg-white p-4 rounded shadow">Total Cars: {s.totalCars}</div>
// //         <div className="bg-white p-4 rounded shadow">Total Bookings: {s.totalBookings}</div>
// //         <div className="bg-white p-4 rounded shadow">Revenue: ${s.totalRevenue}</div>
// //       </div>

// //       {/* Chart */}
// //       <div className="bg-white p-4 rounded shadow">
// //         <Bar data={data} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default DashboardHome;
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";

// const DashboardHome = () => {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:3000/dashboard-stats")
//       .then(res => setStats(res.data));
//   }, []);

//   if (!stats) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>

//       {/* Cards */}
//       <div className="grid grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-6 shadow rounded">Cars: {stats.totalCars}</div>
//         <div className="bg-white p-6 shadow rounded">Bookings: {stats.totalBookings}</div>
//         <div className="bg-white p-6 shadow rounded">Revenue: ${stats.revenue}</div>
//       </div>

//       {/* Table */}
//       <table className="w-full bg-white shadow rounded">
//         <thead>
//           <tr className="bg-purple-600 text-white">
//             <th className="p-2">Month</th>
//             <th className="p-2">Bookings</th>
//           </tr>
//         </thead>
//         <tbody>
//           {stats.monthly.map((m, i) => (
//             <tr key={i} className="text-center border-t">
//               <td className="p-2">{m.month}</td>
//               <td className="p-2">{m.bookings}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DashboardHome;


import { useEffect, useState } from "react";
import axios from "axios";

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://rentwheels-server-five.vercel.app/dashboard-stats")
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Dashboard stats error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard Overview</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded p-5">
          <h3 className="text-lg font-semibold">Total Cars</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalCars}</p>
        </div>

        <div className="bg-white shadow rounded p-5">
          <h3 className="text-lg font-semibold">Total Bookings</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalBookings}</p>
        </div>

        <div className="bg-white shadow rounded p-5">
          <h3 className="text-lg font-semibold">Testimonials</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalTestimonials}</p>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white shadow rounded p-5">
        <h3 className="text-xl font-semibold mb-4">Recent Bookings</h3>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Car ID</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentBookings.map(booking => (
              <tr key={booking._id}>
                <td className="border p-2">{booking.carId}</td>
                <td className="border p-2">{booking.userEmail}</td>
                <td className="border p-2">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
