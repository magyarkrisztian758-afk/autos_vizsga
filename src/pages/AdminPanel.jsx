import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function AdminPanel() {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('users')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      navigate('/login')
      return
    }

    const parsedUser = JSON.parse(storedUser)
    if (parsedUser.role !== 'admin') {
      alert('Hozzáférés megtagadva! Csak adminok mehetnek ide.')
      navigate('/')
      return
    }

    setUser(parsedUser)
    fetchData(parsedUser.email)
  }, [navigate])

  const fetchData = async (email) => {
    setLoading(true)
    console.log('Fetching data for admin:', email)
    try {
      const usersRes = await fetch(`http://localhost:3001/api/admin/users?email=${email}`)
      const ordersRes = await fetch(`http://localhost:3001/api/admin/orders?email=${email}`)

      console.log('Users response:', usersRes.status)
      console.log('Orders response:', ordersRes.status)

      if (usersRes.ok) {
        const usersData = await usersRes.json()
        console.log('Users data:', usersData)
        setUsers(usersData)
      }
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json()
        console.log('Orders data:', ordersData)
        setOrders(ordersData)
      }
    } catch (error) {
      console.error('Fetch error:', error)
    }
    setLoading(false)
  }

  const changeUserRole = async (targetEmail, newRole) => {
    if (!user) return
    try {
      const res = await fetch('http://localhost:3001/api/admin/users/role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminEmail: user.email,
          targetEmail,
          newRole
        })
      })

      if (res.ok) {
        alert('Felhasználó szerepe frissítve!')
        fetchData(user.email)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const deleteUser = async (targetEmail) => {
    if (!window.confirm(`Biztosan törlöd a ${targetEmail} felhasználót?`)) return

    if (!user) return
    try {
      const res = await fetch('http://localhost:3001/api/admin/users/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminEmail: user.email,
          targetEmail
        })
      })

      if (res.ok) {
        alert('Felhasználó törölve!')
        fetchData(user.email)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const deleteOrder = async (orderId) => {
    if (!window.confirm('Biztosan törlöd ezt a rendelést?')) return

    if (!user) return
    try {
      const res = await fetch('http://localhost:3001/api/admin/orders/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminEmail: user.email,
          orderId
        })
      })

      if (res.ok) {
        alert('Rendelés törölve!')
        fetchData(user.email)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) return <div className="admin-panel"><h1>Betöltés...</h1></div>
  if (!user) return null

  const handleLogout = () => {
    if (window.confirm('Biztosan kijelentkezel?')) {
      localStorage.removeItem('user')
      navigate('/login')
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Vezérlőpult</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
          <Link to="/" className="back-home-btn">← Vissza a főoldalra</Link>
          <p>Bejelentkezve: {user.email}</p>
          <button onClick={handleLogout} className="logout-btn">Kijelentkezés</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Felhasználók ({users.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Rendelések ({orders.length})
        </button>
        <button 
          className="tab-btn refresh-btn"
          onClick={() => fetchData(user.email)}
          title="Adatok frissítése"
        >
          🔄 Frissítés
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="admin-content">
          <h2>Felhasználók kezelése</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Születési dátum</th>
                <th>Szerepkör</th>
                <th>Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email}>
                  <td>{u.email}</td>
                  <td>{u.birthDate || '-'}</td>
                  <td>
                    <select
                      value={u.role}
                      onChange={(e) => changeUserRole(u.email, e.target.value)}
                    >
                      <option value="user">Felhasználó</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => deleteUser(u.email)}
                    >
                      Törlés
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="admin-content">
          <h2>Rendelések kezelése ({orders.length})</h2>
          {orders.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>Nincsenek rendelések.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Rendelés ID</th>
                    <th>Ügyfél</th>
                    <th>Email</th>
                    <th>Dátum</th>
                    <th>Összeg</th>
                    <th>Szállítás</th>
                    <th>Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td><code style={{ fontSize: '12px' }}>{order.id}</code></td>
                      <td>{order.name}</td>
                      <td>{order.email}</td>
                      <td>{new Date(order.timestamp).toLocaleDateString('hu-HU', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                      <td><strong>{order.total || order.totalAmount || '-'} Ft</strong></td>
                      <td>{order.shipping === 'csomagpont' ? '📦 Csomagpont' : '🚚 Szállítás'}</td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => deleteOrder(order.id)}
                          title="Rendelés törlése"
                        >
                          Törlés
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <style>{`
        .admin-panel {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .admin-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          border-radius: 8px;
          margin-bottom: 30px;
        }

        .admin-header h1 {
          margin: 0;
          font-size: 28px;
        }

        .admin-header p {
          margin: 10px 0 0 0;
          opacity: 0.9;
        }

        .admin-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .tab-btn {
          padding: 12px 20px;
          border: 2px solid #ddd;
          background: white;
          cursor: pointer;
          border-radius: 4px;
          font-size: 16px;
          transition: all 0.3s;
        }

        .tab-btn.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .tab-btn:hover {
          border-color: #667eea;
        }

        .tab-btn.refresh-btn {
          margin-left: auto;
          background: #28a745;
          border-color: #28a745;
          color: white;
        }

        .tab-btn.refresh-btn:hover {
          background: #218838;
          border-color: #218838;
        }

        .admin-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .admin-content h2 {
          margin-top: 0;
          color: #333;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }

        .admin-table thead {
          background: #f5f5f5;
        }

        .admin-table th,
        .admin-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
          color: #000;
        }

        .admin-table th {
          font-weight: bold;
          color: #333;
        }

        .admin-table tr:hover {
          background: #f9f9f9;
        }

        .admin-table select {
          padding: 6px;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }

        .btn-delete {
          background: #dc3545;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .btn-delete:hover {
          background: #c82333;
        }

        .logout-btn {
          background: #ff6b6b;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s;
        }

        .logout-btn:hover {
          background: #ff5252;
        }

        .back-home-btn {
          display: inline-block;
          padding: 10px 16px;
          background: #1d5fd7;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-size: 14px;
          transition: all 0.3s;
          white-space: nowrap;
        }

        .back-home-btn:hover {
          background: #0d3fa7;
        }
      `}</style>
    </div>
  )
}
