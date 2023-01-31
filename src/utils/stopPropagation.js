export const stopPropagation = e => {
  const ev = !e ? window.event : e
  ev.stopPropagation ? ev.stopPropagation() : (ev.cancelBubble = true)
}
