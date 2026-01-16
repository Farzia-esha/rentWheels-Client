import { useEffect, useState } from "react";
import { useAuth } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router";
import axios from "axios";

const Profile = () => {
  const { user, logoutUser } = useAuth(); // ✅ correct name
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.email) return;

//     axios
//       .get(`https://rentwheels-server-five.vercel.app/users/${user.email}`)
//       .then((res) => {
//         setProfile(res.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         // fallback if user not found in backend
//         setProfile({
//           name: user?.displayName || "No Name",
//           email: user?.email,
//           photoURL: user?.photoURL || "https://via.placeholder.com/150",
//         });
//         setLoading(false);
//       });
//   }, [user]);

useEffect(() => {
  if (!user?.email) return;

  axios
    .get(`https://rentwheels-server-five.vercel.app/profile/${user.email}`)
    .then(res => setProfile(res.data))
    .catch(() => {
      setProfile({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      });
    })
    .finally(() => setLoading(false));
}, [user]);

  const handleLogout = async () => {
    await logoutUser(); // 
    navigate("/");
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!profile) return <p className="text-center mt-10">Profile not found</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow p-6 text-center">
      <img
        src={profile?.photoURL || "https://via.placeholder.com/150"}
        alt={profile?.name || "User"}
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{profile?.name || "No Name"}</h2>
      <p className="text-gray-600 mb-4">{profile?.email || "No Email"}</p>

      <button
        onClick={handleLogout}
        className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-semibold"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
