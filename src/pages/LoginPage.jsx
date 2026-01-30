import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/style.css'

function LoginPage() {
  const [isLoginVisible, setIsLoginVisible] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showRegPassword, setShowRegPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Hide toolbar when page loads
    const toolbar = document.getElementById('toolbar')
    if (toolbar) {
      toolbar.classList.add('hidden')
    }
  }, [])

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    if (loginEmail && loginPassword) {
      try {
        const response = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: loginEmail, password: loginPassword })
        })
        const data = await response.json()
        if (data.success) {
          localStorage.setItem('user', JSON.stringify({
            email: loginEmail,
            loggedIn: true,
            loginTime: new Date().toISOString()
          }))
          localStorage.setItem('showLoginSuccess', 'true')
          navigate('/')
        } else {
          alert(data.message || 'Bejelentkezés sikertelen')
        }
      } catch (error) {
        alert('Hiba történt a bejelentkezés során')
      }
    } else {
      alert("Kérjük, töltse ki az összes mezőt!")
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    if (regPassword !== confirmPassword) {
      alert("A jelszavak nem egyeznek!")
      return
    }
    if (regEmail && birthDate && regPassword) {
      try {
        const response = await fetch('http://localhost:3001/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: regEmail, birthDate, password: regPassword })
        })
        const data = await response.json()
        if (data.success) {
          localStorage.setItem('user', JSON.stringify({
            email: regEmail,
            birthDate: birthDate,
            loggedIn: true,
            registrationTime: new Date().toISOString()
          }))
          localStorage.setItem('showLoginSuccess', 'true')
          navigate('/')
        } else {
          alert(data.message || 'Regisztráció sikertelen')
        }
      } catch (error) {
        alert('Hiba történt a regisztráció során')
      }
    } else {
      alert("Kérjük, töltse ki az összes mezőt!")
    }
  }

  const handleMenuToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const toolbar = document.getElementById('toolbar')
    if (toolbar) {
      toolbar.classList.toggle('hidden')
    }
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-top">
            <h1><Link to="/">CarCore</Link></h1>
            <div className="account-section">
              <button className="account-btn" aria-label="Fiók">
                <span className="account-icon">👤</span>
                <span className="account-text">Bejelentkezés</span>
              </button>
            </div>
            <button id="menuToggle" className="menu-toggle" aria-label="Menü" onClick={handleMenuToggle}>☰</button>
          </div>
          <div className="toolbar" id="toolbar">
            <input id="searchInput" type="search" placeholder="Keresés névre, márkára, OEM számra..." />
            <select id="brandFilter">
              <option value="">Márka</option>
            </select>
            <select id="categoryFilter">
              <option value="">Kategória</option>
            </select>
            <button id="resetFilters">Szűrők törlése</button>
          </div>
        </div>
      </header>

      <main className="container">
        <div className={`login-container ${!isLoginVisible ? 'hidden' : ''}`}>
          <h2>Bejelentkezés</h2>
          <form id="loginForm" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-mail cím:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Jelszó:</label>
              <div className="password-field">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  name="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle" 
                  onMouseDown={(e) => {
                    e.preventDefault()
                    setShowPassword(true)
                  }}
                  onMouseUp={(e) => {
                    e.preventDefault()
                    setShowPassword(false)
                  }}
                  onMouseLeave={() => setShowPassword(false)}
                >
                  👁️
                </button>
              </div>
            </div>
            <button type="submit" className="login-btn">Bejelentkezés</button>
          </form>
          <p>Nincs még fiókod? <a href="#" onClick={(e) => {
            e.preventDefault()
            setIsLoginVisible(false)
          }}>Regisztrálj itt</a></p>
        </div>

        <div className={`register-container ${isLoginVisible ? 'hidden' : ''}`}>
          <h2>Regisztráció</h2>
          <form id="registerForm" onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label htmlFor="regEmail">E-mail cím:</label>
              <input 
                type="email" 
                id="regEmail" 
                name="regEmail"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthDate">Születési dátum:</label>
              <input 
                type="date" 
                id="birthDate" 
                name="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="regPassword">Jelszó:</label>
              <div className="password-field">
                <input 
                  type={showRegPassword ? "text" : "password"} 
                  id="regPassword" 
                  name="regPassword"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    setShowRegPassword(true)
                  }}
                  onMouseUp={(e) => {
                    e.preventDefault()
                    setShowRegPassword(false)
                  }}
                  onMouseLeave={() => setShowRegPassword(false)}
                >
                  👁️
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Jelszó megerősítése:</label>
              <div className="password-field">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  id="confirmPassword" 
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    setShowConfirmPassword(true)
                  }}
                  onMouseUp={(e) => {
                    e.preventDefault()
                    setShowConfirmPassword(false)
                  }}
                  onMouseLeave={() => setShowConfirmPassword(false)}
                >
                  👁️
                </button>
              </div>
            </div>
            <button type="submit" className="register-btn">Regisztráció</button>
          </form>
          <p>Van már fiókod? <a href="#" onClick={(e) => {
            e.preventDefault()
            setIsLoginVisible(true)
          }}>Jelentkezz be</a></p>
        </div>
      </main>

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

export default LoginPage
