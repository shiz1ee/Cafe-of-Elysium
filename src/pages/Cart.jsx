import { Link } from 'react-router-dom'
import { ITEMS } from '../data.js'
import { useStore } from '../store.jsx'

export default function Cart() {
  const { cart, add, sub, remove } = useStore()

  // turn { ChocolateCake: 2 } into full item info plus quantity
  const lines = Object.entries(cart)
    .map(([id, qty]) => ({ ...ITEMS.find((i) => i.id === id), qty }))
    .filter((l) => l.name)

  const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0)

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
        </>
      )}
    </div>
  )
}

//used AI