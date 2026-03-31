import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    fetch(`${BASEURL}/api/products/`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [BASEURL]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 text-center max-w-sm">
          <span className="text-4xl">⚠️</span>
          <h2 className="text-xl font-bold text-gray-800 mt-4">Unable to load products</h2>
          <p className="text-gray-500 mt-2 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12"> {/* pt-24 fixes the sticky navbar overlap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Trending Products
          </h1>
          <p className="text-gray-500 mt-2">Quality items delivered to your doorstep.</p>
          <div className="h-1 w-20 bg-blue-600 mt-4 rounded-full mx-auto sm:ml-0"></div>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="flex justify-center" // Centers card in its grid cell
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-lg">No products found in the catalog.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;