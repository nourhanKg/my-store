import React, { useState, useEffect } from 'react';

function ProductsList({initialProducts, initialTotal}) {
  const [products, setProducts] = useState(initialProducts);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(initialTotal / 8);

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
  const handleNextPage = () => {
    if (skip + 8 < initialTotal) {
      fetchProducts(skip + 8);
    }
  };

  const handlePrevPage = () => {
    if (skip > 0) {
      fetchProducts(skip - 8);
    }
  };

  const currentPage = Math.floor(skip / 8) + 1;

  return (
    <div className="products-container">
      {loading ? (
        <p className="text-center text-xl">Loading products...</p>
      ) : (
        <div className="container card-grid" id="product-list">
          {products.map((product) => (
            <div key={product.id} className="card">
                <img src={product.thumbnail} alt={product.title}/>
                <div className="card-title">{product.title}</div>
                <div className="card-price">$${product.price}</div>
            </div>
          ))}
        </div>
      )}
        <div className="pagination-controls">
            <button onClick={handlePrevPage} disabled={skip === 0 || loading}>
            Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={skip + 8 >= initialTotal || loading}>
            Next
            </button>
        </div>
    </div>
  );
}

export default ProductsList;