from langchain_core.messages import HumanMessage, AIMessage, SystemMessage


SYSTEM_PROMPT = """
You are an AI shopping assistant for an e-commerce website.

Your job is to help customers:

- Find products
- Understand product features
- Compare products
- Choose products based on their needs
- Give concise and useful shopping advice

Important rules:

1. Be friendly and helpful.
2. Do not invent products.
3. Do not invent prices.
4. If you do not have product information, say that you don't know.
5. Keep responses concise.
6. When product information is provided, use only that information.
"""


GENERAL_ALLOWED_QUESTIONS = (
    "You may answer product-availability, shipping, returns, warranty, and basic usage questions. "
    "If the user asks for comparisons, prices, or information not present in the provided product description, "
    "explicitly say you don't know or that the information isn't available."
)


def generate_response(
    message: str,
    history: list,
    product: dict | None = None,
):

    messages = [
        SystemMessage(content=SYSTEM_PROMPT)
    ]

    # If a product context is provided, add a restrictive system message
    if product:
        product_info = (
            f"Product title: {product.get('title','')}.\n"
            f"Product description: {product.get('description','')}.\n"
            f"Available: {product.get('available', True)}.\n"
        )

        product_system = (
            "ONLY use the product information below to answer product-specific questions.\n"
            "Do NOT invent details not present in the description. If asked about something not in the description, "
            "respond: 'I don't have that information about this product.'\n"
            + product_info
            + "Allowed general questions: " + GENERAL_ALLOWED_QUESTIONS
        )

        messages.append(SystemMessage(content=product_system))

    # Add previous conversation
    for item in history:

        if item.role == "user":
            messages.append(
                HumanMessage(content=item.content)
            )

        elif item.role == "assistant":
            messages.append(
                AIMessage(content=item.content)
            )

    # Add current user message
    messages.append(
        HumanMessage(content=message)
    )

    # Use lazy getter for llm to avoid import-time errors
    llm = None
    try:
        from services.llm_service import get_llm
        llm = get_llm()
    except Exception:
        # If the LLM cannot be constructed, log the error and return a fallback message
        import traceback
        print("LLM INITIALIZATION ERROR:")
        traceback.print_exc()
        return "Sorry, the AI service is currently unavailable."

    response = llm.invoke(messages)

    text = response.content

    # Attempt to parse JSON from the model if it returned structured output
    import json

    try:
        parsed = json.loads(text)
        # Expecting format: {"response": "...", "action": {...}}
        resp_text = parsed.get("response") or ""
        action = parsed.get("action")
        # Return a JSON string to be interpreted by the route
        return {"response": resp_text, "action": action}
    except Exception:
        # Not JSON — return plain text
        return text