import { useState } from "react";
import { FiChevronDown, FiLogOut, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Header = ({ title = "Products", showSearch = false }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginValue");
    setOpen(false);
    navigate("/login");
  };

  return (
    <header className="h-[50px] border-b border-gray-200 bg-white flex items-center justify-between px-4">
      <div className="flex items-center gap-2 text-[11px] text-gray-500">
        <span className="text-gray-400">⌂</span>
        <span>{title}</span>
      </div>

      <div className="flex items-center gap-4 relative">
        {showSearch && (
          <div className="hidden md:flex items-center gap-2 bg-[#f4f6fb] border border-gray-200 rounded-md px-3 py-1.5 w-[240px]">
            <FiSearch size={13} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search Services, Products"
              className="bg-transparent outline-none text-[11px] w-full text-gray-600 placeholder:text-gray-400"
            />
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-1"
        >
          <img
            src="https://i.pravatar.cc/32?img=12"
            alt="Profile"
            className="w-5 h-5 rounded-full object-cover"
          />
          <FiChevronDown size={12} className="text-gray-500" />
        </button>

        {open && (
          <div className="absolute right-0 top-9 w-32 bg-white border border-gray-200 rounded-md shadow-md py-1 z-20">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <FiLogOut size={14} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
