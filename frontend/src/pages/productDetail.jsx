import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";


function ProductDetail() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${BASEURL}/api/products/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id, BASEURL]); // Add id to the dependency array

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }
  if (!product) {
    return <div className="text-center mt-10">Product not found</div>;
  }

  const handleAddToCart = () => {
    if(!localStorage.getItem('access_token')){
      alert('Please login to add items to cart')
      return
    }
    addToCart(product.id);
  }




  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={`${BASEURL}${product.image}`}
            alt={product.name}
            className="w-full md:w-1/2 h-auto object-cover rounded-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-xl text-gray-600">${product.price}</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition" onClick={handleAddToCart}>
              Add to Cart 🛒
            </button>
            {/* Home button */}
            <div className="mt-4">
              <a
                href="/"
                className="text-blue-600 hover:text-blue-800 font-semibold transition"
              >
                &larr; Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetail;
