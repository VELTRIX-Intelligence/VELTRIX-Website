'use client'

/**
 * STAND-IN for the 21st.dev "Halftone Wordmark Footer" (kedhareswer), built from
 * the plan's description until the original source can be downloaded:
 *  - a huge word drawn in halftone dots, cropped by the bottom edge
 *  - dots part around the pointer and warm from Mist towards Acid Lime
 *  - a click (or tap) sends one ripple through the letters
 *  - no pointer / reduced motion: dots are static; a tap triggers one ripple
 *    (reduced motion: no ripple)
 * Decorative: the canvas is aria-hidden; the parent keeps a visually hidden word.
 */

import { useEffect, useRef } from 'react'

interface HalftoneWordmarkProps {
  word?: string
  className?: string
  /** Rest colour of the dots. */
  dotColor?: [number, number, number]
  /** Colour the dots warm towards when disturbed. */
  warmColor?: [number, number, number]
}

interface Dot {
  hx: number
  hy: number
  r: number
  ox: number
  oy: number
  vx: number
  vy: number
}

const BUCKETS = 8
const MIST: [number, number, number] = [208, 214, 224]
const LIME: [number, number, number] = [228, 242, 34]

export default function HalftoneWordmark({
  word = 'VELTRIX',
  className = '',
  dotColor = MIST,
  warmColor = LIME,
}: HalftoneWordmarkProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    let dots: Dot[] = []
    let width = 0
    let height = 0
    let spacing = 8
    let raf = 0
    let visible = false
    let pointer: { x: number; y: number } | null = null
    let ripple: { x: number; y: number; start: number; max: number } | null = null

    const palette = Array.from({ length: BUCKETS + 1 }, (_, i) => {
      const t = i / BUCKETS
      const c = dotColor.map((v, k) => Math.round(v + (warmColor[k] - v) * t))
      return `rgb(${c[0]}, ${c[1]}, ${c[2]})`
    })

    const build = () => {
      width = wrap.clientWidth
      if (!width) return
      height = Math.round(width * 0.24)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Draw the word on an offscreen canvas to use as a coverage mask.
      const off = document.createElement('canvas')
      off.width = width
      off.height = height
      const octx = off.getContext('2d')
      if (!octx) return
      const family = getComputedStyle(document.body).fontFamily || 'sans-serif'
      let size = width * 0.3
      octx.font = `590 ${size}px ${family}`
      const measured = octx.measureText(word).width
      size = size * ((width * 0.98) / measured)
      octx.font = `590 ${size}px ${family}`
      octx.textAlign = 'center'
      octx.textBaseline = 'alphabetic'
      octx.fillStyle = '#fff'
      // Cap height ≈ 0.73em; crop roughly the bottom fifth of the letters.
      const capTop = height * 0.12
      octx.fillText(word, width / 2, capTop + size * 0.73 + size * 0.73 * 0.2)
      const data = octx.getImageData(0, 0, width, height).data

      spacing = Math.max(5, Math.min(10, Math.round(width / 150)))
      dots = []
      for (let y = spacing / 2; y < height; y += spacing) {
        for (let x = spacing / 2; x < width; x += spacing) {
          const a = data[(Math.floor(y) * width + Math.floor(x)) * 4 + 3] / 255
          if (a < 0.4) continue
          // Halftone gradient: denser dots towards the bottom edge.
          const fall = 0.45 + 0.55 * (y / height)
          dots.push({ hx: x, hy: y, r: spacing * 0.42 * fall, ox: 0, oy: 0, vx: 0, vy: 0 })
        }
      }
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const buckets: Dot[][] = Array.from({ length: BUCKETS + 1 }, () => [])
      for (const d of dots) {
        const disp = Math.hypot(d.ox, d.oy)
        const t = Math.min(1, disp / (spacing * 2.5))
        buckets[Math.round(t * BUCKETS)].push(d)
      }
      buckets.forEach((list, i) => {
        if (!list.length) return
        ctx.fillStyle = palette[i]
        ctx.beginPath()
        for (const d of list) {
          const x = d.hx + d.ox
          const y = d.hy + d.oy
          ctx.moveTo(x + d.r, y)
          ctx.arc(x, y, d.r, 0, Math.PI * 2)
        }
        ctx.fill()
      })
    }

    const step = (now: number) => {
      raf = 0
      const R = Math.max(60, width * 0.07)
      let busy = false
      let ringR = -1
      if (ripple) {
        const t = (now - ripple.start) / 600
        if (t >= 1) ripple = null
        else {
          ringR = ripple.max * (1 - Math.pow(1 - t, 3))
          busy = true
        }
      }
      for (const d of dots) {
        let tx = 0
        let ty = 0
        if (pointer) {
          const dx = d.hx - pointer.x
          const dy = d.hy - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < R && dist > 0.01) {
            const push = (R - dist) * 0.45
            tx += (dx / dist) * push
            ty += (dy / dist) * push
          }
        }
        if (ripple && ringR >= 0) {
          const dx = d.hx - ripple.x
          const dy = d.hy - ripple.y
          const dist = Math.hypot(dx, dy) || 1
          const band = Math.abs(dist - ringR)
          if (band < 28) {
            const f = (1 - band / 28) * 10
            tx += (dx / dist) * f
            ty += (dy / dist) * f
          }
        }
        d.vx = (d.vx + (tx - d.ox) * 0.12) * 0.78
        d.vy = (d.vy + (ty - d.oy) * 0.12) * 0.78
        d.ox += d.vx
        d.oy += d.vy
        if (!busy && (Math.abs(d.ox) > 0.05 || Math.abs(d.oy) > 0.05 || Math.abs(d.vx) > 0.05)) busy = true
      }
      draw()
      if ((busy || pointer) && visible) raf = requestAnimationFrame(step)
    }

    const wake = () => {
      if (!raf && visible && !reduce) raf = requestAnimationFrame(step)
    }

    const local = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const onMove = (e: PointerEvent) => {
      if (!finePointer || e.pointerType !== 'mouse') return
      pointer = local(e)
      wake()
    }
    const onLeave = () => {
      pointer = null
      wake()
    }
    const onDown = (e: PointerEvent) => {
      if (reduce) return
      const p = local(e)
      ripple = { ...p, start: performance.now(), max: Math.hypot(width, height) }
      wake()
    }

    const ro = new ResizeObserver(() => build())
    ro.observe(wrap)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) wake()
    })
    io.observe(canvas)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('pointerdown', onDown)
    document.fonts?.ready.then(build).catch(() => {})
    build()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('pointerdown', onDown)
    }
  }, [word, dotColor, warmColor])

  return (
    <div ref={wrapRef} className={`w-full ${className}`}>
      <canvas ref={canvasRef} aria-hidden="true" className="block w-full touch-pan-y" />
    </div>
  )
}
