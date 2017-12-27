const colorComparator = (color1, color2) => {
  const r1 = parseInt(color1.substring(0, 2), 16)
  const g1 = parseInt(color1.substring(2, 4), 16)
  const b1 = parseInt(color1.substring(4, 6), 16)

  const r2 = parseInt(color2.substring(0, 2), 16)
  const g2 = parseInt(color2.substring(2, 4), 16)
  const b2 = parseInt(color2.substring(4, 6), 16)

  let r = 255 - Math.abs(r1 - r2)
  let g = 255 - Math.abs(g1 - g2)
  let b = 255 - Math.abs(b1 - b2)

  r /= 255
  g /= 255
  b /= 255

  return r + g + b
}

export default colorComparator
