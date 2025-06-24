import React, { useState, useEffect } from 'react';

function ProductsList({initialProducts, initialTotal}) {
  const [products, setProducts] = useState(initialProducts);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(initialTotal / 8);

  // Function to fetch products from the API
  const fetchProducts = async (newSkip) => {
    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=${8}&skip=${newSkip}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.products);
      setSkip(newSkip);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle next/previous page clicks
  const handleNextPage = () => {
    if (skip + limit < initialTotal) {
      fetchProducts(skip + limit);
    }
  };

  const handlePrevPage = () => {
    if (skip > 0) {
      fetchProducts(skip - limit);
    }
  };

  const currentPage = Math.floor(skip / limit) + 1;

  return (
    <div className="products-container">
      <h2 className="text-3xl mb-6 text-center">Our Amazing Products</h2>
      {loading ? (
        <p className="text-center text-xl">Loading products...</p>
      ) : (
        <div className="container">
          {products.map((product) => (
            <div key={product.id} className="card">
                <img src={product.thumbnail} alt={product.title}/>
                <div class="card-title">{product.title}</div>
                <div class="card-price">$${product.price}</div>
            </div>
          ))}
        </div>
      )}
        <div className="pagination-controls flex justify-center items-center space-x-4 mt-8">
            <button onClick={handlePrevPage} disabled={skip === 0 || loading}>
            Previous
            </button>
            <span className="text-lg">Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={skip + limit >= initialTotal || loading}>
            Next
            </button>
        </div>
    </div>
  );
}

export default ProductsList;