import Cart from "./pages/Cart";
import Kitchen from "./pages/Kitchen";
import Menu from "./pages/Menu";
import {Routes, Route, NavLink } from 'react-router-dom'

export default function App() {
  return (
    <>
      <header>
        <NavLink to="/" className="logo">Cafe of Elysium</NavLink>
        <nav>
          <NavLink to="/" end>Menu</NavLink>
          <NavLink to="/cart" end>Cart</NavLink>
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