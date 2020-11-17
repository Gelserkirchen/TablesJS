const CODES = {
  A: 65,
  Z: 90,
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function toColumn(col) {
  return `<div class="column">${col}</div>`
}

function toCell() {
  return `<div class="cell" contenteditable="true"></div>`
}

function createRow(numbers = '', content) {
  return `<div class="row">
            <div class="row-info">${numbers}</div>
            <div class="row-data">${content}</div>
          </div>`
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const colsWithoutContent = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')

  // debugger
  const cols = new Array(colsCount)
      .fill('')
  // eslint-disable-next-line no-undef
      .map(toChar)
      .map(el => toColumn(el))
      .join('')

  console.log(cols);
  rows.push(createRow('', cols));

  for (let i = 1; i < rowsCount; i++) {
    rows.push(createRow(i, colsWithoutContent));
  }

  return rows.join('')
}

//   <div class="row">
//      <div class="row-info"></div>
//      <div class="row-data">
//          <div class="column">A</div>
//          <div class="column">B</div>
//          <div class="column">C</div>
//      </div>
//   </div>
//   <div class="row">
//      <div class="row-info">1</div>
//      <div class="row-data">
//           <div class="cell" contenteditable="true">1</div>
//           <div class="cell" contenteditable="true">2</div>
//           <div class="cell" contenteditable="true">3</div>
//      </div>
//   </div>