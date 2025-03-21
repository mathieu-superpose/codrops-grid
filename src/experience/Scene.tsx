import * as THREE from "three"
import { OrthographicCamera } from "@react-three/drei"

import Grid from "./components/Grid"

function Scene() {
  const bgColor = new THREE.Color(0xd3d1c5)

  return (
    <>
      <Grid />

      <OrthographicCamera
        makeDefault
        position={[0, 0, 10]}
        left={0}
        right={1}
        top={1}
        bottom={0}
      />

      <color attach="background" args={[bgColor]} />
    </>
  )
}

export default Scene
