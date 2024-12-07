import React, { useState } from "react";
import { Search, ShoppingCart, User } from "lucide-react";
import toast from "react-hot-toast";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const comingsoon = () => {
    toast("Soon!");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">QuickShop</div>

        <div className="flex-grow mx-8 max-w-xl">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="hover:bg-gray-100 p-2 rounded-full transition"
            onClick={comingsoon}
          >
            <User className="h-6 w-6 text-gray-600" />
          </button>
          <button
            className="relative hover:bg-gray-100 p-2 rounded-full transition"
            onClick={comingsoon}
          >
            <ShoppingCart className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
