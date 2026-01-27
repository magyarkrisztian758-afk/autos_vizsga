import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/style.css'

function WarrantyPage() {
  useEffect(() => {
    // Hide toolbar when page loads
    const toolbar = document.getElementById('toolbar')
    if (toolbar) {
      toolbar.classList.add('hidden')
    }
  }, [])
  
  return (
    <>
      <style>{`
        .warranty-container { max-width: 1000px; margin: 0 auto; padding: 2rem 1rem; }
        .warranty-header { text-align: center; margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 2px solid #28a745; }
        .warranty-header h1 { font-size: 2.5rem; color: #333; margin-bottom: 0.5rem; }
        .warranty-header p { font-size: 1.1rem; color: #666; }
        .warranty-section { margin-bottom: 3rem; padding: 2rem; background: #f9f9f9; border-radius: 8px; border-left: 4px solid #28a745; }
        .warranty-section h2 { font-size: 1.8rem; color: #28a745; margin-bottom: 1.5rem; margin-top: 0; }
        .warranty-badge { display: inline-block; background: #28a745; color: white; padding: 0.75rem 1.5rem; border-radius: 50px; font-weight: bold; margin-bottom: 1.5rem; font-size: 1.1rem; }
        .coverage-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 2rem; }
        .coverage-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); text-align: center; }
        .coverage-card.included { border-top: 4px solid #28a745; }
        .coverage-card.excluded { border-top: 4px solid #dc3545; }
        .coverage-card h3 { margin-top: 0; font-size: 1.2rem; margin-bottom: 1rem; }
        .coverage-card.included h3 { color: #28a745; }
        .coverage-card.excluded h3 { color: #dc3545; }
        .coverage-card p { color: #555; line-height: 1.6; margin: 0; }
        .icon-large { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .info-list { list-style: none; padding: 0; }
        .info-list li { padding: 0.7rem 0; padding-left: 2rem; position: relative; color: #555; }
        .info-list li:before { content: "✓"; position: absolute; left: 0; color: #28a745; font-weight: bold; font-size: 1.2rem; }
        .excluded-list li:before { content: "✗"; color: #dc3545; }
        .steps-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2rem; margin-top: 2rem; }
        .step { background: white; padding: 1.5rem; border-radius: 8px; text-align: center; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }
        .step-number { display: inline-block; width: 50px; height: 50px; background: #28a745; color: white; border-radius: 50%; line-height: 50px; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; }
        .step h3 { color: #28a745; margin: 1rem 0; }
        .step p { color: #555; line-height: 1.6; margin: 0; }
        .back-link { display: inline-block; margin-bottom: 2rem; color: #28a745; text-decoration: none; font-weight: 500; }
        .back-link:hover { text-decoration: underline; }
        .highlight-box { background: #e7f5ea; border-left: 4px solid #28a745; padding: 1.5rem; border-radius: 4px; margin: 1.5rem 0; }
        .highlight-box p { margin: 0; color: #155724; font-weight: 500; }
      `}</style>

      <header className="header">
        <div className="container">
          <div className="header-top">
            <h1><Link to="/">CarCore</Link></h1>
            <div className="header-right">
              <button className="account-btn" aria-label="Fiók">
                <span className="account-icon">👤</span>
                <span className="account-text">Bejelentkezés</span>
              </button>
              <button id="cartButton" className="cart-btn" aria-label="Kosár">Kosár (<span id="cartCount">0</span>)</button>
              <button id="menuToggle" className="menu-toggle" aria-label="Menü">☰</button>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="warranty-container">
          <Link to="/" className="back-link">← Vissza a főoldalra</Link>

          <div className="warranty-header">
            <h1>🛡️ Garancia Információk</h1>
            <p>CarCore-nál az Ön elégedettsége és a termékek minősége az első</p>
          </div>

          <section className="warranty-section">
            <div className="warranty-badge">✓ 1 ÉV GARANCIA</div>
            <p>CarCore minden alkatrészére vállal <strong>1 év garanciát</strong>, amely a vásárlás napjától számítva érvényes.</p>
            <div className="highlight-box">
              <p>⚠️ Kivétel: Az olajok és egyéb folyadékok csak 30 napos garanciával rendelkeznek.</p>
            </div>
          </section>

          <section className="warranty-section">
            <h2>Garancia Fedezete</h2>
            <div className="coverage-grid">
              <div className="coverage-card included">
                <div className="icon-large">✓</div>
                <h3>Termékhiba</h3>
                <p>Gyári vagy anyagi hiba esetén ingyenes csere vagy visszafizetés.</p>
              </div>
              <div className="coverage-card included">
                <div className="icon-large">✓</div>
                <h3>Gyári Hibák</h3>
                <p>A terméken szereplő hibák az előállítás során keletkeztek.</p>
              </div>
              <div className="coverage-card included">
                <div className="icon-large">✓</div>
                <h3>Működési Zavarak</h3>
                <p>Az alkatrész nem működik vagy teljesítménye csökkent.</p>
              </div>
              <div className="coverage-card excluded">
                <div className="icon-large">✗</div>
                <h3>Normál Kopás</h3>
                <p>Az alkatrész normális használat során kopott vagy elhasználódott.</p>
              </div>
              <div className="coverage-card excluded">
                <div className="icon-large">✗</div>
                <h3>Alkalmazási Hiba</h3>
                <p>Helytelen szerelés, karbantartás vagy használat okozta sérülés.</p>
              </div>
              <div className="coverage-card excluded">
                <div className="icon-large">✗</div>
                <h3>Szállítási Sérülés</h3>
                <p>Az Ön által okozott sérülés szállítás után.</p>
              </div>
            </div>
          </section>

          <section className="warranty-section">
            <h2>Mit Fedez a Garancia?</h2>
            <ul className="info-list">
              <li>Termékhiba vagy gyári hiba</li>
              <li>Az alkatrész nem működik vagy nem teljesíti az elvárásokat</li>
              <li>Szerkezeti vagy funkcionális hibák</li>
            </ul>
          </section>

          <section className="warranty-section">
            <h2>Mit NEM Fedez a Garancia?</h2>
            <ul className="info-list excluded-list">
              <li>Normális kopás és elhasználódás</li>
              <li>Helytelen szerelés vagy karbantartás</li>
              <li>Szállítási sérülések</li>
              <li>Fizikai vagy mechanikai sérülések</li>
            </ul>
          </section>

          <section className="warranty-section">
            <h2>Garancia Igénylési Folyamat</h2>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Vegye Fel a Kapcsolatot</h3>
                <p>Jelezze a problémát 14 napon belül</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>Küldje Vissza</h3>
                <p>Az Ön költségén</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Ellenőrzés</h3>
                <p>5 munkanapig ellenőrizzük</p>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <h3>Megoldás</h3>
                <p>Csere vagy visszafizetés</p>
              </div>
            </div>
          </section>

          <Link to="/" className="back-link">← Vissza a főoldalra</Link>
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

export default WarrantyPage
