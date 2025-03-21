import { useMemo } from "react"
import * as THREE from "three"

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
  const randomColorMaterial = useMemo(() => {
    const r = Math.ceil(Math.random() * 255)
    const g = Math.ceil(Math.random() * 255)
    const b = Math.ceil(Math.random() * 255)

    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(`rgb(${r}, ${g}, ${b})`),
    })
  }, [])

  return (
    <mesh
      position={[x + width / 2, y + height / 2, 0]}
      scale={[width, height, 1]}
      material={randomColorMaterial}
    >
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

export default Card
