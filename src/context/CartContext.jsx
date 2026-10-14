import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'shopease_cart';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to retrieve cart from localStorage:', error);
      return [];
    }
  });

  // Toast feedback state for quick cart addition notifications
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cartItems]);

  // Show a temporary toast banner
  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  /**
   * Add a product to the cart. If it already exists, increase the quantity.
   */
  const addToCart = (product, quantity = 1) => {
    const validQty = Math.max(1, parseInt(quantity, 10) || 1);
    
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);
      
      if (existingItemIndex > -1) {
        const updated = [...prevItems];
        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: updated[existingItemIndex].quantity + validQty,
        };
        return updated;
      }

      return [
        ...prevItems,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: validQty,
        },
      ];
    });

    triggerToast(`Added "${product.title.slice(0, 24)}..." to cart!`);
  };

  /**
   * Update the quantity of a specific item in the cart
   */
  const updateQuantity = (productId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  /**
   * Remove a product from the cart completely
   */
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    triggerToast('Item removed from cart.');
  };

  /**
   * Clear all items from the cart
   */
  const clearCart = () => {
    setCartItems([]);
  };

  // Compute total number of items
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Compute subtotal price
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Shipping calculation: Free over $50, else $5
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.0;

  // Estimated tax (5%)
  const tax = subtotal * 0.05;

  // Grand total
  const totalPrice = subtotal + shipping + tax;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        subtotal,
        shipping,
        tax,
        totalPrice,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
