import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

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
    new THREE.MeshPhysicalMaterial({ color: 0xf5f8fc, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.15 }), // faces
    new THREE.MeshPhysicalMaterial({ color: 0x0e4c82, roughness: 0.35, metalness: 0.1, clearcoat: 0.6 }), // sides
  ])
  const rig = new THREE.Group()
  rig.add(v)
  scene.add(rig)

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
  let t = 0
  const frame = () => {
    const dt = Math.min(clock.getDelta(), 0.05) // clamped so resuming after a pause doesn't jump
    t += dt
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
    shadow.material.opacity = (0.85 - bob * 2) * (1 - Math.min(scroll, 1))
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
