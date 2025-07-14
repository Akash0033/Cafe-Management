import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../../Components/LogoutButton';
import StuAddOrEdit from '../../Components/StuAddOrEdit';
import MenuPage from './MenuPage';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const handleStorageChange = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const goToCheckout = () => {
    navigate('/Students/CheckoutPage');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <i className="fa fa-utensils text-2xl text-amber-500 mr-2"></i>
              <h1 className="text-2xl font-bold text-white">CanteenKart</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="/Students/Home" className="font-medium hover:text-amber-400 border-b-2 border-amber-500">Home</a>
              <a href="/Students/About" className="font-medium hover:text-amber-400">About</a>
              <a href="/Students/MenuItemPage" className="font-medium hover:text-amber-400">Items</a>
              <a href="/Students/CheckoutPage" className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded">Check Out</a>
              <LogoutButton className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded" />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                <i className={`fa fa-${isMenuOpen ? 'times' : 'bars'} text-xl`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
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

      {/* Hero Section (Responsive) */}
      <div className="bg-gray-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Text Side */}
            <div className="w-full md:w-1/2 mb-10 md:mb-0 px-4 md:px-6 lg:px-12">
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

            {/* Image Side */}
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

      {/* Food Menu Section (with search filtering) */}
      <MenuPage searchTerm={searchTerm} />

      {/* Services Section (Improved Responsiveness) */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
              <div className="text-amber-500 text-4xl mb-4">
                <i className="fa fa-user-tie"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Master Chefs</h3>
              <p className="text-gray-600">Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
            </div>

            {/* Service 2 */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
              <div className="text-amber-500 text-4xl mb-4">
                <i className="fa fa-utensils"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
              <p className="text-gray-600">Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
            </div>

            {/* Service 3 */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
              <div className="text-amber-500 text-4xl mb-4">
                <i className="fa fa-cart-plus"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Online Order</h3>
              <p className="text-gray-600">Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
            </div>

            {/* Service 4 */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
              <div className="text-amber-500 text-4xl mb-4">
                <i className="fa fa-headset"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Service</h3>
              <p className="text-gray-600">Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
            </div>
          </div>
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

      {/* Footer Section - unchanged */}
      {/* ... Keep your existing footer code as is ... */}
    </div>
  );
};

export default Home;
