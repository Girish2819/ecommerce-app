from app.config.settings import settings

_llm = None

def get_llm():
    """Lazily construct and return the ChatGroq LLM instance.

    This avoids import-time initialization errors when dependencies or API
    credentials are not available during startup.
    """
    global _llm
    if _llm is None:
        try:
            from langchain_groq import ChatGroq
        except Exception as exc:
            raise ImportError("langchain_groq is not available: " + str(exc))

        _llm = ChatGroq(
            model="llama-3.3-70b-versatile",
            temperature=0.3,
            api_key=settings.GROQ_API_KEY
        )

    return _llm
