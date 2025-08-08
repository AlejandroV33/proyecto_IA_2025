import json
import logging
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from typing import Any, Optional
from llm_service import DeepseekService
from baseDatos import DatabaseManager

# Configuración inicial
load_dotenv()
logger = logging.getLogger(__name__)

app = FastAPI(
    title="DeepSeek SQL Assistant API",
    description="API que transforma consultas naturales a SQL usando Mistral 7B"
)

# Configuración CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción se cambia
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuración
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
DB_PATH = os.getenv("SQLITE_DB_PATH", "database.db")

# Inicialización de servicios
db_manager = DatabaseManager(DB_PATH)
deepseek_service = DeepseekService(OPENROUTER_API_KEY)
print(db_manager.get_schema())

class QueryRequest(BaseModel):
    query: str


class QueryResponse(BaseModel):
    answer: str
    sql_query: Optional[str] = None
    db_results: Optional[Any] = None
    error: Optional[str] = None


@app.post("/query", response_model=QueryResponse)
async def consulta_usuario(request: QueryRequest):
    """
    Endpoint principal que:
    1. Recibe una consulta en lenguaje natural
    2. Genera SQL usando Mistral
    3. Ejecuta la consulta en la base de datos
    4. Devuelve una respuesta en lenguaje natural
    """
    try:
        # Obtener esquema de la base de datos
        db_schema = db_manager.get_schema()
        print("Esquema de la base de datos:\n")
        print(db_schema)

        # Generar consulta SQL
        sql_response = await deepseek_service.human_query_to_sql(
            human_query=request.query,
            db_schema=db_schema
        )
        sql_data = json.loads(sql_response)

        # Si no es una consulta válida para la base de datos
        if not sql_data.get("sql_query"):
            return {
                "answer": "Lo siento, solo puedo responder preguntas acerca de la información en la base de datos.",
                "sql_query": None,
                "db_results": None
            }

        sql_query = sql_data["sql_query"]

        # Ejecutar consulta SQL
        db_results = db_manager.execute_query(sql_query)

        # Generar respuesta natural
        answer = await deepseek_service.build_answer(
            result=db_results,
            human_query=request.query
        )

        return {
            "answer": answer,
            "sql_query": sql_query,
            "db_results": db_results
        }

    except HTTPException:
        raise
    except json.JSONDecodeError as e:
        logger.error(f"Error decodificando JSON: {str(e)}")
        raise HTTPException(status_code=500, detail="Error procesando respuesta del modelo")
    except Exception as e:
        logger.error(f"Error inesperado: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Ocurrió un error procesando tu consulta",
                "details": str(e)
            }
        )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_config="log.ini"  # Opcional: configuración de logging
    )