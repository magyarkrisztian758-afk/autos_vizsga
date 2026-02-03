import os
from supabase import create_client, Client
from faker import Faker
import random

# --- Supabase beállítások ---
# Ezek a felhasználó által megadott adatok
SUPABASE_URL = "https://dnwqbynwalkqcgyjhqpr.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRud3FieW53YWxrcWNneWpocXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMTY1MTMsImV4cCI6MjA4NTY5MjUxM30.F_qtMHqVgcR_zA0YenweMmKzrASjmIslLYuEc6muiRQ"

# Inicializáld a Supabase klienst
supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

fake = Faker('hu_HU') # Magyar adatok generálása

def generate_fake_product():
    """Véletlenszerű termékadatokat generál magyarul."""
    brands = ['Bosch', 'Brembo', 'VARTA', 'MANN', 'KYB', 'LuK', 'ATE', 'NGK', 'Mahle', 'Contitech']  # Maradhat angol, vagy magyarítsd ha kell
    categories = ['Fék', 'Szűrők', 'Elektromos', 'Futómű', 'Motor', 'Világítás', 'Hűtés', 'Kormányzás']
    
    # Magyar terméknevek
    magyar_nevek = ['Fékbetét', 'Olajszűrő', 'Akkumulátor', 'Lengéscsillapító', 'Gyújtógyertya', 'Vízszivattyú', 'Fényszóró', 'Kuplungtárcsa', 'Hűtőfolyadék', 'Légszűrő']
    product_name = random.choice(magyar_nevek) + " " + str(random.randint(100, 999))
    
    brand = random.choice(brands)
    category = random.choice(categories)
    
    # Magyar leírások
    magyar_leirasok = [
        'Ez egy kiváló minőségű alkatrész, amely megbízható teljesítményt nyújt.',
        'Ideális választás autójához, hosszú élettartammal rendelkezik.',
        'Professzionális szerelés ajánlott a legjobb eredmény érdekében.',
        'Ellenáll a kopásnak és a szélsőséges körülményeknek.',
        'Gyors és egyszerű telepítés, azonnali használatra kész.',
        'Megbízható márka, amelyre számíthat.',
        'Kiváló ár-érték arány, gazdaságos megoldás.',
        'Tökéletes illeszkedés a legtöbb autómodellhez.',
        'Csökkenti a zajt és javítja a vezetési élményt.',
        'Környezetbarát anyagokból készült.'
    ]
    description = random.choice(magyar_leirasok)
    
    product_data = {
        'bp_code': 'BP-' + str(random.randint(10000, 99999)),  # Nagyobb tartomány egyedi kódokhoz
        'name': product_name,
        'brand': brand,
        'oem': fake.bothify(text='????#####????'),  # Maradhat
        'category': category,
        'price': random.randint(2000, 150000),
        'stock': random.randint(1, 50),
        'image_url': f'IMAGES/{fake.slug(product_name)}.jpg',
        'description': description,
    }
    return product_data

def populate_database(num_products):
    """Feltölti az adatbázist a generált adatokkal."""
    print("Korábbi adatok törlése...")
    try:
        supabase.table('products').delete().execute()  # Törli az összes sort
        print("Adatok törölve.")
    except Exception as e:
        print(f"Hiba a törléskor: {e}")
    
    print(f"Adatbázis feltöltése {num_products} termékkel...")
    
    for i in range(num_products):
        product = generate_fake_product()
        try:
            # Adatok beszúrása a 'products' táblába
            # Az anon kulcs használatához engedélyezni kell az INSERT RLS szabályt a Supabase Dashboardon
            response = supabase.table('products').insert(product).execute()
            
            if response.data:
                print(f"Sikeresen beszúrva: {product['name']}")
            else:
                print(f"Hiba történt a beszúráskor (valószínűleg duplikált bp_code vagy RLS hiba): {response}")
                print(f"Hiba részletek: {response.error}")

        except Exception as e:
            print(f"Általános hiba: {e}")
            
    print("Feltöltés befejeződött.")

if __name__ == "__main__":
    # Generálj 250 terméket
    populate_database(250)