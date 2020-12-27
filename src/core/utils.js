// Purs function
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
  // v.55 (own realization)
  const arrayOfCells = []

  if (start.row > end.row) {
    [start, end] = [end, start]
  }

  for (let i = start.row; i < end.row + 1; i++) {
    for (let j = start.column; j < end.column + 1; j++) {
      arrayOfCells.push(`${i}:${j}`)
    }
  }
  return arrayOfCells
}

export function excelStorage(key, value = null) {
  if (!value) {
    return JSON.parse(localStorage.getItem(key))
  } else {
    localStorage.setItem(key, JSON.stringify(value))
  }
}