// import React, { useState, useEffect } from "react";
// import Card from "./Card";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   image: string;
//   rating: {
//     rate: number;
//   };
// }

// const Home: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("https://fakestoreapi.com/products");
//         const data: Product[] = await response.json();
//         setProducts(data);
//         setIsLoading(false);
//       } catch (err) {
//         setError("Failed to load products. Please try again later.");
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (isLoading) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-center mt-10 text-red-500">{error}</p>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6 text-center">Product Catalog</h1>
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         {products.map((product) => (
//           <Card
//             key={product.id}
//             title={product.title}
//             price={product.price}
//             image={product.image}
//             rating={product.rating.rate}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect } from "react";
import ProductCard from "../components/Card"; // Import the Product type
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import { useDarkMode } from "../DarkModeContext";

const Home = () => {
  const { isDarkMode } = useDarkMode();
  const dispatch = useDispatch();
  const { filteredItems, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          isDarkMode ? "bg-gray-900 text-red-400" : "bg-gray-100 text-red-500"
        } text-xl`}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      } transition-colors duration-200`}
    >
      <Header />
      <div className="container mx-auto px-8 py-8 font-poppins">
        <h1
          className={`text-3xl font-bold text-center mb-8 ${
            isDarkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Explore our Products!
        </h1>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"> */}
        {filteredItems.length === 0 ? (
          <div className="flex justify-center items-center min-h-[50vh] text-center">
            <div className="text-center">
              <p className="text-2xl text-gray-600 mb-4">
                No products to show right now
              </p>
              <p className="text-gray-500">
                We're working on adding more items to our catalog
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {filteredItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Home;
