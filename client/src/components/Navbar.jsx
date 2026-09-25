import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b border-[#dce8dc] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-[#5f8f61]">
          LLD Practice
        </Link>

        <div className="flex gap-5 text-sm font-medium text-gray-600">
          <Link to="/problems" className="hover:text-[#5f8f61]">
            Problems
          </Link>
          <Link to="/history" className="hover:text-[#5f8f61]">
            History
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
