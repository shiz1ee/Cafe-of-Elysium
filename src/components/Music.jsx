import { useEffect, useRef, useState } from "react";

const TRACKS = ['/music/cozy1.mp3','/music/cozy2.mp3','/music/cozy3.mp3','/music/cozy4.mp3',]
const VOL = 0.3

export default function Music() {
    const audio = useRef(null)
    const [muted, setMuted] = useState(() => localStorage.getItem('muted') === '1')
    const mutedRef = useRef(muted)

    useEffect(() => { mutedRef.current = muted }, [muted])

    useEffect(() => {
        let index = 0
        const a = new Audio(TRACKS[index])
        a.volume = 0
        audio.current = a
        let fade

        const next = () => {
            index = (index + 1) % TRACKS.length
            a.src = TRACKS[index]
            a.play().catch(() => {})
        }
        a.addEventListener('ended', next)

        const start = () => {
            if (mutedRef.current) return
            a.play().then(() => {
                fade = setInterval(() => {
                    a.volume = Math.min(VOL, a.volume + 0.02)
                    if (a.volume >= VOL) clearInterval(fade)
                }, 60)
            }).catch(() => {})
        }
        document.addEventListener('click', start, {once: true})

        const onVisibility = () => {
            if (document.hidden) a.pause()
                else if (!mutedRef.current && a.currentTime > 0) a.play().catch(() => {})
        }
        document.addEventListener('visibilitychange', onVisibility)

        return () => {
            clearInterval(fade)
            a.pause()
            a.removeEventListener('ended', next)
            document.removeEventListener('click', start)
            document.addEventListener('visibilitychange', onVisibility)
        }
    }, [])

    const toggle = (e) => {
        e.stopPropagation()
        const a = audio.current
        const nextMuted = !muted
        setMuted(nextMuted)
        localStorage.setItem('muted', nextMuted ? '1' : '0')
        if (nextMuted) a.pause()
        else {a.volume = VOL; a.play().catch(() => {}) }
    }

    return (
        <button className="mute" onClick={toggle} aria-label={muted ? 'Unmute music' : 'Mute music'}>
            Music<br />{muted ? 'off' : 'on'}
        </button>
    )
}