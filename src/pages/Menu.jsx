import { useState } from "react";
import { CATEGORIES, ITEMS } from "../data";
import { useStore } from "../store";

export default function Menu() {
    const { add, cart } = useStore()
    const [cat, setCat] = useState(CATEGORIES[0].id)
    const [open, setOpen] = useState(() => !!sessionStorage.getItem('bookSeen'))
    const cuttent = CATEGORIES.find((c) => c.id === cat)

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
                <h2>{cuttent.name}</h2>
                <p>{cuttent.blurb}</p>
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