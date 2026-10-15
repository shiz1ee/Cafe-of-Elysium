import { useState, useEffect } from "react";

export default function Splash({ onDone }) {
    const [fading, setFading] = useState(false)

    const enter = () => {
        if (fading) return
        setFading(true)
        setTimeout(onDone, 1100) 
    }

    return (
        <div className={fading ? 'splash fade' : 'splash'} onClick={enter}>
            <img className="icon splash-icon" src="/icons/Croissant.png" alt="" width="96" height="96"/>
            <h1>CAFE OF<br />ELYSIUM</h1>
            <p className="blink">click to enter</p>
        </div>
    )
} 