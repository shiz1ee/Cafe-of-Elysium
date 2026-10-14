import Cart from "./pages/Cart";
import Kitchen from "./pages/Kitchen";
import Menu from "./pages/Menu";
import {Routes, Route, NavLink } from 'react-router-dom'
import { useStore } from "./store";

export default function App() {
  const {count} = useStore()
  return (
    <>
      <header>
        <NavLink to="/" className="logo">Cafe of Elysium</NavLink>
        <nav>
          <NavLink to="/" end>Menu</NavLink>
          <NavLink to="/cart">Cart{count > 0 && <span className="badge">{count}</span>}</NavLink>
          <NavLink to="/kitchen" end>Kitchen</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/kitchen" element={<Kitchen />} />
        </Routes>
      </main>
    </>
  )
}