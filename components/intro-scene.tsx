'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, OrbitControls, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import type { Mesh } from 'three'

function CivicCore() {
  const mesh = useRef<Mesh>(null)
  useFrame((_, delta) => { if (mesh.current) mesh.current.rotation.y += delta * 0.22 })
  return <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.5}><mesh ref={mesh}><icosahedronGeometry args={[1.25, 1]} /><meshStandardMaterial color="#7c3aed" emissive="#312e81" emissiveIntensity={0.35} roughness={0.26} metalness={0.55} /></mesh><Html center><div className="intro-orbit-label">CIVIC<br />NETWORK</div></Html></Float>
}

function Node({ position, color }: { position: [number, number, number]; color: string }) {
  return <mesh position={position}><sphereGeometry args={[0.13, 18, 18]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} /></mesh>
}

export function IntroScene({ onEnter }: { onEnter: () => void }) {
  return <section className="intro-screen"><div className="intro-copy"><div className="brand-mark intro-mark">⌖</div><div className="intro-eyebrow">A living map for everyday change</div><h1>Connect the<br /><span>people who notice.</span></h1><p>CommunityConnector turns local observations into shared action, one clear report at a time.</p><div className="intro-actions"><button className="hero-cta" onClick={onEnter}>Enter the connector <span>→</span></button><button className="intro-skip" onClick={onEnter}>Skip intro</button></div></div><div className="intro-canvas" aria-hidden="true"><Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.5]}><color attach="background" args={["#111827"]} /><ambientLight intensity={1.4} /><pointLight position={[3, 2, 4]} intensity={8} color="#f59e0b" /><pointLight position={[-3, -2, 2]} intensity={6} color="#22d3ee" /><CivicCore /><Node position={[-2, 1.1, 0]} color="#22d3ee" /><Node position={[2, 1.3, -0.5]} color="#f59e0b" /><Node position={[-2, -1.3, -0.2]} color="#fb7185" /><Node position={[2, -1.2, 0.3]} color="#a78bfa" /><Sparkles count={55} scale={5} size={2} speed={0.25} color="#c4b5fd" /><OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} /></Canvas></div><div className="intro-note">V1 prototype · real community reports only</div></section>
}
