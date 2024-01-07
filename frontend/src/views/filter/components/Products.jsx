import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const searchTerm = queryParams.get('searchTerm') || '';
  const category_id = queryParams.get('category_id') || '';

  // State for filter form inputs
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedSizes, setSelectedSizes] = useState([]);

  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Handle checkbox input separately
      if (checked) {
        setSelectedSizes((prevSizes) => [...prevSizes, value]);
      } else {
        setSelectedSizes((prevSizes) => prevSizes.filter((size) => size !== value));
      }
    } else {
      // Handle other input types
      switch (name) {
        case 'minPrice':
          setMinPrice(value);
          break;
        case 'maxPrice':
          setMaxPrice(value);
          break;
        // Add more cases for additional input fields
        default:
          break;
      }
    }
  };

  const handleApplyFilter = () => {
    // Make API call with filter parameters
    fetchFilteredProducts();
  };

  const fetchFilteredProducts = async () => {
    try {
      // Customize the API endpoint and parameters based on your backend
      const response = await axios.get('http://localhost:8000/api/v1/products/filter', {
        params: {
          searchTerm,
          category_id,
          minPrice,
          maxPrice,
          sizes: selectedSizes.join(','), // Convert array to comma-separated string
        },
      });

      const filteredProducts = response.data.data; // Use the 'data' property
      setFilteredProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
  };

  useEffect(() => {
    // Fetch filtered products when the component mounts
    fetchFilteredProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, category_id, minPrice, maxPrice, selectedSizes]); // Add any dependencies as needed

  return (
    <div>
      {/* Display the filter form */}
      <form>
        <label>
          Min Price:
          <input type="text" name="minPrice" value={minPrice} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Max Price:
          <input type="text" name="maxPrice" value={maxPrice} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Sizes:
          <input type="checkbox" name="small" value="small" onChange={handleInputChange} />
          <span>Small</span>
          <input type="checkbox" name="medium" value="medium" onChange={handleInputChange} />
          <span>Medium</span>
          {/* Add more checkboxes for different sizes */}
        </label>
        <br />
        <button type="button" onClick={handleApplyFilter}>
          Apply Filter
        </button>
      </form>

      {/* Display the filtered products */}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
            {filteredProducts && filteredProducts.map((product) => (
              <a key={product.id} href={product.href} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
