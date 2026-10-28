import React, { useEffect, useRef, useState } from 'react'
import './ChatWidget.css'
import { useCart } from '../../context/cart'
import { useNavigate } from 'react-router-dom'

const DEFAULT_QUESTION = "Hi! I'm your shopping assistant — how can I help you today?"
const QUICK_QUESTIONS = [
  'Help me choose a product',
  'Payment help',
  'Shipping and returns',
]
const AI_CHAT_API =
  process.env.REACT_APP_AI_API?.replace(/\/+$/, '') ||
  (process.env.NODE_ENV === 'development' ? '/api/ai/chat' : '')

const ChatWidget = ({ product = null }) => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useCart()
  const widgetRef = useRef(null)
  const toggleRef = useRef(null)
  const navigate = useNavigate()

  const toggleOpen = () => {
    if (!open && messages.length === 0) {
      setMessages([{ role: 'assistant', content: DEFAULT_QUESTION }])
    }
    setOpen((isOpen) => !isOpen)
  }

  useEffect(() => {
    if (!open) return undefined

    const handleOutsideClick = (event) => {
      if (
        !widgetRef.current?.contains(event.target) &&
        !toggleRef.current?.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick)
    return () => document.removeEventListener('pointerdown', handleOutsideClick)
  }, [open])

  const sendMessage = async (question = input) => {
    const message = question.trim()
    if (!message || loading) return

    const userMsg = { role: 'user', content: message }
    const history = messages.filter((item) => item.role !== 'system')
    setMessages([...history, userMsg])
    setInput('')
    setLoading(true)

    try {
      if (!AI_CHAT_API) {
        throw new Error('AI assistant is not configured for this deployment.')
      }

      const res = await fetch(
        AI_CHAT_API.endsWith('/api/ai/chat')
          ? AI_CHAT_API
          : `${AI_CHAT_API}/api/ai/chat`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, history, product })
        }
      )

      const contentType = res.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        throw new Error('The AI service returned an unexpected response.')
      }
      const data = await res.json()

      if (res.ok) {
        // support structured responses: { response, action }
        if (data.action && data.action.type === 'add_to_cart') {
          const productToAdd = data.action.product
          if (productToAdd) {
            const next = [...cart, productToAdd]
            setCart(next)
            localStorage.setItem('cart', JSON.stringify(next))
            setMessages(prev => [...prev, { role: 'assistant', content: data.response || 'Added to cart.' }])
          } else {
            setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
          }
        } else {
          setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
        }
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.detail || data.message || 'Sorry, something went wrong. Please try again.',
        }])
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: error.message === 'AI assistant is not configured for this deployment.'
          ? 'The AI assistant is not configured on this deployment. Please set REACT_APP_AI_API to the AI service URL.'
          : 'I could not connect to the AI assistant. Please check your connection and try again.',
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-widget-container">
      {open && (
        <div className="chat-window" ref={widgetRef}>
          <div className="chat-header">
            <span>Shopping Assistant</span>
            <button
              type="button"
              className="chat-close"
              onClick={() => setOpen(false)}
              aria-label="Minimize chat"
              title="Minimize chat"
            >
              &minus;
            </button>
          </div>
          <div className="chat-subheader">
            AI shopping help, whenever you need it
          </div>
          <div className="chat-body" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="chat-msg assistant">Thinking...</div>}
            {messages.length <= 1 && (
              <div className="chat-quick-questions" aria-label="Quick questions">
                <p>Quick questions</p>
                {QUICK_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendMessage(question)}
                    disabled={loading}
                  >
                    {question}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => navigate('/dashboard/user/orders')}
                >
                  Track my order
                </button>
              </div>
            )}
          </div>
          <div className="chat-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..."
              onKeyDown={e => { if (e.key === 'Enter') sendMessage() }}
            />
            <button onClick={sendMessage} disabled={loading}>{loading ? '...' : 'Send'}</button>
          </div>
        </div>
      )}

      <button
        ref={toggleRef}
        className="chat-toggle"
        onClick={toggleOpen}
        aria-label={open ? 'Minimize chat' : 'Open chat'}
        aria-expanded={open}
      >
        💬
      </button>
    </div>
  )
}

export default ChatWidget
