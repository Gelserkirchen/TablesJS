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

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelToDashCase(text) {
  return text.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
      .join(';')
}