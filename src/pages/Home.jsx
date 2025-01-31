import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import db from "../config/FirebaseConfig";
import Rating from "../components/Rating";
import search from "../assets/search.png";
import { CIcon } from "@coreui/icons-react";
import { cilCart } from "@coreui/icons";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity += 1;
      return updatedCart;
    });
  };

  const decreaseQuantity = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      if (updatedCart[index].quantity > 1) {
        updatedCart[index].quantity -= 1;
      } else {
        updatedCart.splice(index, 1); // Remove item if quantity is 1
      }
      return updatedCart;
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const productsRef = collection(db, "products");
    const q = query(productsRef, orderBy("createdAt", "desc"), limit(6));

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const updatedProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(updatedProducts);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching products:", error);
        setIsError(true);
        setIsLoading(false);
      }
    );

    // Cleanup the listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className=" w-full bg-gradient-to-r px-2 md:px-4 from-gray-100 to-gray-100">
      <header className="flex justify-between items-center py-8 px-2">
        <div className="flex justify-center items-center">
          <h1 className="font-bold text-3xl">ShopApp</h1>
        </div>

        <div className="relative w-[45%]">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-[#A4A4A4] focus:border-[#A4A4A4]"
          />
          <div className="absolute inset-y-0 right-2 flex p-2 items-center">
            <img
              src={search}
              alt="Search Icon"
              className="h-5 w-5 bg-transparent"
            />
          </div>
        </div>

        <div className="relative">
          <CIcon
            icon={cilCart}
            size="xl"
            onClick={() => setCartOpen(!cartOpen)}
            className="text-black w-10 h-10 cursor-pointer"
          />
          {cart.length > 0 && (
            <span className="absolute top-2 left-6 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cart.length}
            </span>
          )}
          {cartOpen && (
            <div className="absolute right-0 mt-2 w-[400px] bg-white shadow-lg p-4 rounded-lg">
              <h3 className="font-bold mb-2">Cart</h3>

              {cart.length > 0 ? (
                <ul>
                  {cart.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center py-2 border-b"
                    >
                      <div>
                        <span className="font-medium capitalize">
                          {item.name}
                        </span>
                        <p className="text-gray-600 py-1">
                          N{item.price} x {item.quantity}
                        </p>
                      </div>

                      <div className="flex flex-col ">
                        <div className="flex items-center gap-2">
                          {/* Decrease Quantity */}
                          <button
                            onClick={() => decreaseQuantity(index)}
                            className="px-2 py-0.5 bg-gray-200 rounded-md"
                          >
                            -
                          </button>

                          <span className="text-nd">{item.quantity}</span>

                          {/* Increase Quantity */}
                          <button
                            onClick={() => increaseQuantity(index)}
                            className="px-2 py-0.5 bg-gray-200 rounded-md"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Item */}
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-500 text-md font-semibold py-1"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Cart is empty</p>
              )}

              {/* Total Price */}
              {cart.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-bold text-lg">
                    Total: N
                    {cart.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  </h4>

                  {/* Pay Button */}
                  <button className="mt-2 w-full bg-black text-white py-2 rounded-md">
                    Pay
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-black border-solid border-r-transparent"></div>
        </div>
      ) : isError ? (
        <p className="text-center py-8">Failed to fetch products.</p>
      ) : (
        <div>
          {products ? (
            <div className="grid xx:grid-cols-1 ss:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border flex flex-col justify-between gap-2 p-4 rounded-lg shadow-sm hover:shadow-md"
                >
                  <div className="h-[320px]">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover border mb-4 rounded-md"
                    />
                  </div>

                  <div>
                    <div className="font-medium capitalize text-lg">
                      {product.name}
                    </div>
                    <div className="text-gray-600">N{product.price}</div>
                    <div className="py-1">
                      <Rating rating={product.rating} />
                    </div>

                    <button
                      onClick={() => addToCart(product)}
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
      )}
    </div>
  );
};

export default Home;
