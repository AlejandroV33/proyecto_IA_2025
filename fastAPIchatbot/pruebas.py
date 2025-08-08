from dotenv import load_dotenv
import os
from baseDatos import DatabaseManager

load_dotenv()  # Carga las variables del archivo .env

DB_PATH = os.getenv("SQLITE_DB_PATH", "database.db")
print(f"DB_PATH usado: {DB_PATH}")

db_manager = DatabaseManager(DB_PATH)
schema = db_manager.get_schema()
print("Esquema de la base de datos:")
print(schema)