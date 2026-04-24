import { NavLink } from "react-router-dom";
import { FiHome, FiBox, FiSearch } from "react-icons/fi";

const Sidebar = () => {
  return (
    <aside className="w-[98px] md:w-[110px] bg-[#1f2430] text-white min-h-screen flex flex-col border-r border-[#2d3342]">
      <div className="px-4 py-4 border-b border-[#2d3342]">
        <h1 className="text-sm font-semibold text-white flex items-center gap-1">
          Productr
          <span className="text-orange-400 text-xs">🔗</span>
        </h1>
      </div>

      <div className="px-3 py-3">
        <div className="flex items-center gap-2 bg-[#2a3140] rounded-md px-2 py-2 text-[10px] text-gray-400">
          <FiSearch size={12} />
          <span>Search</span>
        </div>
      </div>

      <nav className="flex flex-col gap-1 px-2 mt-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md text-[11px] transition-colors ${
              isActive
                ? "text-white bg-[#2a3140]"
                : "text-gray-400 hover:bg-[#2a3140] hover:text-white"
            }`
          }
        >
          <FiHome size={12} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md text-[11px] transition-colors ${
              isActive
                ? "text-white bg-[#2a3140]"
                : "text-gray-400 hover:bg-[#2a3140] hover:text-white"
            }`
          }
        >
          <FiBox size={12} />
          <span>Products</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
