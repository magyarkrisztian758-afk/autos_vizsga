import os
from supabase import create_client, Client

# --- Supabase beállítások ---
SUPABASE_URL = "https://dnwqbynwalkqcgyjhqpr.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRud3FieW53YWxrcWNneWpocXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMTY1MTMsImV4cCI6MjA4NTY5MjUxM30.F_qtMHqVgcR_zA0YenweMmKzrASjmIslLYuEc6muiRQ"

# Inicializáld a Supabase klienst
supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

def delete_all_products():
    """Törli az összes terméket az adatbázisból."""
    print("Adatok törlése...")
    try:
        # Törli az összes sort, ahol bp_code nem üres (feltételezve, hogy minden sornak van)
        response = supabase.table('products').delete().neq('bp_code', '').execute()
        print("Az összes adat törölve.")
    except Exception as e:
        print(f"Hiba a törléskor: {e}")

if __name__ == "__main__":
    delete_all_products()