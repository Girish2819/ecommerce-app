import React, { useState } from 'react'
import './ChatWidget.css'
import { useCart } from '../../context/cart'

const DEFAULT_QUESTION = "Hi! I'm your shopping assistant — how can I help you today?"

const ChatWidget = ({ product = null }) => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useCart()

  const toggleOpen = () => {
    setOpen(!open)

    // show default assistant message when opening first time
    if (!open && messages.length === 0) {
      setMessages([{ role: 'assistant', content: DEFAULT_QUESTION }])
    }
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMsg = { role: 'user', content: input }
    const newHistory = [...messages, userMsg]
    setMessages(newHistory)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content, history: newHistory, product })
      })

      const data = await res.json()

      if (res.ok) {
        // support structured responses: { response, action }
        if (data.action && data.action.type === 'add_to_cart') {
          const product = data.action.product
          if (product) {
            const next = [...cart, product]
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
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }])
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network error.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-widget-container">
      {open && (
        <div className="chat-window">
          <div className="chat-header">Shopping Assistant</div>
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                {m.content}
              </div>
            ))}
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

      <button className="chat-toggle" onClick={toggleOpen} aria-label="Open chat">
        💬
      </button>
    </div>
  )
}

export default ChatWidget
