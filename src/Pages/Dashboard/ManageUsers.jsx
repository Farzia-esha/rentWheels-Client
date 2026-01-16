// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch users from backend
//   useEffect(() => {
//     fetch("https://rentwheels-server-five.vercel.app/users")
//       .then(res => res.json())
//       .then(data => {
//         setUsers(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         toast.error("Failed to load users");
//         setLoading(false);
//       });
//   }, []);

//   // Make admin
//   const makeAdmin = (id) => {
//     fetch(`https://rentwheels-server-five.vercel.app/users/admin/${id}`, {
//       method: "PATCH",
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.modifiedCount > 0) {
//           toast.success("User promoted to admin");
//           setUsers(users.map(user =>
//             user._id === id ? { ...user, role: "admin" } : user
//           ));
//         }
//       });
//   };

//   if (loading) {
//     return <p className="text-center text-lg">Loading users...</p>;
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

//       <div className="overflow-x-auto bg-white rounded-lg shadow">
//         <table className="table w-full">
//           <thead className="bg-purple-700 text-white">
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((user, index) => (
//               <tr key={user._id}>
//                 <td>{index + 1}</td>
//                 <td>{user.name || "N/A"}</td>
//                 <td>{user.email}</td>
//                 <td className="capitalize">{user.role || "user"}</td>
//                 <td>
//                   {user.role !== "admin" && (
//                     <button
//                       onClick={() => makeAdmin(user._id)}
//                       className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
//                     >
//                       Make Admin
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;


import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  const fetchUsers = () => {
    setLoading(true);
    fetch("https://rentwheels-server-five.vercel.app/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load users");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = (id) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;

    fetch(`https://rentwheels-server-five.vercel.app/users/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          toast.success("User removed successfully");
          setUsers(prev => prev.filter(user => user._id !== id));
        } else {
          toast.error("Failed to remove user");
        }
      })
      .catch(() => toast.error("Error removing user"));
  };

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role || "user"}</td>
                <td>
                  {/* Only show Remove button for normal users */}
                  {user.role === "user" && (
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
