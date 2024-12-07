import React, { useState } from "react";
import { Search, ShoppingCart, User } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { searchProducts } from "../store/productsSlice";
import rks from "../assets/rks.png";
import DarkModeToggle from "./DarkModeToggle";
import { useDarkMode } from "../DarkModeContext";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(searchProducts(e.target.value));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(searchProducts(searchTerm));
    console.log("Searching for:", searchTerm);
  };

  const comingsoon = () => {
    toast("Soon!");
  };

  return (
    <header
      className={`sticky top-0 z-50 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow-md font-poppins`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <img src={rks} alt="brand-logo" className="h-10 md:h-14" />
        </div>

        <div className="flex-grow mx-4 md:mx-8 max-w-xl">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="hover:bg-gray-100 p-2 rounded-full transition hidden md:block"
            onClick={comingsoon}
          >
            <User
              className={`h-6 w-6 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            />
          </button>
          <button
            className="relative hover:bg-gray-100 p-2 rounded-full transition"
            onClick={comingsoon}
          >
            <ShoppingCart
              className={`h-6 w-6 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </button>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
