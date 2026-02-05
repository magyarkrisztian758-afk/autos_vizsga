# Admin Fiók Rendszer

## Funkciók

### Közönséges felhasználó tud:
- Termékeket megtekinteni
- Bejelentkezni/Regisztrálni
- Rendeléseket létrehozni
- Rendeléseit megtekinteni

### ADMIN fiók tud:
- Összes felhasználót megtekinteni
- Felhasználók szerepkörét módosítani (user ↔ admin)
- Felhasználókat törölni
- Összes rendelést megtekinteni
- Rendeléseket törölni
- Admin Vezérlőpult elérése

## Az első Admin Fiók Létrehozása

### 1. PowerShell-ben futtasd:
```powershell
# Navigálj a projekt mappába
cd "c:\Users\Bacsó Alex\Documents\vizsga\autos_vizsga"

# Hozd létre az users.json fájlt az alábbi tartalommal:
```

### 2. Hozz létre egy `data` mappát a projekt gyökerében:
```
autos_vizsga/
└── data/
    └── users.json
```

### 3. Töltsd ki az `users.json` fájlt az első admin fiókkal:
```json
[
  {
    "email": "admin@example.com",
    "birthDate": "1990-01-01",
    "password": "admin123",
    "role": "admin"
  }
]
```

### 4. Indítsd el a szervert:
```bash
npm run dev
```

### 5. Bejelentkezés:
- Email: `admin@example.com`
- Jelszó: `admin123`

### 6. Admin Vezérlőpult:
Bejelentkezés után navigálj ide: `/admin`

## Felhasználó létrehozása az Admin által

Az admin panel-en:
1. Kattints az "admin/create-first-admin" POST endpoint-ra (vagy adj hozzá UI-t)
2. Vagy módosítsd az users.json-t és add hozzá az új felhasználókat

## API Endpoint-ok (csak admin)

### GET /api/admin/users
Lekéri az összes felhasználót.
```
Query: email=admin@example.com
```

### GET /api/admin/orders
Lekéri az összes rendelést.
```
Query: email=admin@example.com
```

### POST /api/admin/users/role
Módosítja a felhasználó szerepét.
```json
{
  "adminEmail": "admin@example.com",
  "targetEmail": "user@example.com",
  "newRole": "admin"
}
```

### POST /api/admin/users/delete
Törli a felhasználót.
```json
{
  "adminEmail": "admin@example.com",
  "targetEmail": "user@example.com"
}
```

### POST /api/admin/orders/delete
Törli a rendelést.
```json
{
  "adminEmail": "admin@example.com",
  "orderId": 1234567890
}
```

### POST /api/admin/create-first-admin
Új admin fiók létrehozása (csak akkor működik, ha nincs még admin).
```json
{
  "email": "newadmin@example.com",
  "birthDate": "1990-01-01",
  "password": "securePassword123"
}
```

## Megjegyzések

- Az admin jelszava az users.json-ben van tárolva (éles alkalmazásban ezt hashelni kell!)
- Az admin panel automatikusan ellenőrzi az engedélyeket
- Admin csak admin lehet (nem módosítható magát)
- Az orders.json mappában az összes rendelés kerül tárolásra
