import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0c0c0c]/95 backdrop-blur-md border-b border-white/[0.05]' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <span className="text-sm font-bold text-white tracking-widest">AS</span>
          <span className="w-px h-3.5 bg-white/15" />
          <span className="text-[10px] text-white/25 tracking-[0.3em] uppercase group-hover:text-white/40 transition-colors">Portfolio</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <li key={l.href}>
              <a href={l.href} className="link-line text-[11px] tracking-[0.2em] uppercase">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 border border-white/15 text-[11px] tracking-[0.2em] uppercase text-white/50 hover:text-white hover:border-white/40 transition-all duration-200"
        >
          Hire me
        </a>

        {/* Burger */}
        <button
          className="md:hidden p-2 flex flex-col gap-[5px]"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-px bg-white/60 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-5 h-px bg-white/60 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-white/60 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{   opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/[0.05] bg-[#0c0c0c]"
          >
            <ul className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[11px] tracking-[0.2em] uppercase text-white/35 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
