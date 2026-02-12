# 🚗 AUTÓS E-KERESKEDELMI PLATFORM
## Szakmai Vizsga Projekt Dokumentáció

**Verzió:** 1.0  
**Dátum:** 2026. február 12.  
**Készítette:** Magyar Krisztián

---

## 📋 TARTALOMJEGYZÉK

1. [Projekt Áttekintés](#projekt-áttekintés)
2. [Technológia Stack](#technológia-stack)
3. [Projekt Struktúra](#projekt-struktúra)
4. [Telepítés és Futtatás](#telepítés-és-futtatás)
5. [Funkcionális Specifikáció](#funkcionális-specifikáció)
6. [Backend API Dokumentáció](#backend-api-dokumentáció)
7. [Frontend Architektúra](#frontend-architektúra)
8. [Felhasználók és Szerepkörök](#felhasználók-és-szerepkörök)
9. [Adatbázis Struktura](#adatbázis-struktúra)
10. [Admin Vezérlőpult](#admin-vezérlőpult)
11. [Biztonsági Szempontok](#biztonsági-szempontok)
12. [Fejlesztési Útmutató](#fejlesztési-útmutató)

---

## 🎯 PROJEKT ÁTTEKINTÉS

### Célja
Az "Autós Vizsga" egy teljes körű e-kereskedelmi platform autóalkatrészek és kiegészítők online értékesítésére. A rendszer lehetővé teszi a felhasználóknak, hogy autó szervizhez szükséges termékeket megvásárolhassanak, valamint adminisztrátoroknak a teljes rendszert felügyelniük.

### Főbb Jellemzők
- ✅ Felhasználó regisztráció és bejelentkezés
- ✅ Termékkatálógus böngészés
- ✅ Vásárlási kosár és rendelés
- ✅ Rendelés előnézet és feldolgozás
- ✅ Felhasználó rendelés előzmények
- ✅ Admin vezérlőpult (felhasználó- és rendeléskezelés)
- ✅ Garancia, szállítás, visszaküldés és támogatási információk

---

## 🛠 TECHNOLÓGIA STACK

### Backend
- **Runtime:** Node.js (ES6 modulok)
- **Framework:** Express.js (5.2.1)
- **Közvetítés:** CORS (Cross-Origin Resource Sharing)
- **Adattárolás:** JSON fájlok (users.json, orders.json)

### Frontend
- **UI Framework:** React (19.2.0)
- **Navigáció:** React Router DOM (7.12.0)
- **Build Tool:** Vite (7.2.4)
- **Stílusok:** CSS3
- **Futási Környezet:** Modern böngészők (ES6+)

### Fejlesztési Eszközök
- **Linter:** ESLint (9.39.1)
- **Concurrent Runner:** Concurrently (9.2.1)
- **Tesztelés:** Jest (30.2.0)

---

## 📁 PROJEKT STRUKTÚRA

```
autos_vizsga/
├── src/                          # Frontend forráskód
│   ├── App.jsx                   # Fő React komponens + Router
│   ├── main.jsx                  # React belépési pont
│   ├── index.css                 # Globális stílusok
│   ├── styles/                   # Komponens-specifikus CSS
│   │   └── style.css
│   ├── components/               # Újrafelhasználható komponensek
│   │   └── ScrollToTop.jsx       # Oldal tetejére görgetés
│   ├── pages/                    # Oldal komponensek
│   │   ├── HomePage.jsx          # Főoldal - termékkatalógus
│   │   ├── LoginPage.jsx         # Bejelentkezés/Regisztráció
│   │   ├── CheckoutPage.jsx      # Kosár és vásárlás
│   │   ├── OrderPreviewPage.jsx  # Rendelés előnézete
│   │   ├── OrderHistory.jsx      # Korábbi rendelések
│   │   ├── WarrantyPage.jsx      # Garancia információk
│   │   ├── ShippingPage.jsx      # Szállítási információk
│   │   ├── ReturnsPage.jsx       # Visszaküldési szabályzat
│   │   ├── SupportPage.jsx       # Ügyfélszolgálat
│   │   └── AdminPanel.jsx        # Admin vezérlőpult
│   └── lib/                      # Segédfunkciók és konstansok
├── server.js                     # Express backend szerver
├── index.html                    # HTML belépési pont
├── vite.config.js               # Vite konfigurációs fájl
├── eslint.config.js             # ESLint konfigurációs fájl
├── package.json                 # NPM függőségek és scriptek
├── data/                        # Adattárolás
│   ├── users.json              # Felhasználók adatbázisa
│   └── orders.json             # Rendelések adatbázisa
├── public/                      # Statikus fájlok
│   └── DATA/
│       └── data.json           # Termék katalógus JSON
├── tests/                       # Tesztfájlok
├── ADMIN_GUIDE.md              # Admin útmutató
├── PROJEKT_DOKUMENTACIO.md     # Ez a fájl
├── start-all.bat               # Windows batch indítás script
└── start-all.ps1               # PowerShell indítás script
```

---

## 🚀 TELEPÍTÉS ÉS FUTTATÁS

### Előfeltételek
- Node.js (16+ verzió)
- npm (8+ verzió)
- Git

### Lépések

#### 1. Repository Klónozása
```bash
git clone https://github.com/magyarkrisztian758-afk/autos_vizsga.git
cd autos_vizsga
```

#### 2. Függőségek Telepítése
```bash
npm install
```

#### 3. Szerver Indítása (egyszerű mód)
```bash
npm run dev-all
```

Ez egy parancsban elindítja:
- **Backend:** http://localhost:3001
- **Frontend:** http://localhost:5173

#### Alternatív Indítás Módok

**Külön ablakok (Windows):**
```bash
start-all.bat          # Dupla kattintás vagy CMD-ből futtatás
# vagy
.\start-all.ps1        # PowerShell-ből futtatás
```

**Csak Backend:**
```bash
npm run server
```

**Csak Frontend (fejlesztői mód):**
```bash
npm run dev
```

**Termelési Build:**
```bash
npm run build
npm run start
```

---

## 📊 FUNKCIONÁLIS SPECIFIKÁCIÓ

### 1. Felhasználók Kezelése

#### Regisztráció
- Email cím, születési dátum és jelszó megadása
- E-mail alapú duplikáció ellenőrzés
- Jelszó titkosított tárolása (jelenleg plain text - BIZTONSÁGI KOCKÁZAT)

#### Bejelentkezés
- Email és jelszó alapján authentifikáció
- Session-szerű kezelés (localStorage-ben tárolt)
- Felhasználói adatok (email, role, isAdmin) mentése

#### Felhasználó Jellemzők
```json
{
  "email": "felhasznalo@example.com",
  "birthDate": "2000-01-15",
  "password": "jelszó",
  "role": "user" // vagy "admin"
}
```

### 2. Termék Katalógus (HomePage)
- Termékek megjelenítése data.json-ből
- Autóalkatrészek szűrési lehetősége
- Kosár funkcionalitás (sessionStorage)
- Termék részletek és ár megjelenítése

### 3. Rendelés Feldolgozás

#### Kosár (CheckoutPage)
- Termékek hozzáadása/eltávolítása
- Mennyiség módosítása
- Ár számítás (bruttó + nettó)
- Szállítási cím bevitele

#### Rendelés Létrehozása
- Vásárlási adat mentése
- Rendelésszám generálása (timestamp alapú)
- orders.json-be mentése

#### Rendelés Előnézet (OrderPreviewPage)
- Végső rendelés ellenőrzés
- Összeg megerősítés
- Szállítási adatok áttekintése

### 4. Rendelés Előzmények (OrderHistory)
- Felhasználó korábbi rendeléseit listázza
- Rendezés dátum szerint
- Részletes rendelés információk

### 5. Információs Oldalak
- **Garancia (WarrantyPage):** Garancia feltételei
- **Szállítás (ShippingPage):** Szállítási költségek és idő
- **Visszaküldés (ReturnsPage):** Visszaküldési szabályzat
- **Támogatás (SupportPage):** Ügyfélszolgálati kapcsolat

---

## 🔌 BACKEND API DOKUMENTÁCIÓ

### Alapadatok
- **Alap URL:** http://localhost:3001
- **Content-Type:** application/json
- **CORS:** Engedélyezve az összes domain számára

### Nyilvános Végpontok

#### 1. GET /api
```
Válasz: { message: "Hello from the backend!" }
```

#### 2. GET /api/data
```
Leírás: Termék katalógus JSON-t szolgáltat
Válasz: Terméktömbből JSON fájl
```

#### 3. POST /api/register
```json
Kérés:
{
  "email": "user@example.com",
  "birthDate": "2000-01-15",
  "password": "password123"
}

Válasz (siker):
{
  "success": true,
  "message": "Registration successful"
}

Válasz (hiba):
{
  "success": false,
  "message": "User already exists"
}
```

#### 4. POST /api/login
```json
Kérés:
{
  "email": "user@example.com",
  "password": "password123"
}

Válasz (siker):
{
  "success": true,
  "user": {
    "email": "user@example.com",
    "loggedIn": true,
    "role": "user",
    "isAdmin": false
  }
}

Válasz (hiba):
{
  "success": false,
  "message": "Invalid credentials"
}
```

#### 5. POST /api/order
```json
Kérés:
{
  "email": "user@example.com",
  "items": [...],
  "totalPrice": 15000,
  "shippingAddress": "1234 Street"
}

Válasz:
{
  "success": true,
  "orderId": 1707758400000
}
```

#### 6. GET /api/orders/:email
```
Leírás: Felhasználó rendeléseit kéri le
Válasz: Rendelési tömb a felhasználóhoz
```

### Admin Végpontok (authentifikáció szükséges)

#### 1. GET /api/admin/users
```
Paraméter: email (query) - admin email cím
Leírás: Összes felhasználó listázása
Válasz: Felhasználói tömb (email, birthDate, role)
Hiba: 403 Unauthorized (ha nem admin)
```

#### 2. GET /api/admin/orders
```
Paraméter: email (query) - admin email cím
Leírás: Összes rendelés listázása
Válasz: Rendelési tömb
Hiba: 403 Unauthorized (ha nem admin)
```

#### 3. POST /api/admin/users/role
```json
Kérés:
{
  "adminEmail": "admin@example.com",
  "targetEmail": "user@example.com",
  "newRole": "admin" // vagy "user"
}

Válasz:
{
  "success": true,
  "message": "User role updated to admin"
}
```

#### 4. POST /api/admin/users/delete
```json
Kérés:
{
  "adminEmail": "admin@example.com",
  "targetEmail": "user@example.com"
}

Válasz:
{
  "success": true,
  "message": "User deleted"
}
```

#### 5. POST /api/admin/orders/delete
```json
Kérés:
{
  "adminEmail": "admin@example.com",
  "orderId": 1707758400000
}

Válasz:
{
  "success": true,
  "message": "Order deleted"
}
```

#### 6. POST /api/admin/create-first-admin
```json
Kérés:
{
  "email": "admin@example.com",
  "birthDate": "1990-01-01",
  "password": "adminpassword"
}

Válasz (siker):
{
  "success": true,
  "message": "Admin account created"
}

Válasz (hiba - admin már létezik):
{
  "success": false,
  "message": "Admin already exists"
}
```

---

## 💻 FRONTEND ARCHITEKTÚRA

### Routing Struktúra

```javascript
/                 → HomePage       (Termékkatalógus)
/login            → LoginPage      (Bejelentkezés/Regisztráció)
/checkout         → CheckoutPage   (Kosár és vásárlás)
/order-preview    → OrderPreviewPage (Rendelés előnézete)
/rendeléseim      → OrderHistory   (Rendelés előzmények)
/garancia         → WarrantyPage   (Garancia infó)
/szallitas        → ShippingPage   (Szállítási infó)
/visszakuldes     → ReturnsPage    (Visszaküldési infó)
/support          → SupportPage    (Támogatás)
/admin            → AdminPanel     (Admin vezérlőpult)
```

### State Kezelés
- **localStorage:** Bejelentkezési adatok (user objektum)
- **sessionStorage:** Kosár adatok, munkamenet infó
- **React State:** Komponens-szintű dinamikus adatok

### Komponens Hierarchia

```
App (Router)
├── HomePage
├── LoginPage
├── CheckoutPage
├── OrderPreviewPage
├── OrderHistory
├── WarrantyPage
├── ShippingPage
├── ReturnsPage
├── SupportPage
├── AdminPanel
└── ScrollToTop (komponens)
```

---

## 👥 FELHASZNÁLÓK ÉS SZEREPKÖRÖK

### 1. Közönséges Felhasználó (user)
**Jogosultságok:**
- Termékkatalógus böngészése
- Bejelentkezés/Regisztráció
- Kosár kezelése
- Rendelés leadása
- Saját rendeléseit megtekinteni

**API Hozzáférés:**
- POST /api/register
- POST /api/login
- POST /api/order
- GET /api/orders/:email

### 2. Admin Felhasználó (admin)
**Jogosultságok:**
- Közönséges felhasználó összes joga
- Összes felhasználó megtekintése
- Felhasználók szerepkörének módosítása
- Felhasználók törlése
- Összes rendelés megtekintése
- Rendelések törlése
- Admin Vezérlőpult elérése

**API Hozzáférés:**
- Az összes fenti + admin végpontok
- GET /api/admin/users
- GET /api/admin/orders
- POST /api/admin/users/role
- POST /api/admin/users/delete
- POST /api/admin/orders/delete

### Első Admin Fiók Létrehozása

A rendszer lehetővé teszi az első admin fiók létrehozását, ha még nincs admin:

```bash
# API hívás POST-val /api/admin/create-first-admin végpontra
```

Utána már csak admin felhasználók hozhatnak létre új adminokat az Admin Panelből.

---

## 💾 ADATBÁZIS STRUKTÚRA

### users.json

```json
[
  {
    "email": "user@example.com",
    "birthDate": "2000-01-15",
    "password": "jelszó123",
    "role": "user"
  },
  {
    "email": "admin@example.com",
    "birthDate": "1990-01-01",
    "password": "adminpass",
    "role": "admin"
  }
]
```

### orders.json

```json
[
  {
    "id": 1707758400000,
    "email": "user@example.com",
    "items": [
      {
        "id": 1,
        "name": "Kerékpár Szett",
        "price": 5000,
        "quantity": 2
      }
    ],
    "totalPrice": 10000,
    "shippingAddress": "1234 Main Street",
    "timestamp": "2026-02-12T10:00:00.000Z"
  }
]
```

### data.json (Termékkatalógus)

```json
[
  {
    "id": 1,
    "name": "Kerékpár Szett",
    "price": 5000,
    "description": "Magas minőségű kerékpár",
    "category": "alkatrész"
  }
]
```

---

## 🎛 ADMIN VEZÉRLŐPULT

### Funkciók

#### 1. Felhasználók Kezelése
- Összes regisztrált felhasználó listázása
- Felhasználó szerepkörének módosítása (user ↔ admin)
- Felhasználók törlése
- Felhasználó adatainak megtekintése (email, születési dátum, szerepkör)

#### 2. Rendelések Kezelése
- Összes rendelés listázása
- Rendelés részletei (vevő email, termékek, ár, dátum)
- Rendelések törlése

#### 3. Rendszer Adatok
- Teljes felhasználószám
- Teljes rendelésszám
- Rendszerállapot monitorozása

---

## 🔒 BIZTONSÁGI SZEMPONTOK

### Jelenlegi Implementáció
- CORS engedélyezve az összes domain számára
- Jelszavak plain text-ben tárolva (KRITIKUS BIZTONSÁGI HIBA)
- Nincs JWT/session token authentifikáció
- Nincs HTTPS (csak localhost)
- Admin check egyszerű email alapú (kliens oldal manipulálható)

### Javasolt Fejlesztések (Termelési Verzióhoz)

1. **Jelszókezelés:**
   - bcrypt vagy hasonló hashelő algoritmus
   - Salt az adatbázisban

2. **Authentifikáció:**
   - JWT tokenek bevezetése
   - Token refresh mechanizmus
   - HttpOnly Cookie-k

3. **HTTPS:**
   - SSL/TLS tanúsítványok
   - Secure és SameSite cookie flag-ek

4. **Validáció:**
   - Input validáció (szerver és kliens)
   - Email formátum ellenőrzés
   - Rate limiting

5. **Adatbázis:**
   - Valós adatbázis (MongoDB, PostgreSQL)
   - Backup és helyreállítás stratégia

---

## 📖 FEJLESZTÉSI ÚTMUTATÓ

### Új Oldal Hozzáadása

1. **Oldal fájl létrehozása** (`src/pages/NewPage.jsx`):
```jsx
export default function NewPage() {
  return (
    <div className="new-page">
      <h1>Új Oldal</h1>
    </div>
  )
}
```

2. **Routing hozzáadása** (`src/App.jsx`):
```jsx
import NewPage from './pages/NewPage'

// Routes-en belül:
<Route path="/new-page" element={<NewPage />} />
```

3. **CSS stílusok** (`src/styles/style.css`):
```css
.new-page {
  /* stílusok */
}
```

### Új API Endpoint Hozzáadása

1. **Endpoint definiálása** (`server.js`):
```javascript
app.post('/api/new-endpoint', (req, res) => {
  const data = req.body;
  // Feldolgozás
  res.json({ success: true, data });
});
```

2. **Frontend integrálása**:
```javascript
const response = await fetch('http://localhost:3001/api/new-endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

### NPM Scriptek Futtatása

```bash
npm run dev          # Frontend dev szerver
npm run server       # Backend
npm run dev-all      # Mindkettő egyszerre
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Teszt futtatás
```

---

## 📝 VERZIÓTÖRTÉNET

| Verzió | Dátum | Módosítások |
|--------|-------|-----------|
| 1.0 | 2026.02.12 | Kezdeti verzió - alapvető funkciók |

---

## 📞 SUPPORT ÉS FEJLESZTÉS

### Fejlesztő Kontakt
- **Fejlesztő:** Magyar Krisztián
- **GitHub:** https://github.com/magyarkrisztian758-afk/autos_vizsga.git

### Hiba Bejelentés
Hibákat az admin panelen vagy email-en keresztül lehet bejelenteni.

### Jövőbeli Fejlesztések
- [ ] Jelszó titkosítás (bcrypt)
- [ ] JWT authentifikáció
- [ ] Valós adatbázis (MongoDB/PostgreSQL)
- [ ] Email notifikációk
- [ ] Fizetési integrációk (Stripe, PayPal)
- [ ] Admin statisztikák és grafikonok
- [ ] Felhasználói profil szerkesztés
- [ ] Termékkeresés és szűrés
- [ ] Vélemények és értékelések
- [ ] Kosár mentés (cloud)

---

**Utolsó módosítás:** 2026.02.12.  
**Dokumentáció verziója:** 1.0  
**Projekt státusza:** Aktív fejlesztés
