import request from 'supertest';
import app from '../server.js'; // Import the app

describe('Backend API Tests', () => {
  test('GET /api - should return hello message', async () => {
    const response = await request(app).get('/api');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Hello from the backend!');
  });

  test('GET /api/data - should return product data', async () => {
    const response = await request(app).get('/api/data');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/register - should register a new user', async () => {
    const userData = {
      email: 'test@example.com',
      birthDate: '1990-01-01',
      password: 'password123'
    };
    const response = await request(app)
      .post('/api/register')
      .send(userData);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('POST /api/login - should login with valid credentials', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    const response = await request(app)
      .post('/api/login')
      .send(loginData);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('POST /api/order - should create an order', async () => {
    const orderData = {
      name: 'Test User',
      email: 'test@example.com',
      cart: [{ id: 1, name: 'Test Product', price: 100, qty: 1 }],
      total: 100
    };
    const response = await request(app)
      .post('/api/order')
      .send(orderData);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('orderId');
  });
});