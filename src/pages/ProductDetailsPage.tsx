import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { ShoppingCart, Star, Share2, Heart, ArrowLeft, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  top_notes: string;
  heart_notes: string;
  base_notes: string;
}

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found.</div>;

  const notes = {
    top: product.top_notes?.split(',').map(n => n.trim()) || [],
    heart: product.heart_notes?.split(',').map(n => n.trim()) || [],
    base: product.base_notes?.split(',').map(n => n.trim()) || []
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <Link to="/shop" className="inline-flex items-center space-x-2 text-neutral-500 hover:text-gold-400 mb-12 transition-colors">
        <ArrowLeft size={16} />
        <span className="text-xs uppercase tracking-widest font-bold">Back to Atelier</span>
      </Link>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Images */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="aspect-[4/5] glass rounded-sm overflow-hidden p-10">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {[1,2,3,4].map(n => (
               <div key={n} className="aspect-square glass rounded-sm opacity-50 hover:opacity-100 cursor-pointer transition-opacity overflow-hidden">
                 <img src={product.image_url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
               </div>
             ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gold-400 text-xs font-bold uppercase tracking-[0.3em]">{product.category}</span>
              <div className="flex items-center space-x-1 text-gold-400">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <span className="text-neutral-500 text-[10px] ml-2">(48 Reviews)</span>
              </div>
            </div>
            <h1 className="text-5xl font-serif mb-6">{product.name}</h1>
            <p className="text-3xl font-mono gold-gradient font-bold mb-8">${product.price}</p>
            <p className="text-neutral-400 leading-relaxed text-lg font-light mb-10">
              {product.description}
            </p>
          </div>

          {/* Olfactory Pyramide */}
          <div className="glass p-8 rounded-sm mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Olfactory Pyramide</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <dt className="text-[10px] text-neutral-500 uppercase tracking-tighter mb-2">Top Notes</dt>
                {notes.top.map(n => <dd key={n} className="text-sm font-serif italic text-neutral-300">{n}</dd>)}
              </div>
              <div>
                <dt className="text-[10px] text-neutral-500 uppercase tracking-tighter mb-2">Heart Notes</dt>
                {notes.heart.map(n => <dd key={n} className="text-sm font-serif italic text-neutral-300">{n}</dd>)}
              </div>
              <div>
                <dt className="text-[10px] text-neutral-500 uppercase tracking-tighter mb-2">Base Notes</dt>
                {notes.base.map(n => <dd key={n} className="text-sm font-serif italic text-neutral-300">{n}</dd>)}
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mb-10">
            <button 
              onClick={() => addToCart(product)}
              className="flex-grow py-5 bg-gold-600 hover:bg-gold-500 text-black font-bold uppercase tracking-widest rounded-sm flex items-center justify-center space-x-3 transition-all"
            >
              <ShoppingCart size={20} />
              <span>Add to Collection</span>
            </button>
            <button className="p-5 border border-white/10 hover:border-gold-400 hover:text-gold-400 transition-all rounded-sm">
              <Heart size={20} />
            </button>
            <button className="p-5 border border-white/10 hover:border-gold-400 hover:text-gold-400 transition-all rounded-sm">
              <Share2 size={20} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center py-6 border-t border-white/5">
            <div className="space-y-1">
              <ShieldCheck size={20} className="mx-auto text-gold-400" />
              <p className="text-[9px] uppercase tracking-tighter text-neutral-500">Secure Payment</p>
            </div>
            <div className="space-y-1">
              <Truck size={20} className="mx-auto text-gold-400" />
              <p className="text-[9px] uppercase tracking-tighter text-neutral-500">Global Shipping</p>
            </div>
            <div className="space-y-1">
              <RefreshCcw size={20} className="mx-auto text-gold-400" />
              <p className="text-[9px] uppercase tracking-tighter text-neutral-500">Free Returns</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
