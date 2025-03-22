import { useMemo } from "react"

import { useWindowSize } from "../../hooks/useWindowSize"

import Card from "./Card"

function Grid() {
  const windowSize = useWindowSize()

  const cardProps = useMemo(() => {
    const columns = Math.max(Math.floor(windowSize.width / 75), 1)
    const rows = Math.max(Math.floor(windowSize.height / 75), 1)

    const positions = []

    const startColumn = Math.min(4, columns)
    const startRow = Math.min(4, rows)

    for (let i = startRow; i < columns - startRow; i++) {
      for (let j = startColumn; j < rows - startColumn; j++) {
        positions.push({
          x: i / columns,
          y: j / rows,
          width: 1 / columns,
          height: 1 / rows,
        })
      }
    }

    return positions
  }, [windowSize])

  return (
    <group>
      {cardProps.map((props, index) => (
        <Card key={index} {...props} />
      ))}
    </group>
  )
}

export default Grid
