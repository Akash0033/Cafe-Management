import { useState, useEffect } from 'react';

const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    // Setup event listener for storage changes (when another component updates the cart)
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        setCart(JSON.parse(e.newValue || '[]'));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    const handleCartUpdate = (e) => {
      setCart(JSON.parse(e.detail || '[]'));
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Add item to cart
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.item_id === item.item_id);
      let newCart;
      
      if (existingItem) {
        newCart = prevCart.map(cartItem => 
          cartItem.item_id === item.item_id 
            ? {...cartItem, quantity: cartItem.quantity + 1} 
            : cartItem
        );
      } else {
        newCart = [...prevCart, {...item, quantity: 1}];
      }
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(newCart));
      
      // Dispatch custom event for other components on the same tab
      const event = new CustomEvent('cartUpdated', { detail: JSON.stringify(newCart) });
      window.dispatchEvent(event);
      
      return newCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.item_id !== itemId);
      localStorage.setItem('cart', JSON.stringify(newCart));
      
      // Dispatch custom event
      const event = new CustomEvent('cartUpdated', { detail: JSON.stringify(newCart) });
      window.dispatchEvent(event);
      
      return newCart;
    });
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prevCart => {
      const newCart = prevCart.map(item => 
        item.item_id === itemId ? {...item, quantity} : item
      );
      localStorage.setItem('cart', JSON.stringify(newCart));
      
      // Dispatch custom event
      const event = new CustomEvent('cartUpdated', { detail: JSON.stringify(newCart) });
      window.dispatchEvent(event);
      
      return newCart;
    });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: cart.reduce((sum, item) => sum + (item.item_price * item.quantity), 0)
  };
};

export default useCart;