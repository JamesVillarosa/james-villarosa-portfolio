import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'

const ASSEMBLE = [0.4, 2.8] // seconds: particles swirl in, lock onto the V, solid mark fades up

// The "V" mark, extruded and floated like a product shot. Positioned over `stage` (a DOM element) at any size.
export function mountHeroScene(canvas, stage) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50)
  camera.position.z = 10

  const key = new THREE.DirectionalLight(0xffffff, 1.6)
  key.position.set(3, 5, 6)
  scene.add(key)
  const rim = new THREE.PointLight(0xff6a3d, 40, 14) // warm rim from behind-left catches the bevels
  rim.position.set(-3.5, -1.5, -2.5)
  scene.add(rim)

  // V outline: two chunky arms meeting at a flat base
  const s = new THREE.Shape()
  ;[[-1, 1], [-0.42, 1], [0, -0.02], [0.42, 1], [1, 1], [0.24, -1], [-0.24, -1]].forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)))
  s.closePath()
  const geo = new THREE.ExtrudeGeometry(s, { depth: 0.75, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.07, bevelSegments: 8, curveSegments: 1 })
  geo.center()
  const v = new THREE.Mesh(geo, [
    new THREE.MeshPhysicalMaterial({ color: 0xf5f8fc, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.15, transparent: true, opacity: 0 }), // faces
    new THREE.MeshPhysicalMaterial({ color: 0x0e4c82, roughness: 0.35, metalness: 0.1, clearcoat: 0.6, transparent: true, opacity: 0 }), // sides
  ])
  const rig = new THREE.Group()
  rig.add(v)
  scene.add(rig)

  // "data" particles: start as a spinning galaxy, each one flies to a point sampled on the V's surface
  const N = innerWidth < 768 ? 1400 : 2600 // fewer on phones
  const sampler = new MeshSurfaceSampler(new THREE.Mesh(geo)).build()
  const onV = new Float32Array(N * 3), start = new Float32Array(N * 3), seed = new Float32Array(N)
  const pt = new THREE.Vector3()
  for (let i = 0; i < N; i++) {
    sampler.sample(pt)
    pt.toArray(onV, i * 3)
    const a = Math.random() * Math.PI * 2, r = 1.5 + Math.random() * 2.8
    start.set([Math.cos(a) * r, (Math.random() - 0.5) * 1.6 * (r / 3), Math.sin(a) * r], i * 3)
    seed[i] = Math.random()
  }
  const pgeo = new THREE.BufferGeometry()
  pgeo.setAttribute('position', new THREE.BufferAttribute(onV, 3))
  pgeo.setAttribute('aStart', new THREE.BufferAttribute(start, 3))
  pgeo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
  const pmat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uP: { value: 0 }, uT: { value: 0 }, uFade: { value: 1 }, uPx: { value: renderer.getPixelRatio() } },
    vertexShader: /* glsl */ `
      attribute vec3 aStart; attribute float aSeed;
      uniform float uP, uT, uPx; varying float vSeed;
      void main() {
        float k = clamp((uP - aSeed * 0.35) / 0.65, 0.0, 1.0);
        k = k * k * (3.0 - 2.0 * k);                       // staggered smoothstep: particles land in waves
        float ang = uT * (0.5 + aSeed * 0.8) * (1.0 - k);  // orbit until captured
        vec3 s = vec3(aStart.x * cos(ang) - aStart.z * sin(ang), aStart.y, aStart.x * sin(ang) + aStart.z * cos(ang));
        vSeed = aSeed;
        vec4 mv = modelViewMatrix * vec4(mix(s, position, k), 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (2.0 + aSeed * 3.0) * uPx * (10.0 / -mv.z);
      }`,
    fragmentShader: /* glsl */ `
      uniform float uFade; varying float vSeed;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        vec3 c = mix(vec3(0.75, 0.9, 1.0), vec3(1.0, 0.45, 0.25), step(0.85, vSeed)); // mostly ice-blue, some orange
        gl_FragColor = vec4(c, (1.0 - d * 2.0) * uFade);
      }`,
  })
  const points = new THREE.Points(pgeo, pmat)
  rig.add(points)

  // soft contact shadow: a radial gradient sprite that tightens as the mark floats down
  const sc = document.createElement('canvas')
  sc.width = sc.height = 128
  const g = sc.getContext('2d')
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, 'rgba(6,30,60,0.55)')
  grad.addColorStop(1, 'rgba(6,30,60,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 128, 128)
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false }))
  scene.add(shadow)

  const place = { x: 0, y: 0, s: 1 }
  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z
    const halfW = halfH * camera.aspect
    const c = canvas.getBoundingClientRect(), r = stage.getBoundingClientRect()
    place.x = ((r.left + r.width / 2 - c.left) / w * 2 - 1) * halfW
    place.y = -((r.top + r.height / 2 - c.top) / h * 2 - 1) * halfH
    place.s = Math.min(r.width / w * halfW, r.height / h * halfH) * 0.62
    place.cs = Math.min(halfW, halfH) * 0.34 // intro pose: big, dead centre
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  ro.observe(stage)

  const target = { x: 0, y: 0 }
  const cur = { x: 0, y: 0, intro: 0, spin: 0, settle: null }
  const onMove = (e) => { target.x = e.clientX / innerWidth - 0.5; target.y = e.clientY / innerHeight - 0.5 }
  addEventListener('pointermove', onMove, { passive: true })

  const clock = new THREE.Clock()
  const born = performance.now() // assembly runs on wall time so slow GPUs stay in sync with the intro
  let t = 0
  const frame = () => {
    const dt = Math.min(clock.getDelta(), 0.05) // clamped so resuming after a pause doesn't jump
    t += dt

    // assemble: particles converge onto the V, the solid mark fades up, then the particles dissolve
    const age = (performance.now() - born) / 1000
    const asm = reduce ? 1 : THREE.MathUtils.clamp((age - ASSEMBLE[0]) / (ASSEMBLE[1] - ASSEMBLE[0]), 0, 1)
    const solid = THREE.MathUtils.smoothstep(asm, 0.78, 1)
    const fade = reduce ? 0 : 1 - THREE.MathUtils.clamp((age - ASSEMBLE[1]) / 1.4, 0, 1)
    pmat.uniforms.uP.value = asm
    pmat.uniforms.uT.value = t
    pmat.uniforms.uFade.value = fade
    points.visible = fade > 0
    v.material.forEach((m) => { m.opacity = solid })
    if (solid === 1 && v.material[0].transparent) v.material.forEach((m) => { m.transparent = false; m.needsUpdate = true })
    const k = 1 - Math.pow(0.001, dt) // frame-rate independent lerp factor
    cur.x += (target.x - cur.x) * Math.min(k * 1.6, 1)
    cur.y += (target.y - cur.y) * Math.min(k * 1.6, 1)
    // intro: spin in the centre while loading, then glide to the stage and settle facing forward
    if (document.documentElement.classList.contains('is-loading')) cur.spin += dt * 1.1
    else {
      cur.intro += (1 - cur.intro) * Math.min(k * 0.55, 1)
      cur.settle ??= Math.ceil(cur.spin / (Math.PI * 2)) * Math.PI * 2
      cur.spin += (cur.settle - cur.spin) * Math.min(k * 0.6, 1)
    }
    const e = cur.intro, lerp = (a, b) => a + (b - a) * e
    const px = lerp(0, place.x), py = lerp(0, place.y), ps = lerp(place.cs, place.s)
    const scroll = Math.min(scrollY / innerHeight, 1.2)

    const bob = Math.sin(t * 1.1) * 0.08
    rig.position.set(px, py + bob * ps + scroll * 1.5, 0)
    rig.scale.setScalar(ps * (1 - scroll * 0.25))
    rig.rotation.set(
      0.18 + cur.y * 0.35 * e,
      cur.spin + e * (0.42 + Math.sin(t * 0.45) * 0.32 + cur.x * 0.7) + scroll * 1.2,
      -0.12 + Math.sin(t * 0.6) * 0.03,
    )

    shadow.position.set(px, py - ps * 1.55 + scroll * 1.5, -0.6)
    const sw = ps * (2.4 - bob * 2)
    shadow.scale.set(sw, sw * 0.28, 1)
    shadow.material.opacity = (0.85 - bob * 2) * solid * (1 - Math.min(scroll, 1))
    renderer.render(scene, camera)
  }

  // only animate while the hero is on screen
  let raf = 0
  const loop = () => { frame(); raf = requestAnimationFrame(loop) }
  const io = new IntersectionObserver(([e]) => {
    cancelAnimationFrame(raf)
    if (e.isIntersecting) loop()
  })
  renderer.compile(scene, camera) // pay shader cost up front, behind the intro curtain
  if (reduce) { cur.intro = 1; frame() } else { frame(); io.observe(canvas) }
  window.__heroReady = true // read by the hero intro
  canvas.dataset.ready = ''

  return () => {
    cancelAnimationFrame(raf); io.disconnect(); ro.disconnect()
    removeEventListener('pointermove', onMove)
    scene.traverse((o) => { o.geometry?.dispose(); [].concat(o.material || []).forEach((m) => { m.map?.dispose(); m.dispose() }) })
    scene.environment.dispose(); pmrem.dispose(); renderer.dispose()
  }
}
