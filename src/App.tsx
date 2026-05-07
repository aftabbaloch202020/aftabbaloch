import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, User, Search, Menu, X, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';

// Components (Defined here for brevity or imported)
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif tracking-widest gold-gradient font-bold">AURASCENTS</Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-gold-400 transition-colors">Shop</Link>
          <Link to="/collections" className="hover:text-gold-400 transition-colors">Collections</Link>
          <Link to="/about" className="hover:text-gold-400 transition-colors">House</Link>
        </div>

        <div className="flex items-center space-x-5">
          <button className="hover:text-gold-400"><Search size={20} /></button>
          <Link to="/cart" className="relative group">
            <ShoppingCart size={20} className="group-hover:text-gold-400" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center space-x-3">
              <Link to="/profile"><User size={20} /></Link>
              <button onClick={logout} className="text-xs uppercase tracking-tighter opacity-70 hover:opacity-100">Logout</button>
            </div>
          ) : (
            <Link to="/login"><User size={20} /></Link>
          )}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="flex flex-col p-6 space-y-4">
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
              <Link to="/collections" onClick={() => setIsOpen(false)}>Collections</Link>
              <Link to="/login" onClick={() => setIsOpen(false)}>Account</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-neutral-900 border-t border-white/5 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
      <div className="col-span-2">
        <h3 className="text-2xl font-serif gold-gradient mb-6">AURASCENTS</h3>
        <p className="text-neutral-400 max-w-md leading-relaxed">
          Crafting olfactory masterpieces since 1924. We believe a scent is more than a perfume; it's a legacy, a memory, and a statement of presence.
        </p>
      </div>
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Discover</h4>
        <ul className="space-y-3 text-neutral-400 text-sm">
          <li><Link to="/shop">Best Sellers</Link></li>
          <li><Link to="/shop">New Arrivals</Link></li>
          <li><Link to="/collections">Privé Collection</Link></li>
          <li><Link to="/about">Our Story</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Support</h4>
        <ul className="space-y-3 text-neutral-400 text-sm">
          <li><Link to="/faq">Shipping & Returns</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/5 flex flex-col md:row justify-between items-center text-xs text-neutral-500 uppercase tracking-tighter">
      <p>&copy; 2026 AuraScents International. All rights reserved.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <span>Instagram</span>
        <span>Facebook</span>
        <span>Twitter</span>
      </div>
    </div>
  </footer>
);

