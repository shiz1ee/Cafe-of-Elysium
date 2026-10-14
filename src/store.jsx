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
    const count = Object.values(cart).reduce((a, b) => a + b, 0)

    return (
        <StoreContext.Provider value={{cart, add, count }}>
            {children}
        </StoreContext.Provider>
    )
}