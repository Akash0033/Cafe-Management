import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StuAddOrEdit from '../../Components/StuAddOrEdit';
import { Dialog, DialogContent, TextField } from '@mui/material';

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [servingTime, setServingTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addData, setAddData] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.item_id === itemId);
      let newCart;
      
      if (existingItem.quantity > 1) {
        newCart = prevCart.map(cartItem => 
          cartItem.item_id === itemId 
            ? {...cartItem, quantity: cartItem.quantity - 1} 
            : cartItem
        );
      } else {
        newCart = prevCart.filter(cartItem => cartItem.item_id !== itemId);
      }
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  // Add item quantity
  const addItemQuantity = (itemId) => {
    setCart(prevCart => {
      const newCart = prevCart.map(cartItem => 
        cartItem.item_id === itemId 
          ? {...cartItem, quantity: cartItem.quantity + 1} 
          : cartItem
      );
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  // Delete item completely
  const deleteItem = (itemId) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(cartItem => cartItem.item_id !== itemId);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.item_price * item.quantity), 0);
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (!servingTime) {
      alert('Please select a serving time');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Get student ID from localStorage
      const studentId = localStorage.getItem('login_id');
      
      const orderResponse = await axios.post('http://localhost:5000/api/item/create-order', {
        studentId,
        items: cart.map(item => ({
          item_id: item.item_id,
          quantity: item.quantity
        })),
        totalPrice: calculateTotal(),
        servingTime: servingTime
      });

      // Clear cart
      localStorage.removeItem('cart');
      setCart([]);
      setServingTime('');
      setSuccessMessage(`Order placed successfully! Your Token Number is: ${orderResponse.data.tokenNumber}`);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/Students/Home');
      }, 3000);
      
    } catch (error) {
      console.error('Checkout error:', error);
      if (error.response && error.response.data && error.response.data.error) {

        if (error.response.data.error == 'Student data does not exist') {
          setAddData(true);
          alert('Student data does not exist... Add Now');
        } else {
          alert(`Order failed: ${error.response.data.error}`);
        }

      } else {
        alert('Failed to place order due to a network/server error.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-gray-900 text-white">
            <h1 className="text-2xl text-white font-bold flex items-center">
              <i className="fa fa-shopping-cart mr-3"></i>
              Checkout
            </h1>
          </div>
          
          {successMessage ? (
            <div className="p-6 text-center">
              <div className="text-green-600 text-xl mb-4">
                <i className="fa fa-check-circle text-4xl mb-3"></i>
                <p>{successMessage}</p>
              </div>
              <p className="text-gray-600">Redirecting to menu...</p>
            </div>
          ) : (
            <>
              <div className="p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <i className="fa fa-shopping-cart text-gray-300 text-5xl mb-4"></i>
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    <button 
                      onClick={() => navigate('/Students/Home')}
                      className="mt-6 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded transition duration-300"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-4">Your Order</h2>
                      <div className="border-b border-gray-200 pb-2 mb-2 font-medium grid grid-cols-12 gap-2">
                        <div className="col-span-6">Item</div>
                        <div className="col-span-2 text-center">Price</div>
                        <div className="col-span-2 text-center">Quantity</div>
                        <div className="col-span-2 text-right">Total</div>
                      </div>
                      
                      {cart.map(item => (
                        <div key={item.item_id} className="py-3 border-b border-gray-100 grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-6 flex items-center">
                            <img 
                              src={`http://localhost:5000/${item.item_image}`} 
                              alt={item.item_name}
                              className="w-12 h-12 object-cover rounded mr-3"
                            />
                            <span>{item.item_name}</span>
                          </div>
                          <div className="col-span-2 text-center">₹{item.item_price}</div>
                          <div className="col-span-2 flex items-center justify-center">
                            <button 
                              onClick={() => removeFromCart(item.item_id)}
                              className="text-gray-600 hover:text-gray-800 w-8 h-8 flex items-center justify-center"
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button 
                              onClick={() => addItemQuantity(item.item_id)}
                              className="text-gray-600 hover:text-gray-800 w-8 h-8 flex items-center justify-center"
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                          <div className="col-span-2 flex items-center justify-end">
                            <span className="mr-3">₹{item.item_price * item.quantity}</span>
                            <button 
                              onClick={() => deleteItem(item.item_id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 mb-2 font-medium">Serving Time</label>
                          <input
                            type="time"
                            value={servingTime}
                            onChange={(e) => setServingTime(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            min="10:00"
                            max="17:59"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">Available between 10:00 AM and 6:00 PM</p>
                        </div>
                        <div className="text-right">
                          <h3 className="text-lg font-semibold">Order Summary</h3>
                          <div className="mt-2 text-gray-600">
                            <div className="flex justify-between mb-1">
                              <span>Subtotal</span>
                              <span>₹{calculateTotal()}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-2 mt-2 font-semibold text-lg">
                              <div className="flex justify-between">
                                <span>Total</span>
                                <span>₹{calculateTotal()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="bg-gray-50 p-6 flex items-center justify-between">
                  <button 
                    onClick={() => navigate('/Students/Home')}
                    className="text-amber-500 hover:text-amber-600 font-medium"
                  >
                    <i className="fa fa-arrow-left mr-2"></i>
                    Continue Shopping
                  </button>
                  <button 
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                    className={`bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded transition duration-300 flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : (
                      <>Place Order <i className="fa fa-arrow-right ml-2"></i></>
                    )}
                    {/* ${addData ?  : ''}; */}

                    
                  </button>

                  {addData && (
                      // <Dialog open={true} maxWidth="md" fullWidth>
                      //   <DialogContent>
                      //     <TextField label="Register No."
                      //               fullWidth />
                      //   </DialogContent>
                      // </Dialog>
                      <StuAddOrEdit isAutoAdd={true}/>
                    )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;