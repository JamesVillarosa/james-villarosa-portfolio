import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../motion/prefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/* Simplex noise (Ashima) — shared by vertex shaders */
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`

const orbVertex = /* glsl */ `
uniform float uTime;
uniform float uProgress;   // 0 scattered → 1 assembled
uniform float uScroll;     // 0 top → 1 scrolled past hero
uniform vec3 uMouse;       // smoothed, world space
varying vec3 vNormal;
varying vec3 vPos;
varying float vNoise;
${NOISE}
void main() {
  vec3 pos = position;
  vec3 nrm = normalize(normal);

  // Living surface: slow layered noise breathing
  float n = snoise(pos * 1.35 + uTime * 0.18);
  float n2 = snoise(pos * 3.2 - uTime * 0.12) * 0.35;
  float breathe = (n + n2) * 0.16;

  // Mouse: surface leans toward cursor with a smooth radial falloff
  float d = distance(pos, uMouse);
  float bulge = smoothstep(1.6, 0.0, d) * 0.22;

  // Assembly: starts exploded along noise, resolves to clean orb
  float scatter = (1.0 - uProgress) * (snoise(pos * 2.0 + 7.3) * 1.8);

  // Scroll: surface tears apart again as the hero leaves
  float tear = uScroll * snoise(pos * 2.6 + uTime * 0.25) * 0.9;

  pos += nrm * (breathe + bulge + scatter + tear);
  vNoise = n;
  vNormal = normalize(normalMatrix * nrm);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`

const orbFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uColorDeep;   // deep blue
uniform vec3 uColorMid;    // brand blue
uniform vec3 uColorLight;  // pale blue
varying vec3 vNormal;
varying vec3 vPos;
varying float vNoise;
void main() {
  vec3 viewDir = normalize(-vPos);
  float fresnel = pow(1.0 - max(dot(viewDir, normalize(vNormal)), 0.0), 2.2);

  // Vertical + noise-driven gradient between the three blues
  float band = smoothstep(-1.2, 1.2, vPos.y + vNoise * 0.8);
  vec3 base = mix(uColorDeep, uColorMid, band);
  base = mix(base, uColorLight, fresnel * 0.9);

  // Sweeping sheen tied to time — keeps the surface alive
  float sweep = sin(vPos.x * 2.0 + vPos.y * 1.4 + uTime * 0.6) * 0.5 + 0.5;
  base += uColorLight * sweep * 0.08;

  // Rim light
  base += vec3(1.0) * pow(fresnel, 3.0) * 0.35;

  gl_FragColor = vec4(base, 1.0);
}
`

function Orb({ ready }) {
  const mesh = useRef()
  const group = useRef()
  const mouse = useRef(new THREE.Vector3(10, 10, 10))
  const targetMouse = useRef(new THREE.Vector3(10, 10, 10))
  const scroll = useRef(0)
  const { viewport, pointer } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: prefersReducedMotion() ? 1 : 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector3(10, 10, 10) },
      uColorDeep: { value: new THREE.Color('#1d4ed8') },
      uColorMid: { value: new THREE.Color('#3b82f6') },
      uColorLight: { value: new THREE.Color('#bfdbfe') },
    }),
    []
  )

  // Entry assembly once the preloader hands off
  useEffect(() => {
    if (!ready || prefersReducedMotion()) return
    const t = gsap.to(uniforms.uProgress, {
      value: 1,
      duration: 1.8,
      ease: 'power3.inOut',
      delay: 0.1,
    })
    return () => t.kill()
  }, [ready, uniforms])

  // Scroll drives the exit tear + drift
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        scroll.current = self.progress
      },
    })
    return () => st.kill()
  }, [])

  useFrame((state, delta) => {
    uniforms.uTime.value += delta

    // Project pointer into orb-local space (approx: NDC * viewport half-size)
    targetMouse.current.set(
      (pointer.x * viewport.width) / 2 - (group.current?.position.x || 0),
      (pointer.y * viewport.height) / 2,
      1.2
    )
    mouse.current.lerp(targetMouse.current, 0.06)
    uniforms.uMouse.value.copy(mouse.current)

    uniforms.uScroll.value += (scroll.current - uniforms.uScroll.value) * 0.08

    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.12
      mesh.current.rotation.z += delta * 0.03
    }
    if (group.current) {
      // Mouse parallax ±3° + scroll drift upward
      group.current.rotation.x += (pointer.y * 0.05 - group.current.rotation.x) * 0.05
      group.current.rotation.y += (pointer.x * 0.05 - group.current.rotation.y) * 0.05
      group.current.position.y = uniforms.uScroll.value * viewport.height * 0.7
    }
  })

  return (
    <group ref={group}>
      <mesh ref={mesh} scale={1.55}>
        <icosahedronGeometry args={[1, 48]} />
        <shaderMaterial uniforms={uniforms} vertexShader={orbVertex} fragmentShader={orbFragment} />
      </mesh>
    </group>
  )
}

function Particles({ count = 350 }) {
  const points = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Shell around the orb
      const r = 2.4 + Math.random() * 2.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi) - 1
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#3b82f6" transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function SceneGate({ children }) {
  // Stop rendering when the hero is fully offscreen
  const { invalidate, gl } = useThree()
  useEffect(() => {
    const canvas = gl.domElement
    const obs = new IntersectionObserver(
      ([entry]) => {
        canvas.dataset.visible = entry.isIntersecting ? '1' : '0'
      },
      { threshold: 0 }
    )
    obs.observe(canvas)
    return () => obs.disconnect()
  }, [gl, invalidate])
  useFrame(() => null)
  return children
}

export default function HeroScene({ ready }) {
  const reduced = prefersReducedMotion()

  // WebGL support probe — static gradient fallback handled by parent CSS
  const supported = useMemo(() => {
    try {
      const c = document.createElement('canvas')
      return !!(c.getContext('webgl2') || c.getContext('webgl'))
    } catch {
      return false
    }
  }, [])

  if (!supported) return <div className="hero-orb-fallback" aria-hidden="true" />

  return (
    <Canvas
      className="hero-canvas"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      <SceneGate>
        <Orb ready={ready} />
        <Particles />
      </SceneGate>
    </Canvas>
  )
}
