import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/server/routes/auth.ts";
import productRoutes from "./src/server/routes/products.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/products", productRoutes);

  app.post("/api/create-checkout-session", async (req, res) => {
    const { items } = req.body;
    // In a real app, you'd verify prices from the DB
    res.json({ url: "/checkout-success" }); // Mocking Stripe session URL
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Example API route for perfumes
  app.get("/api/products", (req, res) => {
    // This will eventually fetch from DB
    res.json([
      { id: 1, name: "Mystic Oud", price: 250, category: "Luxury", image: "https://images.unsplash.com/photo-1541604193435-2258789947e8?auto=format&fit=crop&q=80&w=600" },
      { id: 2, name: "Golden Amber", price: 180, category: "Premium", image: "https://images.unsplash.com/photo-1594035910387-fea47734265f?auto=format&fit=crop&q=80&w=600" }
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
