import { Link } from 'react-router-dom'

function ReturnsPage() {
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
        <h1>Visszaküldési Szabályzat</h1>
        
        <section style={{ marginBottom: '40px' }}>
          <h2>Általános Szabályok</h2>
          <p>
            Nálunk a vásárló elégedetsége az első. Ha nem vagy megelégedve a vásárlásaiddal, 
            az alábbi szabályok szerint tudsz termékeket visszaküldeni.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2>Visszaküldési Feltételek</h2>
          <ul>
            <li>A termékek 30 napon belül küldhetők vissza az eredeti csomagolásban</li>
            <li>A terméknek sérületlen és újnak kell maradnia</li>
            <li>A szállítási költség az ügyfél terhére esik</li>
            <li>Teljes visszatérítést biztosítunk a jóváhagyott visszaküldésekre</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2>Visszaküldési Folyamat</h2>
          <ol>
            <li>Kérj visszaküldési szelvényt az ügyfélszolgálattól</li>
            <li>Csomagold be a terméket az eredeti csomagolásban</li>
            <li>Küldd vissza a megadott címre a visszaküldési szelvénnyel</li>
            <li>Az ellenőrzés után visszatérítjük az összeget</li>
          </ol>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2>Kapcsolat</h2>
          <p>
            Kérdéseid vannak? Vedd fel a kapcsolatot az ügyfélszolgálatunkkal:
          </p>
          <p>
            <strong>Email:</strong> returns@carcore.hu<br />
            <strong>Telefon:</strong> +36 1 234 5678<br />
            <strong>Nyitvatartás:</strong> Hétfő - Péntek: 9:00 - 17:00
          </p>
          <Link to="/support" className="btn-primary" style={{ display: 'inline-block', marginTop: '10px' }}>
            Ügyfélszolgálat
          </Link>
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

export default ReturnsPage
