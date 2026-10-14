import { createContext, useContext, useEffect, useState } from 'react'

const StoreContext = createContext(null)
export const useStore = () => useContext(StoreContext)

export function StoreProvider({children}) {
    //{Chocolatecake: 2, Croissant: 1} (item id -> quantity)

    const [cart, setCart] = useState(() => {
        try { return JSON.parse(localStorage.getItem('cart')) || {} } catch { return {} }
    })

    //Implimenting Real-time updatesssssss
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

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
    const count = Object.values(cart).reduce((a, b) => a + b, 0)

    return (
        <StoreContext.Provider value={{cart, add, count, sub, remove}}>
            {children}
        </StoreContext.Provider>
    )
}