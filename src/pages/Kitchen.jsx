import { useStore } from '../store.jsx'
import { playSound } from '../sounds.js'
import { useEffect, useState } from 'react'

const NEXT = {
    new: ['preparing', 'Start cooking'],
    preparing: ['done', 'Mark done'],
}

const LATE = 2 * 60 * 1000
const VERY_LATE = 5 * 60 * 1000

const fmt = (ms) => {
    const s = Math.floor( ms / 1000)
    return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`
}

function Ticket({ order, index, now }) {
    const { setStatus } = useStore()
    const next = NEXT[order.status]

    const waited = now - order.time
    const urgency = 
    order.status === 'done' ? '' : waited > VERY_LATE ? 'very-late' : waited > LATE ? 'late' : ''

    return (
        <div
            className={`ticket t-${order.status} ${urgency}`}
            style={{ '--tilt': `${((index * 37) % 7) - 3}deg`}}
        >
            <span className="pin" />
            <div className="t-hand">Order #{order.id}</div>
            <div className="t-name">{order.name}</div>
            {order.status !== 'done' && <div className="timer">Waiting {fmt(waited)}</div>}
            <ul>
                {order.items.map((it, i) => (
                    <li key={i}>{it.qty}x {it.name}</li>
                ))}
            </ul>
            {next && (
                <button className="btn" onClick={() => {
                    setStatus(order.id, next[0])
                    if (next[0] === 'done') playSound('/sounds/done.mp3')
                }}>
                    {next[1]}
                </button>
            )}
            {order.status === 'done' && <div className="stamp">DONE</div>}
        </div>
    )
}

export default function Kitchen() {
    const [now, setNow] = useState(Date.now())
    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(id)
    }, [])

    const { orders, clearDone} = useStore()
    const visible = orders.filter((o) => !o.hidden)
    const active = visible.filter((o)=> o.status !== 'done')
    const done = visible.filter((o) => o.status === 'done')

    //foer counting orders and including the cleared ones
    const tally = {}
    let earned = 0
    orders.forEach((o)=> {
        o.items.forEach((it) => {tally[it.name] = (tally[it.name] || 0) + it.qty })
        if (o.status === 'done') o.items.forEach((it) => { earned += (it.price || 0) * it.qty})     
    })
    const top = Object.entries(tally).sort((a, b) => b[1] - a[1])[0]

    return (
        <div>
            <h2>Kitchen</h2>
            <div className="stats">
                <div className="stat"><span>Orders</span><b>{orders.length}</b></div>
                <div className="stat"><span>Most ordered</span><b>{top ? `${top[0]} (${top[1]})` : '-'}</b></div>
                <div className="stat"><span>Earned</span><b>${earned.toFixed(2)}</b></div>
            </div>
            <div className="rail" />

            <div className="tickets">
                {active.length === 0 && (
                    <p>No orders yet. Place one from the menu, and it will show up here.</p>
                )}
                {active.map((o, i) => <Ticket key={o.id} order={o} index={i} now={now} />)}
            </div>

            {done.length > 0 && (
                <>
                    <div className="row between">
                        <h3>Finished</h3>
                        <button className="btn" onClick={clearDone}>Clear finished</button>
                    </div>
                    <div className="tickets">
                        {done.map((o, i) => <Ticket key={o.id} order={o} index={i} now={now} />)}
                    </div>
                </>
            )}
        </div>
    )
}

