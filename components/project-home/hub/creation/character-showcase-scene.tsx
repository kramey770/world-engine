"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

type SceneStatus = "loading" | "ready" | "error"

function keepHeadGeometry(source: THREE.BufferGeometry, headNeckBones: Set<number>) {
  const position = source.getAttribute("position")
  const skinIndex = source.getAttribute("skinIndex")
  const skinWeight = source.getAttribute("skinWeight")
  const index = source.index
  const attributes = Object.entries(source.attributes) as [string, THREE.BufferAttribute][]
  const collected = new Map(attributes.map(([name]) => [name, [] as number[]]))
  const vertexAt = (offset: number) => index ? index.getX(offset) : offset
  const triangleCount = index ? index.count : position.count
  const belongsToHeadOrNeck = (vertex: number) => {
    for (let influence = 0; influence < skinIndex.itemSize; influence++) {
      if (headNeckBones.has(skinIndex.getComponent(vertex, influence)) && skinWeight.getComponent(vertex, influence) > 0.05) {
        return true
      }
    }
    return false
  }

  for (let offset = 0; offset + 2 < triangleCount; offset += 3) {
    const vertices = [vertexAt(offset), vertexAt(offset + 1), vertexAt(offset + 2)]
    if (!vertices.every(belongsToHeadOrNeck)) continue

    for (const [name, attribute] of attributes) {
      const values = collected.get(name)!
      for (const vertex of vertices) {
        for (let component = 0; component < attribute.itemSize; component++) {
          values.push(attribute.array[vertex * attribute.itemSize + component])
        }
      }
    }
  }

  const head = new THREE.BufferGeometry()
  for (const [name, attribute] of attributes) {
    const AttributeArray = attribute.array.constructor as new (values: number[]) => typeof attribute.array
    head.setAttribute(name, new THREE.BufferAttribute(
      new AttributeArray(collected.get(name)!),
      attribute.itemSize,
      attribute.normalized,
    ))
  }
  head.computeBoundingBox()
  head.computeBoundingSphere()
  return head
}

function disposeScene(scene: THREE.Scene) {
  const geometries = new Set<THREE.BufferGeometry>()
  const materials = new Set<THREE.Material>()
  scene.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return
    geometries.add(object.geometry)
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
      materials.add(material)
    }
  })
  geometries.forEach((geometry) => geometry.dispose())
  materials.forEach((material) => material.dispose())
}

