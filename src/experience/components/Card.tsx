import { useMemo, useRef } from "react"
import * as THREE from "three"

import { useCursorPosition } from "../../hooks/useCursorPosition"
import { useFrame } from "@react-three/fiber"

const SCALE_FACTOR = 3
const DISTANCE_FACTOR = 10

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
  const meshRef = useRef<THREE.Mesh>(null)

  const targetScale = useMemo(() => {
    return new THREE.Vector3()
  }, [])

  const cursorPosition = useCursorPosition()

  const randomColorMaterial = useMemo(() => {
    const r = Math.ceil(Math.random() * 255)
    const g = Math.ceil(Math.random() * 255)
    const b = Math.ceil(Math.random() * 255)

    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(`rgb(${r}, ${g}, ${b})`),
    })
  }, [])

  const position = useMemo(() => {
    return new THREE.Vector3(x + width / 2, y + height / 2, 0)
  }, [x, y, width, height])

  const defaultScale = useMemo(() => {
    return new THREE.Vector3(width, height, 1)
  }, [width, height])

  const maxScale = useMemo(() => {
    return new THREE.Vector3(SCALE_FACTOR * width, SCALE_FACTOR * height, 1)
  }, [width, height])

  useFrame((_, dt) => {
    if (meshRef.current) {
      const distance = Math.sqrt(
        (cursorPosition.x - position.x) ** 2 +
          (cursorPosition.y - position.y) ** 2
      )

      targetScale.lerpVectors(defaultScale, maxScale, Math.max(1 - distance * DISTANCE_FACTOR, 0))

      meshRef.current.scale.lerp(targetScale, 1 - Math.pow(0.005, dt))
      meshRef.current.position.z = 1 - distance
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={[width, height, 1]}
      material={randomColorMaterial}
    >
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

export default Card
