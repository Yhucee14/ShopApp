import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../config/FirebaseConfig";
import Rating from "../components/Rating";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const snapshot = await getDocs(productsRef);
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);


  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto">
      <header className="flex justify-between items-center py-8 px-8">
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

      <div>
        {products ? (
          <div className="grid xx:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                id={product.id}
                className="border p-4 rounded-lg shadow-sm hover:shadow-md"
              >
                <div>
                  <img
                    src={product.imgUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover border mb-4 rounded-md"
                  />
                  <div className="font-medium text-lg">{product.name}</div>
                  <div className="text-gray-600">N{product.price}</div>
                  <Rating rating={product.rating} />
                  <button
                    // onClick={() => dispatch(cartActions.addToCart(product))}
                    className="bg-[#1D1D1D] text-[#E4E7E9] py-1 px-2 font-medium hover:bg-[#E4E7E9] hover:text-[#1D1D1D] rounded-lg"
                  >
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
    </div>
  );
};

export default Home;
