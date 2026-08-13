from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)
    history: list[ChatMessage] = []
    # Optional product context to restrict assistant answers to a specific product
    product: dict | None = None


class ChatResponse(BaseModel):
    response: str
    action: dict | None = None