import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function OrderHistory() {
  const [orders, setOrders] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      navigate('/login')
      return
    }

    const parsedUser = JSON.parse(storedUser)
    setUser(parsedUser)
    fetchOrders(parsedUser.email)
  }, [navigate])

  const fetchOrders = async (email) => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:3001/api/orders/${email}`)
      if (response.ok) {
        const data = await response.json()
        console.log('User orders:', data)
        setOrders(data)
      }
    } catch (error) {
      console.error('Fetch error:', error)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="orders-container">
        <div className="orders-header">
          <Link to="/" className="back-link">← Vissza</Link>
          <h1>Rendeléseim</h1>
        </div>
        <p>Betöltés...</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="orders-container">
      <div className="orders-header">
        <Link to="/" className="back-link">← Vissza</Link>
        <h1>Rendeléseim</h1>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <p>Nincs még rendelésed.</p>
          <Link to="/" className="btn-primary">
            Vissza a termékekhez
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Rendelés #{order.id}</h3>
                  <p className="order-date">
                    {new Date(order.timestamp).toLocaleDateString('hu-HU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="order-total">
                  <span className="total-label">Összesen:</span>
                  <span className="total-amount">{order.total} Ft</span>
                </div>
              </div>

              <div className="order-details">
                <div className="detail-section">
                  <h4>Szállítási adatok</h4>
                  <p><strong>{order.name}</strong></p>
                  <p>{order.address}</p>
                  <p>{order.zip} {order.city}</p>
                  <p>Tel: {order.phone}</p>
                </div>

                <div className="detail-section">
                  <h4>Szállítási mód</h4>
                  <p>
                    {order.shipping === 'csomagpont'
                      ? `Csomagpont: ${order.pickup}`
                      : 'Otthonhoz szállítás'}
                  </p>
                </div>

                <div className="detail-section">
                  <h4>Fizetési mód</h4>
                  <p>
                    {order.payment === 'cod'
                      ? 'Utánvét'
                      : order.payment === 'card'
                      ? 'Bankkártya'
                      : 'Bank átutalás'}
                  </p>
                </div>
              </div>

              <div className="order-items">
                <h4>Megrendelt termékek:</h4>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Termék</th>
                      <th>Ár</th>
                      <th>Mennyiség</th>
                      <th>Összesen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cart && order.cart.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.price} Ft</td>
                        <td>{item.qty}</td>
                        <td>{item.price * item.qty} Ft</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .orders-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          color: #333;
        }

        .orders-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 30px;
        }

        .back-link {
          padding: 8px 16px;
          background: #f0f0f0;
          border-radius: 4px;
          text-decoration: none;
          color: #333;
          transition: background 0.2s;
        }

        .back-link:hover {
          background: #e0e0e0;
        }

        .orders-header h1 {
          margin: 0;
          font-size: 24px;
        }

        .orders-empty {
          text-align: center;
          padding: 40px;
          background: #f9f9f9;
          border-radius: 8px;
        }

        .orders-empty p {
          font-size: 16px;
          margin-bottom: 20px;
        }

        .btn-primary {
          display: inline-block;
          padding: 12px 24px;
          background: #2d7ef7;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .btn-primary:hover {
          background: #1d5fd7;
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .order-card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
        }

        .order-header h3 {
          margin: 0;
          font-size: 18px;
        }

        .order-date {
          margin: 5px 0 0 0;
          color: #666;
          font-size: 14px;
        }

        .order-total {
          text-align: right;
        }

        .total-label {
          display: block;
          color: #666;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .total-amount {
          display: block;
          font-size: 24px;
          font-weight: bold;
          color: #2d7ef7;
        }

        .order-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .detail-section h4 {
          margin: 0 0 10px 0;
          font-size: 14px;
          color: #666;
          text-transform: uppercase;
        }

        .detail-section p {
          margin: 5px 0;
          font-size: 14px;
        }

        .order-items {
          margin-top: 20px;
        }

        .order-items h4 {
          margin: 0 0 15px 0;
          font-size: 16px;
        }

        .items-table {
          width: 100%;
          border-collapse: collapse;
        }

        .items-table thead {
          background: #f9f9f9;
        }

        .items-table th,
        .items-table td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #eee;
          font-size: 14px;
        }

        .items-table th {
          font-weight: bold;
          color: #333;
        }

        .items-table tr:hover {
          background: #fafafa;
        }

        @media (max-width: 600px) {
          .order-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .order-total {
            text-align: left;
            margin-top: 10px;
          }

          .order-details {
            grid-template-columns: 1fr;
          }

          .items-table {
            font-size: 12px;
          }

          .items-table th,
          .items-table td {
            padding: 8px;
          }
        }
      `}</style>
    </div>
  )
}
