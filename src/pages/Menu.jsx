import { useState } from "react";
import { CATEGORIES, ITEMS } from "../data";
import { useStore } from "../store";

export default function Menu() {
    const { add, cart } = useStore()
    const [cat, setCat] = useState(CATEGORIES[0].id)

    return (
        <div>
            <h2>Menu</h2>

            <div className="tabs">
                {CATEGORIES.map((c) => (
                    <button
                    key={c.id}
                    className={c.id === cat ? 'tab on' : 'tab'}
                    onClick={() => setCat(c.id)}
                    >
                        {c.name}
                    </button>
                ))}
            </div>

            <div className="grit">
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
        </div>
    )
}