import { useMemo, useRef } from "react"
import * as THREE from "three"

import { useCursorPosition } from "../../hooks/useCursorPosition"
import { useFrame } from "@react-three/fiber"

const MAX_SCALE = 3

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

  useFrame(() => {
    if (meshRef.current) {
      const distance = Math.sqrt(
        (cursorPosition.x - position.x) ** 2 +
          (cursorPosition.y - position.y) ** 2
      )

      if (distance < 0.1) {
        meshRef.current.scale.set(MAX_SCALE * width, MAX_SCALE * height, 1)
        meshRef.current.position.z = 1 - distance
      } else {
        meshRef.current.scale.set(width, height, 1)
        meshRef.current.position.z = 0
      }
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
