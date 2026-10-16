export function playSound(src, volume = 0.5) {
  // stay quiet if the person muted the music
  if (localStorage.getItem('muted') === '1') return
  const s = new Audio(src)
  s.volume = volume
  s.play().catch(() => {})
}