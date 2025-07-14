import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useCart from './useCart'; // Adjust the path if needed

const MenuPage = ({ searchTerm = "" }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [categorizedItems, setCategorizedItems] = useState({});
  const { cart, addToCart, cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/item/items-by-category');
        setCategorizedItems(response.data);

        const categoryNames = Object.keys(response.data);
        setCategories(categoryNames);

        if (categoryNames.length > 0 && !activeCategory) {
          setActiveCategory(categoryNames[0]);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [activeCategory]);

  const goToCheckout = () => {
    navigate('/Students/CheckoutPage');
  };

  const getCategoryIcon = (category, index) => {
    const icons = {
      'Breakfast': 'coffee',
      'Lunch': 'hamburger',
      'Dinner': 'utensils',
      'Snacks': 'cookie',
      'Beverages': 'glass-whiskey',
      'Desserts': 'ice-cream'
    };

    return icons[category] || ['coffee', 'hamburger', 'utensils', 'pizza-slice', 'bread-slice'][index % 5] || 'utensils';
  };

  const getCategorySubtitle = (category, index) => {
    const subtitles = {
      'Breakfast': 'Popular',
      'Lunch': 'Special',
      'Dinner': 'Lovely',
      'Snacks': 'Tasty',
      'Beverages': 'Refreshing',
      'Desserts': 'Sweet'
    };

    return subtitles[category] || ['Popular', 'Special', 'Lovely', 'Tasty', 'Fresh'][index % 5] || 'Delicious';
  };

  // Flatten all items across all categories
  const allItems = Object.values(categorizedItems).flat();

  // Filter items by search
  const filteredItems = searchTerm.trim()
    ? allItems.filter(item =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categorizedItems[activeCategory] || [];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h5 className="text-amber-500 font-medium mb-2">Food Menu</h5>
          <h1 className="text-3xl font-bold">Most Popular Items</h1>
        </div>

        {/* Category Tabs */}
        {!searchTerm && (
          <div className="flex justify-center mb-8 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-amber-400">
            <div className="inline-flex bg-gray-100 rounded-lg p-1 space-x-2">
              {categories.map((category, index) => (
                <button 
                  key={category}
                  className={`flex items-center px-4 py-2 md:px-6 md:py-3 rounded-lg whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category ? 'bg-white shadow-md' : ''
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  <i className={`fa fa-${getCategoryIcon(category, index)} text-amber-500 text-xl mr-3`}></i>
                  <div className="text-left">
                    <div className="text-xs text-gray-500">{getCategorySubtitle(category, index)}</div>
                    <div className="font-medium">{category}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div key={item?.item_id || index} className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center transition duration-300 hover:shadow-md">
              <img 
                src={item?.item_image ? `http://localhost:5000/${item.item_image}` : `/img/menu-${index + 1}.jpg`} 
                alt={item?.item_name || `Menu item ${index + 1}`} 
                className="w-full sm:w-20 sm:h-20 rounded-lg object-cover mb-4 sm:mb-0 sm:mr-4"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
                  <h3 className="font-medium">{item?.item_name || "Food Item"}</h3>
                  <span className="text-amber-500 font-medium">₹{item?.item_price || 115}</span>
                </div>
                <p className="text-sm text-gray-500 italic">{item?.item_description || "Delicious food description"}</p>
                <button 
                  onClick={() => addToCart(item)}
                  className="mt-2 bg-amber-500 hover:bg-amber-600 text-white font-medium py-1 px-3 rounded text-sm transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No items found.</p>
            </div>
          )}
        </div>

        {/* Cart Button */}
        {cartCount > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <button 
              onClick={goToCheckout}
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-full shadow-lg transition duration-300 flex items-center"
            >
              <i className="fa fa-shopping-cart mr-2"></i>
              Cart ({cartCount})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
