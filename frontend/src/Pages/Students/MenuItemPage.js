import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../../Components/LogoutButton';
import StuAddOrEdit from '../../Components/StuAddOrEdit';

const MenuItemPage = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/item/items-by-category');
        const allItems = Object.values(response.data).flat();
        setItems(allItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.item_id === item.item_id);
      let newCart;

      if (existingItem) {
        newCart = prevCart.map(cartItem =>
          cartItem.item_id === item.item_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        newCart = [...prevCart, { ...item, quantity: 1 }];
      }

      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const goToCheckout = () => {
    navigate('/Students/CheckoutPage');
  };

  const filteredItems = searchTerm.trim()
    ? items.filter(item =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : items;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <i className="fa fa-utensils text-2xl text-amber-500 mr-2"></i>
              <h1 className="text-2xl font-bold text-white">CanteenKart</h1>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <a href="/Students/Home" className="font-medium hover:text-amber-400 border-b-2 border-amber-500">Home</a>
              <a href="/Students/About" className="font-medium hover:text-amber-400">About</a>
              <a href="/Students/MenuItemPage" className="font-medium hover:text-amber-400">Items</a>
              <a href="/Students/CheckoutPage" className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded">Check Out</a>
              <LogoutButton className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded" />
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                <i className={`fa fa-${isMenuOpen ? 'times' : 'bars'} text-xl`}></i>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden bg-gray-800 pb-4">
              <div className="flex flex-col space-y-2 px-4">
                <a href="/Students/Home" className="font-medium py-2 border-b border-gray-700">Home</a>
                <a href="/Students/About" className="font-medium py-2 border-b border-gray-700">About</a>
                <a href="/Students/MenuItemPage" className="font-medium py-2 border-b border-gray-700">Menu</a>
                <div className="flex space-x-2 pt-2">
                  <LogoutButton className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded flex-1 text-center" />
                  <StuAddOrEdit isAutoAdd={false} />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 px-4 md:px-6 lg:px-12 mb-10 md:mb-0">
              <input
                className="mb-6 w-full bg-transparent border rounded-3xl pl-4 h-10"
                type="text"
                placeholder="Search Items"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <h1 className="text-4xl text-white sm:text-5xl font-bold mb-4 leading-tight">
                Enjoy Our<br />Delicious Meal
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                Discover the taste of authentic cuisine. Indulge in our carefully crafted menu, featuring a variety of dishes made with the freshest ingredients.
              </p>
              <div className="flex space-x-4">
                <a href="/Students/MenuItemPage" className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-full shadow-lg transition duration-300 flex items-center">
                  View All Items
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center px-4">
              <img
                src="/img/hero.png"
                alt="Delicious Meal"
                className="rounded-lg w-full max-w-md md:max-w-sm lg:max-w-lg h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h5 className="text-3xl text-amber-500 mt-4 mb-2">Our Menu</h5>
          <h1 className="text-3xl font-bold">Browse All Items</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.item_id} className="bg-gray-50 rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <img
                  src={`http://localhost:5000/${item.item_image}`}
                  alt={item.item_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
                  <h3 className="font-medium">{item.item_name}</h3>
                  <span className="text-xl text-amber-500 font-bold">₹{item.item_price}</span>
                </div>
                <p className="text-sm text-gray-500 italic mb-4">{item.item_description}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-8">
              No items found matching "<strong>{searchTerm}</strong>"
            </div>
          )}
        </div>
      </div>

      {/* Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={goToCheckout}
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-full shadow-lg transition duration-300 flex items-center"
          >
            <i className="fa fa-shopping-cart mr-2"></i>
            Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </div>
      )}

      {/* Footer can remain unchanged or styled further if needed */}
    </div>
  );
};

export default MenuItemPage;
