import { useState } from "react";
import { CATEGORIES, ITEMS } from "../data";
import { useStore } from "../store";

export default function Menu() {
    const { add, cart } = useStore()
    const [cat, setCat] = useState(CATEGORIES[0].id)
    const [open, setOpen] = useState(() => !!sessionStorage.getItem('bookSeen'))
    const current = CATEGORIES.find((c) => c.id === cat)
    const day = Math.floor(Date.now() / 86400000)
    const special = ITEMS[day % ITEMS.length]

    if (!open) {
        return (
            <div className="book-wrap">
                <button
                className="cover"
                onClick={() => {sessionStorage.getItem('bookSeen', '1'); setOpen(true)}}
                >
                    <span className="cover-title">MENU</span>
                    <span className="cover-sub">Cafe of Elysium</span>
                    <span className="blink">click to open</span>
                </button>
            </div>
        )
    }

    return (
        <div className="book menu-open">
            <div className="tabs">
                {CATEGORIES.map((c) => (
                    <button
                    key={c.id}
                    className={c.id === cat ? 'tab on' : 'tab'}
                    style={{ background: c.color }}
                    onClick={() => setCat(c.id)}
                    >
                        {c.name}
                    </button>
                ))}
            </div>

            <section className="page left">
                <h2>{current.name}</h2>
                <p>{current.blurb}</p>
                <div className="special">
                    <div className="special-label">Today's Special</div>
                    <img className= "icon" src={special.img} alt={special.name} width="96" height="96"/>
                    <div className="item-name">{special.name}</div>
                    <div className="price">${special.price.toFixed(2)}</div>
                    <button className="btn" onClick={() => add(special.id)}>Add</button>
                </div>
            </section>

            <section className="page right"> 
                <div className="grid">
                    {ITEMS.filter((item) => item.cat === cat).map((item) => (
                        <div className="card" key={item.id}>
                            <img className="icon" src={item.img} alt={item.name} width="96" height= "96" />
                            <div className="item-name">{item.name}</div>
                            <div className="price">${item.price.toFixed(2)}</div>
                            <button className="btn" onClick={() => add(item.id)}>
                                Add{cart[item.id] ? `(${cart[item.id]})` : ''}
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}