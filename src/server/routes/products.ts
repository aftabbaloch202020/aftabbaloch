import express from 'express';
import db from '../../lib/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products').all();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Admin routes (simplified for now)
router.post('/', (req, res) => {
  const { id, name, description, price, category, image_url, stock, top_notes, heart_notes, base_notes } = req.body;
  try {
    db.prepare(`
      INSERT INTO products (id, name, description, price, category, image_url, stock, top_notes, heart_notes, base_notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, name, description, price, category, image_url, stock, top_notes, heart_notes, base_notes);
    res.status(201).json({ message: 'Product created' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

export default router;
