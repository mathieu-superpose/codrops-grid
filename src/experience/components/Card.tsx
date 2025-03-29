import { useMemo, useRef } from "react"
import * as THREE from "three"

import { useCursorPosition } from "../../hooks/useCursorPosition"
import { extend, useFrame, useLoader } from "@react-three/fiber"

import { shaderMaterial } from "@react-three/drei"

import vertex from "../../shaders/card/vertex.glsl"
import fragment from "../../shaders/card/fragment.glsl"

const CardShaderMaterial = shaderMaterial({}, vertex, fragment)

extend({ CardShaderMaterial })

const MIN_SCALE_FACTOR = 3
const MAX_SCALE_FACTOR = 4
const DISTANCE_FACTOR = 6

const randomTexture = () => {
  const textures = [
    "textures/img1.webp",
    "textures/img2.webp",
    "textures/img4.webp",
    "textures/img6.webp",
    "textures/img8.webp",
    "textures/img10.webp",
    "textures/img3.webp",
    "textures/img5.webp",
    "textures/img7.webp",
    "textures/img9.webp",
  ]

  return textures[Math.floor(Math.random() * textures.length)]
}

function Card({
  x,
  y,
  width,
  height,
}: {
  x: number
  y: number
  width: number
  height: number
}) {
  const initialPosition = useMemo(() => {
    return new THREE.Vector3(0.0, 0.5, 0.5)
  }, [])

  const aspect = useMemo(() => width / height, [width, height]) //

  const meshRef = useRef<THREE.Mesh>(null)

  const texture = useLoader(THREE.TextureLoader, randomTexture())

  const material = useMemo(() => {
    const material = new CardShaderMaterial()

    material.uniforms.uTexture = new THREE.Uniform(texture)
    material.uniforms.uDistance = new THREE.Uniform(1)

    material.transparent = true

    return material
  }, [])

  const targetScale = useMemo(() => {
    return new THREE.Vector3()
  }, [])

  const cursorPosition = useCursorPosition()

  const targetPosition = useMemo(() => {
    return new THREE.Vector3(x + width / 2, 0.5, 0)
  }, [x, y, width, height])

  const defaultScale = useMemo(() => {
    return new THREE.Vector3(
      width / MIN_SCALE_FACTOR,
      height / MIN_SCALE_FACTOR,
      1
    )
  }, [width, height])

  const maxScale = useMemo(() => {
    return new THREE.Vector3(
      MAX_SCALE_FACTOR * width,
      MAX_SCALE_FACTOR * height,
      1
    )
  }, [width, height])

  useFrame((state, dt) => {
    if (meshRef.current) {
      let distanceX = (cursorPosition.x - meshRef.current.position.x) ** 2
      let distanceY = (cursorPosition.y - meshRef.current.position.y) ** 2

      if (state.clock.elapsedTime > 1.1) {
        targetPosition.y = y + height / 2
      }

      meshRef.current.position.lerp(targetPosition, 1 - Math.pow(0.005, dt))

      aspect > 1 ? (distanceX *= aspect ** 2) : (distanceY *= aspect ** 2)

      const distance = Math.sqrt(distanceX + distanceY)

      targetScale.lerpVectors(
        defaultScale,
        maxScale,
        Math.max(1 - distance * DISTANCE_FACTOR, 0)
      )

      meshRef.current.scale.lerp(targetScale, 1 - Math.pow(0.005, dt))
      meshRef.current.position.z = 1 - distance

      material.uniforms.uDistance.value = distance * 10
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={initialPosition}
      scale={[width / MIN_SCALE_FACTOR, height / MIN_SCALE_FACTOR, 1]}
      material={material}
    >
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

export default Card
