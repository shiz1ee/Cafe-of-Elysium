import { useStore } from '../store.jsx'
import { playSound } from '../sounds.js'

const NEXT = {
    new: ['preparing', 'Start cooking'],
    preparing: ['done', 'Mark done'],
}

function Ticket({ order, index }) {
    const { setStatus } = useStore()
    const next = NEXT[order.status]

    return (
        <div
            className={`ticket t-${order.status}`}
            style={{ '--tilt': `${((index * 37) % 7) - 3}deg`}}
        >
            <span className="pin" />
            <div className="t-hand">Order #{order.id}</div>\
            <div className="t-name">{order.name}</div>
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
    const { orders, clearDone} = useStore()
    const active = orders.filter((o) => o.status !== 'done')
    const done = orders.filter((o) => o.status === 'done')

    return (
        <div>
            <h2>Kitchen</h2>
            <div className="rail" />

            <div className="tickets">
                {active.length === 0 && (
                    <p>No orders yet. Place one from the menu, and it will show up here.</p>
                )}
                {active.map((o, i) => <Ticket key={o.id} order={o} index={i} />)}
            </div>

            {done.length > 0 && (
                <>
                    <div className="row between">
                        <h3>Finished</h3>
                        <button className="btn" onClick={clearDone}>Clear finished</button>
                    </div>
                    <div className="tickets">
                        {done.map((o, i) => <Ticket key={o.id} order={o} index={i} />)}
                    </div>
                </>
            )}
        </div>
    )
}

