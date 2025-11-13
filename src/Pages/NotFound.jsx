
import { Link } from "react-router";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
      <div className="bg-white shadow-md rounded-2xl p-10 text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-500 p-6 rounded-full animate-pulse">
            <AlertCircle className="text-white w-10 h-10" />
          </div>
        </div>

        <h2 className="text-5xl font-bold text-gray-800 mb-5"> 404</h2>
        <h2 className="text-4xl font-semibold text-gray-800 mb-5"> Page Not Found</h2>

        <p className="text-gray-600 mb-6 text-xl">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="bg-orange-500 text-white px-6 py-2 rounded-md font-medium hover:bg-orange-600 transition"
        >
          GO HOME
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