// Placeholder Pages
const HomePage = () => (
  <div className="relative pt-20">
    {/* Hero Section */}
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1620843440788-b203c208945f?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover opacity-50 contrast-125"
          alt="Luxury perfume backdrop"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center space-x-2 text-gold-400 text-xs font-bold tracking-[0.3em] uppercase mb-6">
            <Sparkles size={14} /> <span>The 2026 Collection</span>
          </span>
          <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-tight">
            Elegance <br />
            <span className="italic font-normal">Reimagined</span>
          </h1>
          <p className="text-xl text-neutral-300 mb-10 leading-relaxed font-light">
            Experience the essence of artisanal craftsmanship. Rare ingredients carefully selected to tell your unique story.
          </p>
          <div className="flex space-x-6">
            <Link to="/shop" className="px-10 py-4 bg-gold-600 hover:bg-gold-500 text-black font-bold uppercase tracking-widest transition-all rounded-sm">
              Discover Shop
            </Link>
            <Link to="/collections" className="px-10 py-4 border border-white/20 hover:border-gold-400 hover:text-gold-400 uppercase tracking-widest transition-all rounded-sm backdrop-blur-sm">
              Private Lounge
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Featured Products */}
    <section className="py-32 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-serif mb-4">Curated Selections</h2>
            <p className="text-neutral-500">Our currently trending olfactory signatures.</p>
          </div>
          <Link to="/shop" className="text-gold-400 uppercase tracking-widest text-sm font-bold border-b border-gold-400 pb-1">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { id: '1', name: 'Elysian Gold', category: 'Parfum', price: 320, image: 'https://images.unsplash.com/photo-1541604193435-2258789947e8?auto=format&fit=crop&q=80&w=600' },
            { id: '2', name: 'Midnight Oud', category: 'Extrait', price: 450, image: 'https://images.unsplash.com/photo-1594035910387-fea47734265f?auto=format&fit=crop&q=80&w=600' },
            { id: '5', name: 'Emerald Forest', category: 'Extrait', price: 380, image: 'https://images.unsplash.com/photo-1595428774223-ef04a127a271?auto=format&fit=crop&q=80&w=600' },
            { id: '6', name: 'Velvet Spice', category: 'Parfum', price: 410, image: 'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=600' },
          ].map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden mb-6 aspect-[4/5] glass rounded-sm">
                <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                <Link to={`/product/${item.id}`} className="absolute bottom-6 left-6 right-6 py-3 bg-white text-black font-bold uppercase tracking-widest translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-center text-xs">
                  Discover
                </Link>
                {idx === 2 && (
                  <div className="absolute top-4 right-4 bg-gold-600 text-black text-[9px] font-bold px-3 py-1 uppercase tracking-widest">Limited</div>
                )}
              </div>
              <h3 className="text-xl font-serif mb-1">{item.name}</h3>
              <p className="text-neutral-500 text-xs uppercase tracking-widest mb-3">{item.category}</p>
              <p className="text-gold-400 font-mono">${item.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Promotion Banner */}
    <section className="relative h-[60vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1615467677701-d07b30f5572e?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover grayscale opacity-40"
          alt="Privé collection banner"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <h2 className="text-5xl font-serif mb-6">The House <br /><span className="italic">Privé Collection</span></h2>
          <p className="text-neutral-400 mb-8 leading-relaxed">
            Reserved for our most discerning patrons. Access exclusive releases and one-of-a-kind olfactory experiences.
          </p>
          <Link to="/collections" className="inline-flex items-center space-x-4 group text-gold-400 font-bold uppercase tracking-[0.2em] text-sm">
            <span>Explore Privé</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>

    {/* Story Block */}
    <section className="py-32 bg-neutral-900 border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight italic">
          "Perfume is the most intense form of memory."
        </h2>
        <div className="w-20 h-0.5 bg-gold-400 mx-auto mb-10" />
        <p className="text-xl text-neutral-400 leading-loose font-light">
          Founded in the heart of Gras, we continue the legacy of traditional French perfumery. Every bottle is a testament to our commitment to excellence, using only the finest natural essences from around the world.
        </p>
      </div>
    </section>

    {/* Ingredients Section */}
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-[3/4] glass p-1">
            <img 
              src="https://images.unsplash.com/photo-1616948648211-0969543a2152?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover"
              alt="Artisanal ingredients"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -right-10 w-64 h-80 hidden lg:block border border-gold-400/30 p-1 bg-black">
               <img 
                src="https://images.unsplash.com/photo-1595428774785-5c4e7da71428?auto=format&fit=crop&q=80&w=600" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                alt="Rose petals"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="space-y-8">
            <span className="text-gold-400 text-xs font-bold uppercase tracking-[0.4em]">The Alchemy</span>
            <h2 className="text-5xl font-serif leading-tight">Beyond the <br /><span className="italic">Fragrance</span></h2>
            <p className="text-neutral-400 leading-relaxed text-lg font-light">
              We source our ingredients from their biological origin. Jasmine from Grasse, Sandalwood from Mysore, and Vanilla from Madagascar. Our master perfumers spend years perfecting a single accord, ensuring that every note resonates with absolute purity.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <h4 className="text-gold-400 text-sm font-bold uppercase tracking-widest mb-2">Sustainable</h4>
                <p className="text-neutral-500 text-sm">Ethically sourced raw materials from local farmers.</p>
              </div>
              <div>
                <h4 className="text-gold-400 text-sm font-bold uppercase tracking-widest mb-2">Artisanal</h4>
                <p className="text-neutral-500 text-sm">Small batch distillation for maximum potency.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

import LoginPage from './pages/LoginPage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';

// Simple Page placeholders for others
const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <div className="pt-40 pb-20 max-w-2xl mx-auto px-6 text-center">
      <h1 className="text-4xl font-serif mb-6">Welcome, {user?.name}</h1>
      <div className="glass p-8 rounded-sm space-y-4 text-left">
        <p className="text-neutral-400 capitalize">Role: {user?.role}</p>
        <p className="text-neutral-400">Email: {user?.email}</p>
        <div className="pt-4 border-t border-white/10">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Recent Orders</h3>
          <p className="text-neutral-500 italic">No orders found yet.</p>
        </div>
      </div>
    </div>
  );
};

// ... existing components ...

import { useEffect as useAppEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useAppEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const CheckoutSuccess = () => (
  <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center px-6">
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mb-8"
    >
      <Sparkles size={40} className="text-black" />
    </motion.div>
    <h1 className="text-5xl font-serif mb-4">Payment Successful</h1>
    <p className="text-neutral-500 mb-10 text-center max-w-md">
      Thank you for your acquisition. Your signature scent is being prepared for shipment from our atelier in Grasse.
    </p>
    <Link to="/" className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-sm">
      Return Home
    </Link>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col font-sans">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/checkout-success" element={<CheckoutSuccess />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}


