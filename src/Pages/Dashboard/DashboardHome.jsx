
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
