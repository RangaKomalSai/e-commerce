import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { useDarkMode } from "../DarkModeContext";

const StarRating = ({ rate }) => {
  const { isDarkMode } = useDarkMode();
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;

      if (rate >= starValue) {
        return (
          <Star key={index} className="h-5 w-5 text-yellow-500 fill-current" />
        );
      } else if (rate > index && rate < starValue) {
        return (
          <div key={index} className="relative">
            <Star
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-600" : "text-gray-300"
              }`}
            />
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${(rate - index) * 100}%` }}
            >
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
            </div>
          </div>
        );
      } else {
        return (
          <Star
            key={index}
            className={`h-5 w-5 ${
              isDarkMode ? "text-gray-600" : "text-gray-300"
            }`}
          />
        );
      }
    });
  };

  return (
    <div className="flex items-center">
      <div className="flex">{renderStars()}</div>
      <span
        className={`ml-2 text-sm ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        ({rate.toFixed(1)})
      </span>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`w-full max-w-xs rounded-lg shadow-lg ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl`}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-contain p-4 ${
            isDarkMode ? "bg-gray-700" : "bg-gray-50"
          }`}
        />
        <div
          className={`absolute top-2 right-2 ${
            isDarkMode
              ? "bg-gray-500 hover:bg-blue-600 hover:cursor-pointer"
              : "bg-white hover:bg-blue-500 hover:cursor-pointer"
          } rounded-full p-2 shadow-md`}
        >
          <ShoppingCart
            className={`h-6 w-6 ${
              isDarkMode ? "text-gray-100" : "text-gray-600 "
            }  transition-colors`}
          />
        </div>
      </div>

      <div className="p-4">
        <h3
          className={`text-lg font-semibold ${
            isDarkMode ? "text-gray-200" : "text-gray-800"
          } truncate mb-2`}
        >
          {product.title}
        </h3>

        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-xl font-bold ${
              isDarkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            ${product.price.toFixed(2)}
          </span>

          <StarRating rate={product.rating.rate} />
        </div>

        <div
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          } flex items-center justify-between`}
        >
          <span>({product.rating.count} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
