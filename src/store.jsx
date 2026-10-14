import { createContext, useContext, useEffect, useState } from 'react'

const StoreContext = createContext(null)
export const useStore = () => useContext(StoreContext)

const load = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback}
}

export function StoreProvider({children}) {
    //{Chocolatecake: 2, Croissant: 1} (item id -> quantity)
    const [cart, setCart] = useState(() => load('cart', {}))
    const [orders, setOrders] = useState(() => load('orders', []))

    useEffect(() => {localStorage.setItem('cart', JSON.stringify(cart)) }, [cart])
    useEffect(() => {localStorage.setItem('orders', JSON.stringify(orders)) }, [orders])

    //Implimenting Real-time updatesssssss
    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === 'orders') setOrders(load('orders', []))
            if (e.key === 'cart') setCart(load('cart', {}))
        }
        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [])

    const add = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1}))

    const sub = (id) => setCart((c) => {
        const n = { ...c}
        if ((n[id] || 0) <= 1) delete n[id]
        else n[id] -= 1
        return n
    })

    const remove = (id) => setCart((c) => {
        const n = { ...c}
        delete n[id]
        return n
    })

    const placeOrder = (name, items) => {
        const id = orders.reduce((max, o ) => Math.max(max, o.id), 0) + 1
        setOrders((o) => [...o, {id, name: name || 'Guest', items, status: 'new', time: Date.now() }])
        setCart({})
        return id
    }

    const setStatus = (id, status) =>
        setOrders((o) => o.map((x) => (x.id === id ? { ...x, status } : x)))

    const clearDone = () => setOrders((o) => o.filter((x) => x.status !== 'done'))
    

    const count = Object.values(cart).reduce((a, b) => a + b, 0)

    return (
        <StoreContext.Provider value={{cart, add, count, sub, remove, orders, placeOrder, setStatus, clearDone}}>
            {children}
        </StoreContext.Provider>
    )
}