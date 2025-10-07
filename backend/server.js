import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// API routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Get current file/dir (for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve React App in ALL environments
const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');

// Serve static files from React build
app.use(express.static(frontendPath));

// Handle SPA routing - serve index.html for all unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
🚀 Server running on port ${PORT}
📱 React app served from backend
📍 Visit: http://localhost:${PORT}
  `.yellow.bold);
});