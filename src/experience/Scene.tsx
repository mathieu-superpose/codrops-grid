import Grid from "./components/Grid"
import { OrthographicCamera } from "@react-three/drei"

function Scene() {
  return (
    <>
      <Grid />
      
      <OrthographicCamera
        makeDefault
        position={[0, 0, 1]}
        left={0}
        right={1}
        top={1}
        bottom={0}
      />
    </>
  )
}

export default Scene
