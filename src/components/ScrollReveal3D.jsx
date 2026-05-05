import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const variants = {
  up: {
    hidden: { opacity: 0, y: 60, rotateX: 22, scale: 0.96, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' },
  },
  left: {
    hidden: { opacity: 0, x: -70, rotateY: 18, scale: 0.96, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0, rotateY: 0, scale: 1, filter: 'blur(0px)' },
  },
  right: {
    hidden: { opacity: 0, x: 70, rotateY: -18, scale: 0.96, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0, rotateY: 0, scale: 1, filter: 'blur(0px)' },
  },
  flip: {
    hidden: { opacity: 0, y: 40, rotateX: 55, scale: 0.92, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.78, rotateX: 12, y: 28, filter: 'blur(8px)' },
    visible: { opacity: 1, scale: 1, rotateX: 0, y: 0, filter: 'blur(0px)' },
  },
}

export default function ScrollReveal3D({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.85,
  className = '',
  once = true,
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const chosen = variants[direction] || variants.up

  return (
    <motion.div
      ref={ref}
      variants={chosen}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ScrollReveal3DGroup({
  children,
  direction = 'up',
  stagger = 0.1,
  delayStart = 0,
  className = '',
}) {
  const ref = useRef(null)

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, i) =>
        child ? (
          <ScrollReveal3D direction={direction} delay={delayStart + i * stagger} once>
            {child}
          </ScrollReveal3D>
        ) : null
      )}
    </div>
  )
}