export function CharacterShowcaseScene() {
  const hostRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<SceneStatus>("loading")

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#0b0b0c")
    scene.fog = new THREE.Fog("#0b0b0c", 10, 25)

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80)
    camera.position.set(0, 2.35, 5.55)
    camera.lookAt(0, 1.4, 0)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    } catch {
      setStatus("error")
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.12
    renderer.domElement.className = "block size-full"
    renderer.domElement.setAttribute("aria-hidden", "true")
    host.appendChild(renderer.domElement)

    scene.add(new THREE.HemisphereLight("#f1f1f2", "#151517", 1.8))
    const keyLight = new THREE.DirectionalLight("#f1f1f2", 2.4)
    keyLight.position.set(-3, 7, 5)
    scene.add(keyLight)
    const rimLight = new THREE.PointLight("#b52a2a", 8, 12)
    rimLight.position.set(0, 4, -2.5)
    scene.add(rimLight)

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(32, 32),
      new THREE.MeshStandardMaterial({ color: "#0b0b0c", roughness: 0.96 }),
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.015
    scene.add(floor)

    const makeGrid = () => {
      const grid = new THREE.GridHelper(24, 34, "#b52a2a", "#3d0b0b")
      const materials = Array.isArray(grid.material) ? grid.material : [grid.material]
      materials.forEach((material) => {
        material.transparent = true
        material.opacity = 0.68
      })
      return grid
    }
    const floorGrid = makeGrid()
    floorGrid.position.set(0, 0.008, 7.8)
    scene.add(floorGrid)
    const wallGrid = makeGrid()
    wallGrid.rotation.x = Math.PI / 2
    wallGrid.position.set(0, 5.3, -4.2)
    scene.add(wallGrid)

    const actor = new THREE.Group()
    scene.add(actor)

    const skinMaterial = new THREE.MeshStandardMaterial({
      color: "#b5b5ba",
      emissive: "#3d0b0b",
      emissiveIntensity: 0.12,
      roughness: 0.82,
    })
    const outfitMaterials = {
      tunic: new THREE.MeshStandardMaterial({ color: "#7a1515", roughness: 0.9 }),
      sleeves: new THREE.MeshStandardMaterial({ color: "#5c1010", roughness: 0.9 }),
      trousers: new THREE.MeshStandardMaterial({ color: "#202023", roughness: 0.92 }),
      boots: new THREE.MeshStandardMaterial({ color: "#0b0b0c", roughness: 0.86 }),
      hair: new THREE.MeshStandardMaterial({ color: "#151517", roughness: 0.88 }),
      brows: new THREE.MeshStandardMaterial({ color: "#29292d", roughness: 0.88 }),
    }
    const materialForMesh = (name: string, sourceMaterial?: THREE.Material | THREE.Material[]): THREE.Material | THREE.Material[] => {
      if (Array.isArray(sourceMaterial)) {
        return sourceMaterial.map((material) => materialForMesh(name, material) as THREE.Material)
      }
      const normalized = name.toLowerCase()
      const sourceNames = sourceMaterial?.name.toLowerCase() ?? ""
      if (sourceNames.includes("regular_male")) return skinMaterial
      if (normalized.includes("peasant_body")) return outfitMaterials.tunic
      if (normalized.includes("peasant_arms")) return outfitMaterials.sleeves
      if (normalized.includes("peasant_legs")) return outfitMaterials.trousers
      if (normalized.includes("peasant_feet")) return outfitMaterials.boots
      if (normalized.includes("hair")) return outfitMaterials.hair
      if (normalized.includes("eyebrow")) return outfitMaterials.brows
      return skinMaterial
    }

    let disposed = false
    let frame = 0
    let visible = true
    let mixer: THREE.AnimationMixer | undefined
    let currentAction: THREE.AnimationAction | undefined
    let currentClip = ""
    let clips: THREE.AnimationClip[] = []
    let animationStart = 0
    let lastFrame = 0

    const sequence: { clip: string; duration: number; loop: boolean }[] = [
      { clip: "Idle_Loop", duration: 2.2, loop: true },
      { clip: "Walk_Loop", duration: 1.3, loop: true },
      { clip: "Jog_Fwd_Loop", duration: 1.25, loop: true },
      { clip: "Sprint_Loop", duration: 1.5, loop: true },
      { clip: "Idle_Talking_Loop", duration: 1.5, loop: true },
      { clip: "Dance_Loop", duration: 1.8, loop: true },
    ]

    const loader = new GLTFLoader()
    const asset = (path: string) => `/character-showcase/assets/${path}`
    void Promise.all([
      loader.loadAsync(asset("character/superhero_male.gltf")),
      loader.loadAsync(asset("hair/Hair_SimpleParted.gltf")),
      loader.loadAsync(asset("peasant/Male_Peasant_Body.gltf")),
      loader.loadAsync(asset("peasant/Male_Peasant_Arms.gltf")),
      loader.loadAsync(asset("peasant/Male_Peasant_Legs.gltf")),
      loader.loadAsync(asset("peasant/Male_Peasant_Feet.gltf")),
      loader.loadAsync(asset("animations.glb")),
      loader.loadAsync(asset("animations_2.glb")),
    ]).then(([character, hair, body, arms, legs, feet, animationSet, animationSet2]) => {
      if (disposed) return

      const model = character.scene
      model.updateMatrixWorld(true)
      const bodyBounds = new THREE.Box3().setFromObject(model)
      let bodyMesh: THREE.SkinnedMesh | undefined
      model.traverse((object) => {
        if (object instanceof THREE.SkinnedMesh && object.name === "SuperHero_Male") bodyMesh = object
      })
      if (bodyMesh) {
        const headNeckBones = new Set(bodyMesh.skeleton.bones.flatMap((bone, index) =>
          bone.name === "Head" || bone.name === "neck_01" ? [index] : [],
        ))
        bodyMesh.geometry = keepHeadGeometry(bodyMesh.geometry, headNeckBones)
      }

      const baseBones = new Map<string, THREE.Bone>()
      model.traverse((object) => {
        if (object instanceof THREE.Bone) baseBones.set(object.name, object)
        if (object instanceof THREE.Mesh) {
          object.material = object === bodyMesh ? skinMaterial : materialForMesh(object.name, object.material)
          object.castShadow = false
          object.receiveShadow = false
        }
      })

      const center = bodyBounds.getCenter(new THREE.Vector3())
      const height = Math.max(bodyBounds.max.y - bodyBounds.min.y, 0.001)
      const scale = 2.85 / height
      model.scale.setScalar(scale)
      model.position.set(-center.x * scale, -bodyBounds.min.y * scale, -center.z * scale)
      model.updateMatrixWorld(true)

      const attachRiggedAsset = (root: THREE.Object3D) => {
        root.updateMatrixWorld(true)
        const meshes: THREE.SkinnedMesh[] = []
        root.traverse((object) => {
          if (object instanceof THREE.SkinnedMesh) meshes.push(object)
        })

        for (const mesh of meshes) {
          const bones = mesh.skeleton.bones.map((bone) => baseBones.get(bone.name))
          if (bones.some((bone) => !bone)) {
            console.warn(`Could not match character rig for ${mesh.name}`)
            continue
          }
          const relative = model.matrixWorld.clone().invert().multiply(mesh.matrixWorld)
          const skeleton = new THREE.Skeleton(bones as THREE.Bone[], mesh.skeleton.boneInverses)
          mesh.removeFromParent()
          model.add(mesh)
          relative.decompose(mesh.position, mesh.quaternion, mesh.scale)
          mesh.bind(skeleton, mesh.bindMatrix)
          mesh.material = materialForMesh(mesh.name, mesh.material)
          mesh.castShadow = false
          mesh.receiveShadow = false

        }
      }

      ;[body, arms, legs, feet].forEach((item) => attachRiggedAsset(item.scene))
      attachRiggedAsset(hair.scene)
      actor.add(model)

      const scheduledClips = new Set(sequence.map((item) => item.clip))
      clips = [...animationSet.animations, ...animationSet2.animations]
        .filter((clip) => scheduledClips.has(clip.name))
      mixer = new THREE.AnimationMixer(model)
      mixer.timeScale = 1.35
      animationStart = performance.now()
      lastFrame = animationStart
      setStatus("ready")
    }).catch((error: unknown) => {
      if (disposed) return
      console.error("Character showcase assets failed to load", error)
      setStatus("error")
    })

    const tick = (now: number) => {
      frame = 0
      if (disposed || !visible || document.hidden) return

      if (mixer) {
        const elapsed = (now - animationStart) / 1000
        const cycleLength = sequence.reduce((total, item) => total + item.duration, 0)
        let phase = elapsed % cycleLength
        let selected = sequence[0]
        for (const item of sequence) {
          if (phase < item.duration) {
            selected = item
            break
          }
          phase -= item.duration
        }

        if (selected.clip !== currentClip) {
          const clip = clips.find((item) => item.name === selected.clip)
          if (clip) {
            const action = mixer.clipAction(clip)
            action.reset()
            action.setLoop(selected.loop ? THREE.LoopRepeat : THREE.LoopOnce, selected.loop ? Infinity : 1)
            action.clampWhenFinished = !selected.loop
            action.fadeIn(0.11).play()
            currentAction?.fadeOut(0.11)
            currentAction = action
            currentClip = selected.clip
          }
        }

        mixer.update(Math.min((now - lastFrame) / 1000, 0.05))
      }
      lastFrame = now
      actor.rotation.y = 0.28
      renderer.render(scene, camera)
      frame = requestAnimationFrame(tick)
    }

    const scheduleFrame = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(tick)
    }
    const resize = () => {
      const width = host.clientWidth || 1
      const height = host.clientHeight || 1
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      scheduleFrame()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) scheduleFrame()
      else if (frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    })
    intersectionObserver.observe(host)
    const onVisibilityChange = () => {
      if (document.hidden && frame) {
        cancelAnimationFrame(frame)
        frame = 0
      } else scheduleFrame()
    }
    document.addEventListener("visibilitychange", onVisibilityChange)
    resize()
    scheduleFrame()

    return () => {
      disposed = true
      if (frame) cancelAnimationFrame(frame)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      mixer?.stopAllAction()
      disposeScene(scene)
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div ref={hostRef} className="absolute inset-0" aria-label="Animated Quaternius male character in peasant clothing on a crimson wireframe stage" role="img">
      {status === "loading" && <span className="absolute bottom-3 left-3 z-[1] text-[9px] uppercase tracking-[0.12em] text-emerald-100/55">Loading base character</span>}
      {status === "error" && <span className="absolute inset-x-3 bottom-3 z-[1] text-center text-[10px] text-emerald-100/70">3D preview unavailable</span>}
    </div>
  )
}