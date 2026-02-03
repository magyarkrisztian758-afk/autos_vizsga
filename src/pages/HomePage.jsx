import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  const [filteredProducts, setFilteredProducts] = useState([])
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({ search: '', brand: '', category: '' })
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginError, setShowLoginError] = useState(false)
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false)
  const [showLoginSuccess, setShowLoginSuccess] = useState(false)
  const [brandOpen, setBrandOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const productsRef = useRef([])

  const itemsPerPage = 9

  // Initialize on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/data")
        const data = await res.json()
        productsRef.current = Array.isArray(data) ? data : []
        setFilteredProducts(productsRef.current)
        
        // Extract brands and categories
        const brandSet = new Set()
        const catSet = new Set()
        productsRef.current.forEach(p => {
          if (p.brand) brandSet.add(p.brand)
          if (p.category) catSet.add(p.category)
        })
        
        setBrands(Array.from(brandSet).sort())
        setCategories(Array.from(catSet).sort())
        
        // Load cart from localStorage
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart)
            // Filter out invalid cart items
            const validCart = Array.isArray(parsedCart) ? parsedCart.filter(item => item && item.id && item.price !== undefined && item.qty) : []
            setCart(validCart)
          } catch (err) {
            console.error("Error parsing cart:", err)
            setCart([])
          }
        }
        
        // Check if user is logged in
        const user = localStorage.getItem('user')
        if (user) {
          try {
            const userData = JSON.parse(user)
            if (userData.loggedIn) {
              setIsLoggedIn(true)
            }
          } catch (err) {
            console.error("Error parsing user data:", err)
          }
        }

        // Check if there's a login success flag
        const showLoginSuccess = localStorage.getItem('showLoginSuccess')
        if (showLoginSuccess === 'true') {
          setShowLoginSuccess(true)
          localStorage.removeItem('showLoginSuccess')
          setTimeout(() => setShowLoginSuccess(false), 3000)
        }
      } catch (err) {
        console.error("Error loading data:", err)
      }
    }
    
    // Hide toolbar when page loads
    const toolbar = document.getElementById('toolbar')
    if (toolbar) {
      toolbar.classList.add('hidden')
    }
    
    loadData()
  }, [])
  // Filter products
  useEffect(() => {
    let filtered = productsRef.current
    
    if (filters.search) {
      const needle = filters.search.toLowerCase()
      filtered = filtered.filter(p => {
        const hay = `${p.name || ''} ${p.brand || ''} ${p.oem || ''}`.toLowerCase()
        return hay.includes(needle)
      })
    }
    
    if (filters.brand) {
      filtered = filtered.filter(p => {
        const norm = s => (s || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '')
        const pbrand = norm(p.brand || '')
        const sbrand = norm(filters.brand || '')
        return pbrand.includes(sbrand) || sbrand.includes(pbrand)
      })
    }
    
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category)
    }
    
    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [filters])

  // Format price
  const formatPrice = (n) => {
    return Number(n || 0).toLocaleString("hu-HU")
  }

  // Add to cart
  const handleAddToCart = (product) => {
    const newCart = [...cart]
    const idx = newCart.findIndex(i => i.id === product.id)
    
    if (idx !== -1) {
      // Increase quantity if item exists
      newCart[idx].qty = Math.min((newCart[idx].qty || 0) + 1, product.stock || newCart[idx].qty)
      // Move to front
      const updatedItem = newCart.splice(idx, 1)[0]
      newCart.unshift(updatedItem)
    } else {
      // Add new item
      newCart.unshift({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock,
        qty: 1
      })
    }
    
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  // Update cart quantity
  const changeQty = (id, delta) => {
    const newCart = cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, Math.min((item.qty || 1) + delta, item.stock || Infinity))
        return newQty === 0 ? null : { ...item, qty: newQty }
      }
      return item
    }).filter(Boolean)
    
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  // Remove from cart
  const removeItem = (id) => {
    const newCart = cart.filter(i => i.id !== id)
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setShowLogoutSuccess(true)
    setTimeout(() => setShowLogoutSuccess(false), 3000)
  }

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const endIdx = startIdx + itemsPerPage
  const pageItems = filteredProducts.slice(startIdx, endIdx)

  const cartTotal = cart.reduce((sum, i) => sum + ((i?.price || 0) * (i?.qty || 0)), 0)
  const cartCount = cart.reduce((sum, i) => sum + (i?.qty || 0), 0)

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-top">
            <h1><Link to="/">CarCore</Link></h1>
            <div className="header-right">
              {isLoggedIn ? (
                <button className="account-btn" onClick={handleLogout} aria-label="Kijelentkezés">
                  <span className="account-icon">🚪</span>
                  <span className="account-text">Kijelentkezés</span>
                </button>
              ) : (
                <button className="account-btn" aria-label="Fiók">
                  <span className="account-icon">👤</span>
                  <span className="account-text">
                    <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Bejelentkezés
                    </Link>
                  </span>
                </button>
              )}
              <button id="cartButton" className="cart-btn" aria-label="Kosár" onClick={() => setCartOpen(!cartOpen)}>
                Kosár (<span id="cartCount">{cartCount}</span>)
              </button>
              <button id="menuToggle" className="menu-toggle" aria-label="Menü" onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const toolbar = document.getElementById("toolbar")
                if (toolbar) {
                  toolbar.classList.toggle("hidden")
                }
              }}>☰</button>
            </div>
          </div>
          <div className="toolbar" id="toolbar">
            <input 
              id="searchInput" 
              type="search" 
              placeholder="Keresés névre, márkára, OEM számra..." 
              value={filters.search}
              onChange={(e) => {
                setFilters({...filters, search: e.target.value})
                setBrandOpen(false)
                setCategoryOpen(false)
              }}
            />
            <div className="filter-dropdown">
              <button className="filter-btn" onClick={() => setBrandOpen(!brandOpen)}>
                Márka{filters.brand ? ` (${filters.brand})` : ''}
              </button>
              {brandOpen && (
                <div className="dropdown-content">
                  <button onClick={() => { setFilters({...filters, brand: ''}); setBrandOpen(false) }}>Összes</button>
                  {brands.map(b => (
                    <button key={b} onClick={() => { setFilters({...filters, brand: b}); setBrandOpen(false) }}>{b}</button>
                  ))}
                </div>
              )}
            </div>
            <div className="filter-dropdown">
              <button className="filter-btn" onClick={() => setCategoryOpen(!categoryOpen)}>
                Kategória{filters.category ? ` (${filters.category})` : ''}
              </button>
              {categoryOpen && (
                <div className="dropdown-content">
                  <button onClick={() => { setFilters({...filters, category: ''}); setCategoryOpen(false) }}>Összes</button>
                  {categories.map(c => (
                    <button key={c} onClick={() => { setFilters({...filters, category: c}); setCategoryOpen(false) }}>{c}</button>
                  ))}
                </div>
              )}
            </div>
            <button id="resetFilters" onClick={() => {
              setFilters({ search: '', brand: '', category: '' })
              setCurrentPage(1)
              setBrandOpen(false)
              setCategoryOpen(false)
            }}>Szűrők törlése</button>
          </div>
        </div>
      </header>

      <main className="container">
        <section id="products" className="grid">
          {pageItems.length === 0 ? (
            <p>Nincs találat a megadott szűrők alapján.</p>
          ) : (
            pageItems.map(p => (
              <div key={p.id} className="card">
                <img className="card-img" src={p.image || ""} alt={p.name || "Termék"} />
                <div className="card-body">
                  <h3 className="card-title">{p.name}</h3>
                  <div className="meta">
                    <span className="brand">{p.brand || "Ismeretlen márka"}</span> | <span className="category">{p.category || "Kategória nélkül"}</span>
                  </div>
                  {p.oem && <div className="oem">OEM: {p.oem}</div>}
                  {Array.isArray(p.compatible) && p.compatible.length > 0 && (
                    <div className="compat">Kompatibilis: {p.compatible.map(c => `${c.make} ${c.model} (${c.yearFrom || ""}-${c.yearTo || ""})`).join(", ")}</div>
                  )}
                  {!Array.isArray(p.compatible) || p.compatible.length === 0 && <div className="compat">Kompatibilitás nincs megadva</div>}
                  <div className="desc">{p.description || ""}</div>
                  <div className="card-footer">
                    <div className="price">{formatPrice(p.price)} Ft</div>
                    <div className="stock">{p.stock > 0 ? `Raktáron: ${p.stock} db` : "Nincs raktáron"}</div>
                    <button className="addToCart" disabled={p.stock <= 0} onClick={() => handleAddToCart(p)}>Kosárba</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
        <div id="pagination" className="pagination">
          {totalPages > 1 && (
            <>
              <button 
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(currentPage - 1)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                ← Előző
              </button>
              <span className="pagination-info">Oldal {currentPage} / {totalPages}</span>
              <button 
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(currentPage + 1)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                Következő →
              </button>
            </>
          )}
        </div>
      </main>

      <div id="cartModal" className={`modal ${cartOpen ? '' : 'hidden'}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Kosár</h2>
            <button id="closeCart" aria-label="Bezárás" onClick={() => setCartOpen(false)}>×</button>
          </div>
          <div id="cartItems">
            {!cart || cart.length === 0 ? (
              <p>A kosár üres.</p>
            ) : (
              cart.filter(item => item && item.id && item.price !== undefined).map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image || ""} alt={item.name || "Termék"} />
                  <div>
                    <div className="title">{item.name}</div>
                    <div className="muted">{formatPrice(item.price || 0)} Ft / db</div>
                  </div>
                  <div className="qty-controls">
                    <button onClick={() => changeQty(item.id, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, +1)}>+</button>
                    <button onClick={() => removeItem(item.id)}>Eltávolítás</button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="cart-footer">
            <div className="total">
              <strong>Összesen:</strong>
              <span id="cartTotal">{formatPrice(cartTotal)} Ft</span>
            </div>
            <button id="clearCartBtn" className="btn-secondary" onClick={clearCart}>Kosár ürítése</button>
            {!isLoggedIn ? (
              <button 
                className="btn-primary" 
                onClick={() => setShowLoginError(true)}
                style={{ width: '100%', marginTop: '10px' }}
              >
                Pénztárhoz
              </button>
            ) : (
              <Link to="/checkout" className="btn-primary" style={{ textDecoration: 'none', color: 'white' }} onClick={() => setCartOpen(false)}>
                Pénztárhoz
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className={`modal-backdrop ${cartOpen ? '' : 'hidden'}`} id="backdrop" onClick={() => setCartOpen(false)}></div>

      {showLoginError && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <div className="modal-header">
              <h2>Bejelentkezés szükséges</h2>
              <button onClick={() => setShowLoginError(false)} style={{ cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <p style={{ marginBottom: '20px', fontSize: '16px' }}>
                A fizetéshez előbb be kell jelentkezni!
              </p>
              <Link 
                to="/login" 
                className="btn-primary" 
                style={{ textDecoration: 'none', color: 'white', display: 'inline-block', padding: '10px 20px' }}
                onClick={() => setShowLoginError(false)}
              >
                Bejelentkezés
              </Link>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowLoginError(false)} style={{ display: 'block' }}></div>
        </div>
      )}

      {showLogoutSuccess && (
        <div className="modal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <div className="modal-content" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <div style={{ padding: '40px 20px' }}>
              <h2 style={{ color: '#4CAF50', marginBottom: '20px', fontSize: '28px' }}>✓ Sikeres kijelentkezés</h2>
            </div>
          </div>
          <div className="modal-backdrop" style={{ display: 'block' }}></div>
        </div>
      )}

      {showLoginSuccess && (
        <div className="modal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <div className="modal-content" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <div style={{ padding: '40px 20px' }}>
              <h2 style={{ color: '#4CAF50', marginBottom: '20px', fontSize: '28px' }}>✓ Sikeres bejelentkezés</h2>
            </div>
          </div>
          <div className="modal-backdrop" style={{ display: 'block' }}></div>
        </div>
      )}

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>CarCore</h3>
              <p>Minőségi alkatrészek és autószerelési kellékek. Megbízható szolgáltatás, gyors szállítás.</p>
            </div>
            <div className="footer-section">
              <h4>Szolgáltatások</h4>
              <ul>
                <li><Link to="/szallitas">Szállítás</Link></li>
                <li><Link to="/visszakuldes">Visszaküldés</Link></li>
                <li><Link to="/garancia">Garancia</Link></li>
                <li><Link to="/support">Ügyfélszolgálat</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Kapcsolat</h4>
              <ul>
                <li>Email: info@carcore.hu</li>
                <li>Telefon: +36 1 234 5678</li>
                <li>Cím: Budapest, Magyarország</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 CarCore. Minden jog fenntartva. | <a href="#">Adatvédelmi tájékoztató</a> | <a href="#">ÁSZF</a></p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default HomePage
