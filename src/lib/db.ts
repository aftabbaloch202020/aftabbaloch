import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database('aurascents.db');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category TEXT,
    image_url TEXT,
    stock INTEGER DEFAULT 0,
    top_notes TEXT,
    heart_notes TEXT,
    base_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    total_amount REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    shipping_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

// Seed initial products if empty
const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
if (productCount.count === 0) {
  const insertProduct = db.prepare(`
    INSERT INTO products (id, name, description, price, category, image_url, stock, top_notes, heart_notes, base_notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const initialProducts = [
    {
      id: '1',
      name: 'Elysian Gold',
      description: 'A divine blend of saffron, jasmine, and amberwood. Radiating sophistication and warmth.',
      price: 320,
      category: 'Parfum',
      image_url: 'https://images.unsplash.com/photo-1541604193435-2258789947e8?auto=format&fit=crop&q=80&w=800',
      stock: 50,
      top_notes: 'Saffron, Jasmine',
      heart_notes: 'Amberwood, Ambergris',
      base_notes: 'Fir Resin, Cedar'
    },
    {
      id: '2',
      name: 'Midnight Oud',
      description: 'Deep, mysterious, and intensely masculine. Notes of rare oud combined with spicy cardamom.',
      price: 450,
      category: 'Extrait de Parfum',
      image_url: 'https://images.unsplash.com/photo-1594035910387-fea47734265f?auto=format&fit=crop&q=80&w=800',
      stock: 30,
      top_notes: 'Cardamom, Rosewood',
      heart_notes: 'Sandalwood, Sichuan Pepper',
      base_notes: 'Oud, Vetiver, Tonka Bean'
    },
    {
      id: '3',
      name: 'Rose Noir',
      description: 'A seductive dark rose mystery. Elegant floral notes meeting earthy patchouli.',
      price: 280,
      category: 'Eau de Parfum',
      image_url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
      stock: 45,
      top_notes: 'Pink Pepper, Bergamot',
      heart_notes: 'Damask Rose, Patchouli',
      base_notes: 'Musk, Amber'
    },
    {
      id: '4',
      name: 'Azure Bloom',
      description: 'A breath of fresh Mediterranean air. Citrus notes meeting celestial white florals.',
      price: 240,
      category: 'Eau de Toilette',
      image_url: 'https://images.unsplash.com/photo-1512568433530-5531a997970c?auto=format&fit=crop&q=80&w=800',
      stock: 60,
      top_notes: 'Lemon, Neroli',
      heart_notes: 'Sea Salt, Jasmine',
      base_notes: 'White Musk, Driftwood'
    },
    {
      id: '5',
      name: 'Emerald Forest',
      description: 'The scent of a rain-drenched ancient woodland. Rare resins and crushed pine needles.',
      price: 380,
      category: 'Extrait de Parfum',
      image_url: 'https://images.unsplash.com/photo-1595428774223-ef04a127a271?auto=format&fit=crop&q=80&w=800',
      stock: 25,
      top_notes: 'Pine, Bergamot',
      heart_notes: 'Galbanum, Iris',
      base_notes: 'Oakmoss, Patchouli, Benzoin'
    },
    {
      id: '6',
      name: 'Velvet Spice',
      description: 'Warm, opulent, and dangerously inviting. A spicy oriental masterpiece.',
      price: 410,
      category: 'Parfum',
      image_url: 'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800',
      stock: 35,
      top_notes: 'Cinnamon, Ginger',
      heart_notes: 'Tobacco, Honey',
      base_notes: 'Vanilla, Tonka Bean, Cacao'
    }
  ];

  initialProducts.forEach(p => {
    insertProduct.run(p.id, p.name, p.description, p.price, p.category, p.image_url, p.stock, p.top_notes, p.heart_notes, p.base_notes);
  });
}

export default db;
