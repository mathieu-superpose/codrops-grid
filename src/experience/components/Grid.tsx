import { useMemo } from "react"

import Card from "./Card"

function Grid() {
  const columns = useMemo(() => {
    return Math.max(Math.floor(window.innerWidth / 100), 1)
  }, [window.innerWidth])

  const rows = useMemo(() => {
    return Math.max(Math.floor(window.innerHeight / 100), 1)
  }, [window.innerHeight])

  const cardProps = useMemo(() => {
    const positions = []

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        positions.push({
          x: i / columns,
          y: j / rows,
          width: 1 / columns,
          height: 1 / rows,
        })
      }
    }

    return positions
  }, [columns, rows])

  return (
    <group>
      {cardProps.map((props, index) => (
        <Card key={index} {...props} />
      ))}
    </group>
  )
}

export default Grid
