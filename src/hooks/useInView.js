import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook that uses IntersectionObserver to detect when an element
 * enters the viewport.
 *
 * @param {IntersectionObserverInit} options - IntersectionObserver options
 * @returns {[React.RefObject, boolean]} - [ref, inView]
 */
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        // Once visible, stop observing (animate once)
        observer.unobserve(el)
      }
    }, options)

    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.threshold, options.rootMargin])

  return [ref, inView]
}
