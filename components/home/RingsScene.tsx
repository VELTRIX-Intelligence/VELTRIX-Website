'use client'

/**
 * STAND-IN for the VELTRIX Spline hero scene (until a real export exists).
 * Three interlocking matte-black rings, rim-lit in Iris Violet with a faint
 * Acid Lime edge. Turns slowly on its own and tilts towards the cursor.
 *  - mode "interactive": auto-rotate + cursor tilt (desktop)
 *  - mode "auto": auto-rotate only (mobile)
 *  - mode "still": one rendered frame, no motion (reduced motion / slow connection)
 */

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

export type RingsMode = 'interactive' | 'auto' | 'still'

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(-vViewPos);
    float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.4);

    // Matte near-black body with a soft key light.
    vec3 keyDir = normalize(vec3(-0.4, 0.8, 0.6));
    float diff = max(dot(N, keyDir), 0.0);
    vec3 col = vec3(0.028, 0.030, 0.034) + diff * vec3(0.045, 0.047, 0.052);

    // Iris Violet rim light from behind-right.
    vec3 rimDir = normalize(vec3(0.85, 0.25, -0.45));
    float rimSide = clamp(dot(N, rimDir) * 0.5 + 0.5, 0.0, 1.0);
    col += fres * vec3(0.388, 0.400, 0.945) * (0.15 + 0.75 * rimSide);

    // Faint Acid Lime edge highlight, top-left only.
    float limeSide = smoothstep(0.6, 1.0, dot(N, normalize(vec3(-0.7, 0.7, 0.15))));
    col += fres * limeSide * vec3(0.894, 0.949, 0.133) * 0.28;

    // Tight, low specular so it reads as matte.
    float spec = pow(max(dot(reflect(-keyDir, N), V), 0.0), 48.0) * 0.08;
    col += spec;

    gl_FragColor = vec4(col, 1.0);
  }
`

function Rings({ mode }: { mode: RingsMode }) {
  const group = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const material = useMemo(
    () => new THREE.ShaderMaterial({ vertexShader, fragmentShader }),
    [],
  )
  const geometry = useMemo(() => new THREE.TorusGeometry(1, 0.13, 48, 160), [])

  useEffect(() => {
    if (mode !== 'interactive') return
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mode])

  useFrame((_, dt) => {
    const g = group.current
    if (!g || mode === 'still') return
    const step = Math.min(dt, 0.05)
    g.rotation.y += step * 0.12
    if (mode === 'interactive') {
      const tx = 0.35 + pointer.current.y * 0.18
      const tz = -0.5 - pointer.current.x * 0.14
      g.rotation.x += (tx - g.rotation.x) * Math.min(1, step * 2.2)
      g.rotation.z += (tz - g.rotation.z) * Math.min(1, step * 2.2)
    }
  })

  // Chain of three: outer rings in one plane, the middle ring perpendicular,
  // each passing through its neighbour's opening.
  return (
    <group ref={group} rotation={[0.35, 0.6, -0.5]}>
      <mesh geometry={geometry} material={material} position={[-1, 0, 0]} />
      <mesh geometry={geometry} material={material} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={geometry} material={material} position={[1, 0, 0]} />
    </group>
  )
}

export default function RingsScene({
  mode,
  onReady,
}: {
  mode: RingsMode
  onReady?: () => void
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={mode === 'still' ? 'demand' : 'always'}
      camera={{ position: [0, 0, 8.4], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
      style={{ background: 'transparent' }}
    >
      <Rings mode={mode} />
    </Canvas>
  )
}
