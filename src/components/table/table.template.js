const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_VALUE = 120

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function toColumn({col, index, width}) {
  return `<div class="column" 
               data-type="resizable" 
               data-col="${index}" 
               style="width: ${width}
               ">
            ${col}
            <div class="col-resize" data-resize="col"></div>
          </div>`
}

function toCell(state, row) {
  return function(_, col) {
    const width = getWidth(state.colState, col)
    return `<div class="cell" 
                 contenteditable="true" 
                 data-col="${col}" 
                 data-type="cell"
                 data-id="${row}:${col}"
                 style="width: ${width}"></div>`
  }
}

function createRow(numbers, content) {
  // eslint-disable-next-line max-len
  const rowResize = numbers ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `<div class="row"  data-type="resizable" >
            <div class="row-info">
                ${numbers}
                ${rowResize}
            </div>
            <div class="row-data">${content}</div>
          </div>`
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_VALUE) + 'px'
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index),
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  // debugger
  rows.push(createRow('', cols));

  for (let row = 0; row < rowsCount; row++) {
    const colsWithoutContent = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')

    rows.push(createRow(row + 1, colsWithoutContent));
  }

  return rows.join('')
}
