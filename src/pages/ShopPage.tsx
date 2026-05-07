import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(products.map((p: any) => p.category))];

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <div>
          <h1 className="text-6xl font-serif mb-4">L'Atelier</h1>
          <p className="text-neutral-500 font-light text-lg">Curated fragrances for the bold and the beautiful.</p>
        </div>
        
        <div className="flex w-full md:w-auto items-center space-x-4">
          <div className="relative flex-grow md:w-64">
            <input 
              type="text" 
              placeholder="Search scents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-10 focus:border-gold-400 outline-none transition-colors"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          </div>
          <select 
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-sm py-3 px-4 focus:border-gold-400 outline-none transition-colors text-sm uppercase tracking-widest"
          >
            {categories.map(c => <option key={c} value={c} className="bg-neutral-900">{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        <AnimatePresence>
          {filteredProducts.map((p: any, idx) => (
            <motion.div 
              key={p.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group"
            >
              <div className="relative aspect-[4/5] glass rounded-sm overflow-hidden mb-6">
                 <Link to={`/product/${p.id}`}>
                   <img src={p.image_url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                 </Link>
                 <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-all duration-300 z-10">
                   <div className="flex space-x-3">
                     <button 
                       onClick={() => addToCart(p)}
                       className="flex-grow py-4 bg-gold-600 text-black font-bold uppercase tracking-widest text-xs hover:bg-gold-500 transition-colors"
                     >
                       Add to Collection
                     </button>
                     <Link to={`/product/${p.id}`} className="p-4 bg-white/10 hover:bg-white/20 transition-colors rounded-sm">
                       <Eye size={18} />
                     </Link>
                   </div>
                 </div>
                 <div className="absolute top-4 left-4">
                   <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-[0.2em]">{p.category}</span>
                 </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-serif mb-1">{p.name}</h3>
                  <p className="text-neutral-500 text-xs uppercase tracking-widest">Master Brand</p>
                </div>
                <p className="text-gold-400 font-mono text-lg">${p.price}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-neutral-500 font-serif italic text-2xl">No fragrances found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
