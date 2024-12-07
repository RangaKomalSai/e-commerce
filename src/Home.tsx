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

import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./Card";
import { Product } from "./productType"; // Import the Product type
import Header from "./Header";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Product[]>(
          "https://fakestoreapi.com/products"
        );
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-8 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
