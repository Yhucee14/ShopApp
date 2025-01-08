import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../config/FirebaseConfig";
import Rating from "../components/Rating";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async () => {
  const productsRef = collection(db, "products");
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const Home = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <div className=" w-full bg-gradient-to-r px-2 md:px-4 from-gray-100 to-gray-100">
      <header className="flex justify-between items-center py-8 px-2">
        <div className="flex justify-center items-center">
          <h1 className="font-bold text-3xl">ShopApp</h1>
        </div>

        <div className="relative w-[45%]">
          <input
            type="text"
            placeholder="Search for anything..."
            // value={searchTerm}
            // onChange={handleSearch}
            className="block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-[#A4A4A4] focus:border-[#A4A4A4]"
          />
          <div className="absolute inset-y-0 right-2 flex p-2 items-center">
            <img
              //   src={search}
              alt="Search Icon"
              className="h-[25px] w-[25px] bg-transparent"
              style={{ fill: "white" }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-lg">Welcome</div>
        </div>
      </header>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-black border-solid border-transparent"></div>
        </div>
      ) : isError ? (
        <p className="text-center py-8">Failed to fetch products.</p>
      ) : (
        <div>
          {products ? (
            <div className="grid xx:grid-cols-1 ss:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border flex flex-col justify-between gap-2 p-4 rounded-lg shadow-sm hover:shadow-md"
                >
                  <div>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover border mb-4 rounded-md"
                    />
                  </div>

                  <div>
                    <div className="font-medium text-lg">{product.name}</div>
                    <div className="text-gray-600">N{product.price}</div>
                    <Rating rating={product.rating} />
                    <button className="bg-[#1D1D1D] text-[#E4E7E9] py-1 px-2 font-medium hover:bg-[#E4E7E9] hover:text-[#1D1D1D] rounded-lg">
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No products found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
