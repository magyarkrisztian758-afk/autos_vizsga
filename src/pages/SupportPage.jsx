import { Link } from 'react-router-dom'

function SupportPage() {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-top">
            <h1><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>CarCore</Link></h1>
            <div className="header-right">
              <Link to="/login" className="account-btn">
                <span className="account-icon">👤</span>
                <span className="account-text">Bejelentkezés</span>
              </Link>
              <button className="cart-btn">🛒 Kosár</button>
            </div>
          </div>
        </div>
      </header>

      <main className="container" style={{ minHeight: '60vh', paddingTop: '40px' }}>
        <h1>Ügyfélszolgálat</h1>
        
        <section style={{ marginBottom: '40px' }}>
          <h2>Elérhetőségek</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>
            <div>
              <h3>Telefonos Ügyfélszolgálat</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: '600', color: '#00c489' }}>+36 1 234 5678</p>
              <p style={{ color: '#9aa3ad' }}>Hétfő - Péntek: 9:00 - 17:00<br />Szombat: 10:00 - 14:00</p>
            </div>
            <div>
              <h3>Email Ügyfélszolgálat</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: '600', color: '#00c489' }}>support@carcore.hu</p>
              <p style={{ color: '#9aa3ad' }}>Válaszidő: 24 óra<br />Minden nap elérhető</p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2>Gyakran Ismételt Kérdések</h2>
          <div style={{ marginTop: '20px' }}>
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#151a21', borderRadius: '8px', borderLeft: '4px solid #2d7ef7' }}>
              <h4 style={{ margin: '0 0 10px 0' }}>Milyen a szállítási idő?</h4>
              <p style={{ margin: 0, color: '#cdd4dc' }}>A termékeket 2-5 munkanapon belül szállítjuk ki. A szállítási időt a rendelés során közöljük.</p>
            </div>
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#151a21', borderRadius: '8px', borderLeft: '4px solid #2d7ef7' }}>
              <h4 style={{ margin: '0 0 10px 0' }}>Elfogadnak-e bankkártyát?</h4>
              <p style={{ margin: 0, color: '#cdd4dc' }}>Igen! Elfogadunk Visa, Mastercard és egyéb bankkártyákat. A fizetés biztonságos és titkosított.</p>
            </div>
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#151a21', borderRadius: '8px', borderLeft: '4px solid #2d7ef7' }}>
              <h4 style={{ margin: '0 0 10px 0' }}>Hogyan nyújthatok be garanciát?</h4>
              <p style={{ margin: 0, color: '#cdd4dc' }}><Link to="/garancia">A garancia ismertetőjében</Link> minden információt megtalálsz a garanciális igénylésről.</p>
            </div>
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#151a21', borderRadius: '8px', borderLeft: '4px solid #2d7ef7' }}>
              <h4 style={{ margin: '0 0 10px 0' }}>Mennyi idő alatt vehetem vissza a terméket?</h4>
              <p style={{ margin: 0, color: '#cdd4dc' }}><Link to="/visszakuldes">A visszaküldési szabályzat</Link> szerint 30 nap áll rendelkezésre a termék visszaküldésére.</p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2>Nyomkövetés</h2>
          <p>
            Szállítottunk már egy terméket, és szeretnéd nyomon követni? Egyszerűen add meg a rendelési számot, 
            és megtekintheted a csomagod aktuális állapotát.
          </p>
          <form style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Rendelési szám..." 
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  backgroundColor: '#10151c',
                  border: '1px solid #263042',
                  borderRadius: '8px',
                  color: '#e6e9ef'
                }}
              />
              <button 
                type="button"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#2d7ef7',
                  border: '1px solid #2d7ef7',
                  color: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Keresés
              </button>
            </div>
          </form>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2>Közvetlenül Hozzánk</h2>
          <p style={{ color: '#9aa3ad' }}>
            CarCore<br />
            1015 Budapest, Magyarország<br />
            Megérkezésünk: Kérlek, telefonos bejelentkezés után keress fel minket.
          </p>
        </section>
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

export default SupportPage
