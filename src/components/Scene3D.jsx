import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'

// ─── Point Cloud Sphere ───────────────────────────────────────────────────────
function PointCloud({ mouse }) {
  const ref = useRef()
  const count = 3000

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      // eslint-disable-next-line react-hooks/purity
      const r = 1.8 + (Math.random() - 0.5) * 0.4
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ref.current) {
      // Slow auto-rotation
      ref.current.rotation.y = t * 0.08
      ref.current.rotation.x = t * 0.04

      // Mouse parallax tilt
      ref.current.rotation.x += mouse.current[1] * 0.3
      ref.current.rotation.y += mouse.current[0] * 0.3
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6366f1"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  )
}

// ─── Ambient Particles ────────────────────────────────────────────────────────
function AmbientParticles() {
  const ref = useRef()
  const count = 600

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      arr[i * 3] = (Math.random() - 0.5) * 12
      // eslint-disable-next-line react-hooks/purity
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12
      // eslint-disable-next-line react-hooks/purity
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return arr
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.008}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  )
}

// ─── Main Scene ───────────────────────────────────────────────────────────────
export default function Scene3D({ mouse }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#6366f1" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#06b6d4" />
      <spotLight position={[0, 8, 0]} intensity={0.5} color="#8b5cf6" />

      <PointCloud mouse={mouse} />
      <AmbientParticles />
    </Canvas>
  )
}
