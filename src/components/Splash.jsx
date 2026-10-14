import { useState, useEffect } from "react";

export default function Splash({ onDone }) {
    const [fading, setFading] = useState(false)

    useEffect(() => {
        const t1 = setTimeout(() => setFading(true), 2800) //2.8
        const t2 = setTimeout(onDone, 3900) // 1.1
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [onDone])

    const skip = () => {
        setFading(true)
        setTimeout(onDone, 500)
    }

    return (
        <div className={fading ? 'splash fade' : 'splash'} onClick={skip}>
            <img className="icon splash-icon" src="/icons/Croissant.png" alt="" width="96" height="96"/>
            <h1>CAFE OF<br />ELYSIUM</h1>
            <p className="dots">opening soon <span>.</span><span>.</span><span>.</span></p>
            <small>click to skip</small>
        </div>
    )
} 