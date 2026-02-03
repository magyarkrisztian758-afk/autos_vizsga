import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory storage for demo (in production, use database)
let users = [];
let orders = [];

// Load data from files if exist
const usersFile = path.join(__dirname, 'data', 'users.json');
const ordersFile = path.join(__dirname, 'data', 'orders.json');

if (fs.existsSync(usersFile)) {
  users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
}
if (fs.existsSync(ordersFile)) {
  orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('/api/data', (req, res) => {
  // Szolgáld ki a data.json-t
  res.sendFile(path.join(__dirname, 'public', 'DATA', 'data.json'));
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, user: { email: user.email, loggedIn: true } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Register endpoint
app.post('/api/register', (req, res) => {
  const { email, birthDate, password } = req.body;
  if (users.find(u => u.email === email)) {
    res.status(400).json({ success: false, message: 'User already exists' });
  } else {
    const newUser = { email, birthDate, password };
    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    res.json({ success: true, message: 'Registration successful' });
  }
});

// Order endpoint
app.post('/api/order', (req, res) => {
  const orderData = req.body;
  const newOrder = { id: Date.now(), ...orderData, timestamp: new Date().toISOString() };
  orders.push(newOrder);
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
  res.json({ success: true, orderId: newOrder.id });
});

// Get user orders
app.get('/api/orders/:email', (req, res) => {
  const userOrders = orders.filter(o => o.email === req.params.email);
  res.json(userOrders);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;