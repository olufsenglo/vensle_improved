import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [searchTerm, setSearchTerm] = useState(queryParams.get('searchTerm') || '');
  // const [searchTerm, setSearchTerm] = useState('');
  // const [category_id, setCategoryId] = useState(queryParams.get('category_id') || '');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const inputRef = useRef(null);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Fetch suggestions from Laravel backend using Axios
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/products/filter`, {
        params: { searchTerm: value, category_id: selectedCategory },
      });

      const fetchedSuggestions = response.data.data; // Use the 'data' property
      console.log(fetchedSuggestions);
      setSuggestions(fetchedSuggestions);
      setSelectedSuggestionIndex(-1);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSelectSuggestion = (selectedSuggestion) => {
    setSearchTerm(selectedSuggestion.name);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedSuggestionIndex((prevIndex) => (prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (e.key === 'ArrowUp') {
      setSelectedSuggestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (e.key === 'Enter' && selectedSuggestionIndex !== -1) {
      handleSelectSuggestion(suggestions[selectedSuggestionIndex]);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const handleOutsideClick = (e) => {
    const isClickInsideInput = inputRef.current && inputRef.current.contains(e.target);
    const isClickInsideSuggestions = e.target.closest('.suggestions-list');

    if (!isClickInsideInput && !isClickInsideSuggestions) {
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  const handleSearchButtonClick = (e) => {
    e.preventDefault();
    // Navigate to the filter page with the appropriate query parameters
    const encodedSearchTerm = encodeURIComponent(searchTerm);

    navigate(`/filter?searchTerm=${encodedSearchTerm}&category_id=${selectedCategory}`);
  };

  useEffect(() => {
    setSelectedSuggestionIndex(-1);
  }, [suggestions]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
     <form style={{ "display": "flex", "position": "relative", "align-items": "center", "height": "100%", "flex": "1" }} onSubmit={handleSearchButtonClick}>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="border p-2 rounded-md h-full ml-2"
      >
        <option value="">All Categories</option>
        <option value="1">Category 1</option>
        <option value="2">Category 2</option>
      </select>
      {searchTerm && suggestions.length > 0 && (
        <ul style={{ "top": "2.8rem", "width": "100%" }} className="suggestions-list absolute z-10 right-0 left-0 bg-white border p-2 mt-1 w-64">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`cursor-pointer p-2 ${selectedSuggestionIndex === index ? 'bg-gray-200' : ''} hover:bg-gray-200`}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
      <input
        style={{ "height": "100%", "flex": "1" }}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search products, brands and categories"
        ref={inputRef}
      />
      <button
        style={{ "background": "red", "color": "white", "height": "100%", "padding-right": "0.8rem", "padding-left": "0.8rem" }}
        type="button"
      >
        SEARCH
      </button>
      </form> 
  );
}

export default Search;
