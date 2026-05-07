import React from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center px-6">
        <ShoppingBag size={64} className="text-neutral-700 mb-8" />
        <h2 className="text-4xl font-serif mb-4">Your collection is empty</h2>
        <p className="text-neutral-500 mb-10">Discover your next signature scent in our shop.</p>
        <Link to="/shop" className="px-10 py-4 bg-gold-600 text-black font-bold uppercase tracking-widest rounded-sm">
          Browse Shop
        </Link>
      </div>
    );
  }

  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout failed');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 max-w-7xl mx-auto px-6">
      <h1 className="text-5xl font-serif mb-12">Your Selection</h1>
      
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-6 p-6 glass rounded-sm"
              >
                <div className="w-24 h-32 flex-shrink-0 rounded-sm overflow-hidden">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-neutral-500 hover:text-red-400 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-gold-400 font-mono mb-4">${item.price}</p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-white/10 rounded-sm bg-black/20">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:text-gold-400"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:text-gold-400"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <div className="glass p-8 rounded-sm sticky top-32">
            <h3 className="text-xl font-serif mb-8 border-b border-white/10 pb-4">Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="font-mono text-white">${totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Shipping</span>
                <span className="text-white uppercase tracking-tighter text-xs">Complimentary</span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between font-bold">
                <span className="uppercase tracking-widest text-sm">Total</span>
                <span className="text-gold-400 text-xl font-mono">${totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full py-4 bg-gold-600 hover:bg-gold-500 text-black font-bold uppercase tracking-widest rounded-sm flex items-center justify-center space-x-2 transition-all"
            >
              <span>Secure Checkout</span>
              <ArrowRight size={18} />
            </button>
            <p className="text-[10px] text-center text-neutral-500 mt-6 uppercase tracking-widest">
              Secure payments powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
