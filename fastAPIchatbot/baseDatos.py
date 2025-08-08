import sqlite3
import json
from typing import List, Dict, Any


class DatabaseManager:
    def __init__(self, db_path: str):
        self.db_path = db_path

    def get_schema(self) -> str:
        """Obtiene el esquema de la base de datos"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()

        schema = []
        for table in tables:
            table_name = table[0]
            cursor.execute(f"PRAGMA table_info({table_name});")
            columns = cursor.fetchall()

            schema.append({
                "table": table_name,
                "columns": [{"name": col[1], "type": col[2]} for col in columns]
            })

        conn.close()
        return json.dumps(schema, indent=2)

    def execute_query(self, sql_query: str) -> List[Dict[str, Any]]:
        """Ejecuta una consulta SQL y devuelve los resultados"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row  # Para obtener diccionarios
        cursor = conn.cursor()

        cursor.execute(sql_query)
        results = cursor.fetchall()

        conn.close()
        return [dict(row) for row in results]