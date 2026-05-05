import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

function useTypingEffect(words, speed = 75, pause = 2000) {
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let timeout
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2)
    } else if (deleting && charIdx === 0) {
      // Use timeout to avoid synchronous setState inside effect
      timeout = setTimeout(() => {
        setDeleting(false)
        setWordIdx((w) => (w + 1) % words.length)
      }, speed / 2)
    }
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  // Derive display text directly from state — no extra setState needed
  return words[wordIdx].slice(0, charIdx)
}

export default function Hero() {
  const containerRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const roles = ['Full-Stack Developer', 'UI/UX Engineer', 'React Specialist', 'Web Architect']
  const typedRole = useTypingEffect(roles)

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    })
  }, [])

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base"
    >
      {/* ── Parallax orbs ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-right warm orb */}
        <div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.04) 0%, transparent 65%)',
            transform: `translate(${mouse.x * -35}px, ${mouse.y * -25}px)`,
            transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        {/* Bottom-left cool orb */}
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 65% 65%, rgba(255,255,255,0.025) 0%, transparent 65%)',
            transform: `translate(${mouse.x * 28}px, ${mouse.y * 20}px)`,
            transition: 'transform 0.9s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      </div>

      {/* ── Grain texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* ── Horizontal rule lines ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[42%] left-0 right-0 h-px origin-left"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04) 20%, rgba(255,255,255,0.04) 80%, transparent)' }}
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[58%] left-0 right-0 h-px origin-right"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.03) 80%, transparent)' }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20 flex flex-col items-center text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-7"
        >
          {/* Status badge */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-white/8 text-white/40 text-xs tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Available for work
            </div>
          </motion.div>

          {/* Name */}
          <motion.div variants={item} className="flex flex-col items-center gap-2">
            <p className="text-white/20 text-xs tracking-[0.4em] uppercase">Hello, I'm</p>
            <h1 className="text-[clamp(3.5rem,10vw,7rem)] font-bold leading-[0.95] tracking-tight">
              <span className="text-white">Akbarali</span>
              <br />
              <span className="text-accent">Sheronov</span>
            </h1>
          </motion.div>

          {/* Typing role */}
          <motion.div variants={item} className="flex items-center gap-4">
            <div className="w-6 h-px bg-white/15" />
            <span className="text-base text-white/40 font-light tracking-widest uppercase min-w-[220px] text-center">
              {typedRole}
              <span className="inline-block w-px h-4 bg-accent ml-1 animate-pulse align-middle" />
            </span>
            <div className="w-6 h-px bg-white/15" />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-white/30 text-sm md:text-base leading-relaxed max-w-lg font-light"
          >
            I craft high-performance web experiences with clean code and thoughtful design.
            Turning complex ideas into elegant digital products.
          </motion.p>

          {/* CTA */}
          <motion.div variants={item} className="flex flex-wrap justify-center gap-4 pt-1">
            <a
              href="#projects"
              className="px-8 py-3.5 bg-accent text-black text-xs font-bold tracking-widest uppercase hover:bg-accent/90 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 border border-white/10 text-white/50 hover:text-white hover:border-white/20 text-xs font-medium tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="flex gap-12 pt-8 mt-2 border-t border-white/[0.05] w-full justify-center"
          >
            {[
              { value: '1+', label: 'Year' },
              { value: '4', label: 'Projects' },
              { value: '1', label: 'Client' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                <p className="text-[10px] text-white/25 tracking-[0.3em] uppercase">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-white/15 text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
