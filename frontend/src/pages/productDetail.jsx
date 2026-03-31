import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${BASEURL}/api/products/${id}/`)
      .then((response) => {
        if (!response.ok) throw new Error("Product details could not be loaded");
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
  }, [id, BASEURL]);

  const handleAddToCart = () => {
    if (!localStorage.getItem('access_token')) {
      alert('Please login to add items to cart');
      return;
    }
    setAdding(true);
    addToCart(product.id);
    // Visual feedback delay
    setTimeout(() => setAdding(false), 600);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || "Product not found"}</h2>
        <Link to="/" className="text-blue-600 font-bold hover:underline">&larr; Back to Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-8 flex items-center text-sm font-medium text-gray-400">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Image Section with Hover Zoom */}
          <div className="group relative overflow-hidden rounded-3xl bg-gray-100 aspect-square">
            <img
              src={`${BASEURL}${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur shadow-sm text-gray-900 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                New Arrival
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col h-full py-2">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-blue-600">
                  ${product.price}
                </span>
                <span className="h-6 w-px bg-gray-200"></span>
                <span className="text-sm text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">
                  In Stock & Ready to Ship
                </span>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description || "No description available for this premium item."}
              </p>
            </div>

            {/* Action Section */}
            <div className="mt-auto space-y-4">
              <button 
                onClick={handleAddToCart}
                disabled={adding}
                className={`group w-full py-5 px-8 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${
                  adding 
                  ? "bg-green-500 text-white" 
                  : "bg-gray-900 text-white hover:bg-blue-600 active:scale-[0.98] shadow-gray-200"
                }`}
              >
                {adding ? (
                  <>Success! ✨</>
                ) : (
                  <>
                    Add to Cart
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>

              <Link 
                to="/" 
                className="block text-center py-4 font-bold text-gray-500 hover:text-gray-900 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 pt-10 border-t border-gray-100 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl mb-1">🚚</div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Fast Delivery</p>
              </div>
              <div className="text-center">
                <div className="text-xl mb-1">🛡️</div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Secure Pay</p>
              </div>
              <div className="text-center">
                <div className="text-xl mb-1">🔄</div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Easy Returns</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;