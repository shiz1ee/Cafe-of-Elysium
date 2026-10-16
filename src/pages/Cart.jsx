import { Link } from 'react-router-dom'
import { ITEMS } from '../data.js'
import { useStore } from '../store.jsx'
import { useState } from 'react'
import { playSound } from '../sounds.js'


const LABEL = { new: 'Order received', preparing: 'Cooking...', done: 'Ready!' }

export default function Cart() {
  const { cart, add, sub, remove, placeOrder, orders } = useStore()
  const [name, setName] = useState('')
  const [placed, setPlaced] = useState(null)

  // turn { ChocolateCake: 2 } into full item info plus quantity
  const lines = Object.entries(cart)
    .map(([id, qty]) => ({ ...ITEMS.find((i) => i.id === id), qty }))
    .filter((l) => l.name)

  const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0)

  const place = () => {
    const id = placeOrder(
        name.trim(),
        lines.map((l) => ({name: l.name, qty: l.qty, price: l.price }))
    )
    setPlaced(id)
    playSound('/sounds/ding.mp3')
    setName('')
  }

  return (
    <div className="cart-page">
      <h2>Your tray</h2>

      {lines.length === 0 ? (
        <p>
          The tray is empty. <Link to="/">Open the menu</Link> and pick something.
        </p>
      ) : (
        <>
          <ul className="lines">
            {lines.map((l) => (
              <li key={l.id}>
                <img className="icon" src={l.img} alt="" width="48" height="48" />
                <span className="grow">{l.name}</span>
                <button className="mini" onClick={() => sub(l.id)}>-</button>
                <b>{l.qty}</b>
                <button className="mini" onClick={() => add(l.id)}>+</button>
                <span className="amt">${(l.price * l.qty).toFixed(2)}</span>
                <button className="mini" onClick={() => remove(l.id)}>x</button>
              </li>
            ))}
          </ul>
          <div className="total">Total: ${total.toFixed(2)}</div>

          <div className="row">
            <input
              placeholder="Your name or table no."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="btn" onClick={place}>Place order</button>
          </div>
        </>
      )}

      {placed && <p className="ok">Order #{placed} sent to the kitchen!</p>}

      {orders.length > 0 && (
        <>
          <h3>Your orders</h3>
          <ul className="status-list">
            {[...orders].reverse().map((o) => (
              <li key={o.id}>
                <b>#{o.id}</b> {o.name}
                <span className={`pill ${o.status}`}>{LABEL[o.status]}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

//used AI