import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './prefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Splits text content into words, groups them into visual lines, wraps each
 * line in an overflow-hidden mask and reveals with a staggered y-translate.
 * Words that were inside <em> keep an .rt-accent class (italic display face).
 * Reduced motion: instant, no split.
 */
function splitIntoLines(el) {
  if (!el.dataset.original) el.dataset.original = el.innerHTML
  el.innerHTML = el.dataset.original

  // Flatten to word spans
  const words = []
  const walk = (node, accented) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        child.textContent.split(/\s+/).forEach((part) => {
          if (part) words.push({ text: part, accented })
        })
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child, accented || child.tagName === 'EM')
      }
    })
  }
  walk(el, false)

  el.innerHTML = ''
  const spans = words.map(({ text, accented }, i) => {
    const s = document.createElement('span')
    s.className = accented ? 'rt-word rt-accent' : 'rt-word'
    s.textContent = text
    el.appendChild(s)
    if (i < words.length - 1) el.appendChild(document.createTextNode(' '))
    return s
  })

  // Group into lines by offsetTop
  const lines = []
  let top = null
  spans.forEach((s) => {
    if (s.offsetTop !== top) {
      top = s.offsetTop
      lines.push([])
    }
    lines[lines.length - 1].push(s)
  })

  // Rebuild: one mask per line
  el.innerHTML = ''
  return lines.map((lineWords) => {
    const mask = document.createElement('span')
    mask.className = 'rt-mask'
    const inner = document.createElement('span')
    inner.className = 'rt-line'
    lineWords.forEach((w, i) => {
      inner.appendChild(w)
      if (i < lineWords.length - 1) inner.appendChild(document.createTextNode(' '))
    })
    mask.appendChild(inner)
    el.appendChild(mask)
    return inner
  })
}

export default function RevealText({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  trigger, // undefined = scroll-triggered; boolean = play when true (hero)
  ...rest
}) {
  const ref = useRef(null)
  const played = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || played.current) return

    if (prefersReducedMotion()) {
      el.style.opacity = 1
      played.current = true
      return
    }

    const lines = splitIntoLines(el)
    gsap.set(lines, { yPercent: 115 })
    el.style.opacity = 1

    let tween
    let st
    const play = () => {
      if (played.current) return
      played.current = true
      tween = gsap.to(lines, {
        yPercent: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.085,
        delay,
      })
    }

    if (trigger === undefined) {
      st = ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: play })
    } else if (trigger) {
      play()
    }

    return () => {
      tween?.kill()
      st?.kill()
    }
  }, [trigger, delay])

  return (
    <Tag ref={ref} className={`reveal-text ${className}`} style={{ opacity: 0 }} {...rest}>
      {children}
    </Tag>
  )
}
