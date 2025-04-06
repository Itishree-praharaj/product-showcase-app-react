import React, { useState } from "react";
import {
  User,
  Table,
  LayoutGrid,
  Plus,
  Search,
  LogOut,
} from "lucide-react";

const Header = ({
  user,
  onAddProduct,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  onProfileClick,
  onLogout,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
    if (onProfileClick) onProfileClick();
  };

  const handleLogout = () => {
    setShowDropdown(false);
    onLogout();
  };

  return (
    <>

      <div className="bg-[#4a5a86] text-white p-4 rounded-md shadow-md mb-4 flex justify-between items-center">
        <div className="text-xl font-semibold">
          Product Showcase
          <p className="text-sm text-gray-200">
            View and manage your products
          </p>
        </div>

        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer bg-white text-[#4a5a86] px-3 py-2 rounded-full"
            onClick={handleProfileClick}
          >
            <User size={20} />
            <span className="text-sm font-medium">
              {user?.name || "Guest"}
            </span>
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md z-10 w-[120px]">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-gray-100"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>


      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div className="relative w-[180px] sm:w-[220px]">
          <Search className="absolute left-2 top-2.5 text-[#6c757d]" size={16} />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-2 py-[6px] text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5c6bc0] bg-gray-50"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-2 rounded-md border ${viewMode === "table"
              ? "bg-[#4a5a86] text-white"
              : "bg-white text-[#4a5a86]"
              }`}
          >
            <Table size={16} />
          </button>

          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-2 rounded-md border ${viewMode === "grid"
              ? "bg-[#4a5a86] text-white"
              : "bg-white text-[#4a5a86]"
              }`}
          >
            <LayoutGrid size={16} />
          </button>

          <button
            type="button"
            onClick={onAddProduct}
            className="bg-[#5c6bc0] hover:bg-[#3f51b5] text-white p-2 rounded-md cursor-pointer flex items-center"
          >
            <Plus size={16} />
            <span className="ml-1 text-sm">Add Product</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
