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
    res.json({ 
      success: true, 
      user: { 
        email: user.email, 
        loggedIn: true,
        role: user.role || 'user',
        isAdmin: user.role === 'admin'
      } 
    });
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
    const newUser = { email, birthDate, password, role: 'user' };
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

// ADMIN ENDPOINTS

// Check if user is admin
const isAdmin = (email) => {
  const user = users.find(u => u.email === email);
  return user && user.role === 'admin';
};

// Get all users (admin only)
app.get('/api/admin/users', (req, res) => {
  const { email } = req.query;
  if (!isAdmin(email)) {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }
  res.json(users.map(u => ({ email: u.email, birthDate: u.birthDate, role: u.role })));
});

// Get all orders (admin only)
app.get('/api/admin/orders', (req, res) => {
  const { email } = req.query;
  console.log('Admin orders request from:', email);
  console.log('Current users:', users.map(u => ({ email: u.email, role: u.role })));
  console.log('Is admin?', isAdmin(email));
  
  if (!isAdmin(email)) {
    console.log('Access denied for:', email);
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }
  console.log('Returning orders:', orders.length, 'orders');
  res.json(orders);
});

// Update user role (admin only)
app.post('/api/admin/users/role', (req, res) => {
  const { adminEmail, targetEmail, newRole } = req.body;
  if (!isAdmin(adminEmail)) {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }
  const user = users.find(u => u.email === targetEmail);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  user.role = newRole;
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json({ success: true, message: `User role updated to ${newRole}` });
});

// Delete user (admin only)
app.post('/api/admin/users/delete', (req, res) => {
  const { adminEmail, targetEmail } = req.body;
  if (!isAdmin(adminEmail)) {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }
  const index = users.findIndex(u => u.email === targetEmail);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  users.splice(index, 1);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json({ success: true, message: 'User deleted' });
});

// Delete order (admin only)
app.post('/api/admin/orders/delete', (req, res) => {
  const { adminEmail, orderId } = req.body;
  if (!isAdmin(adminEmail)) {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }
  const index = orders.findIndex(o => o.id == orderId);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  orders.splice(index, 1);
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
  res.json({ success: true, message: 'Order deleted' });
});

// Create admin account (only if no admins exist)
app.post('/api/admin/create-first-admin', (req, res) => {
  const { email, birthDate, password } = req.body;
  if (users.some(u => u.role === 'admin')) {
    return res.status(403).json({ success: false, message: 'Admin already exists' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }
  const newAdmin = { email, birthDate, password, role: 'admin' };
  users.push(newAdmin);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json({ success: true, message: 'Admin account created' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;