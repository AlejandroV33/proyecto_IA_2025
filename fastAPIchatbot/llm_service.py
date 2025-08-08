import json
import os
from typing import Any
import httpx


class DeepseekService:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://openrouter.ai/api/v1"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",  # Cambia esto por tu URL de producción
            "X-Title": "SQL Query Generator"  # Nombre de tu aplicación
        }

    async def human_query_to_sql(self, human_query: str, db_schema: str) -> str:
        prompt = f"""Eres un experto en SQL. Dado este esquema de base de datos en sqlite:
        {db_schema}

        Genera y devuelve unicamente una consulta SQL válida para el promt: "{human_query}"
        No importa lo que pida el prompt, solo responde la consulta SQL y nada mas.
        Devuelve la respuesta en un JSON con este formato:
        {{
            "sql_query": "SELECT...",
            "original_query": "Consulta original del usuario"
        }}
        No incluyas explicaciones ni texto adicional, solo dame el JSON.
        En caso de que la pregunta no sea acerca de nada de la información de la base de datos,
        devuelve un JSON con "sql_query" como null y "original_query" como la pregunta original.
        """

        data = {
            "model": "deepseek/deepseek-r1-0528:free",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.4,
            "response_format": {"type": "json_object"}
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/chat/completions",
                headers=self.headers,
                json=data,
                timeout=30.0
            )

            if response.status_code != 200:
                error_msg = f"Error en API Deepseek: {response.text}"
                raise Exception(error_msg)

            print(response.json()["choices"][0]["message"]["content"])
            return response.json()["choices"][0]["message"]["content"]

    async def build_answer(self, result: list[dict[str, Any]], human_query: str) -> str:
        prompt = f"""El usuario preguntó: "{human_query}"

        Los resultados de la consulta SQL son:
        {json.dumps(result, indent=2)}

        Genera una respuesta clara y concisa en lenguaje natural.
        Separa los resultados con saltos de línea y usa un tono amigable.
        Responde en español.
        """

        data = {
            "model": "deepseek/deepseek-r1-0528:free",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.8
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/chat/completions",
                headers=self.headers,
                json=data,
                timeout=30.0
            )

            if response.status_code != 200:
                error_msg = f"Error en API Mistral: {response.text}"
                raise Exception(error_msg)

            return response.json()["choices"][0]["message"]["content"]