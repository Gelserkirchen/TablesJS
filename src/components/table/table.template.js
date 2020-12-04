const CODES = {
  A: 65,
  Z: 90,
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function toColumn(col, index) {
  return `<div class="column" data-type="resizable" data-col="${index}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
          </div>`
}

function toCell(_, col) {
  return `<div class="cell" contenteditable="true" data-col="${col}"></div>`
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
  // eslint-disable-next-line no-undef
      .map(toChar)
      .map(toColumn)
      .join('')

  // debugger
  rows.push(createRow('', cols));

  for (let i = 0; i < rowsCount; i++) {
    const colsWithoutContent = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')

    rows.push(createRow(i + 1, colsWithoutContent));
  }

  return rows.join('')
}
