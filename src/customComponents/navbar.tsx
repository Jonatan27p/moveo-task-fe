import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">My App</div>
      <div className="flex space-x-4">
        <Link to="admin" className="hover:underline">
          Admin
        </Link>
        <Link to="" className="hover:underline">
          User
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
