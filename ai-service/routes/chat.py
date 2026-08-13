from fastapi import APIRouter, HTTPException

from app.models.chat import ChatRequest, ChatResponse
from app.services.chat_service import generate_response


router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):

    try:

        raw = generate_response(
            message=request.message,
            history=request.history,
            product=request.product
        )

        # raw may be a plain string or a dict {response, action}
        if isinstance(raw, dict):
            return ChatResponse(response=raw.get("response",""), action=raw.get("action"))

        return ChatResponse(response=raw)

    except Exception as error:

        print("AI ERROR:", error)

        raise HTTPException(
            status_code=500,
            detail="Something went wrong while processing your request."
        )