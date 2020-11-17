const CODES = {
  A: 65,
  Z: 90,
}

function toChar(_, index) {
  String.fromCharCode(CODES.A + index)
}

function createCell() {
  return `<div class="cell" contenteditable>B2</div>`
}

function toColumn(col) {
  return `<div class="column">${col}</div>`
}

function createRow(content) {
  return `<div class="row">
            <div class="row-info"></div>
            <div class="row-data">${content}</div>
          </div>`
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(el => toColumn(el))
      .join('')

  // const rows = new Array(rowsCount)
  //   .fill('')
  //   .map(el => to)

  console.log(cols);
  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow());
  }

  return rows.join('')
}

//   <div class="row">
//   <div class="row-info"></div>
//   <div class="row-data">
//   <div class="column">A</div>
//   <div class="column">B</div>
//   <div class="column">C</div>
//   </div>
//   </div>
//   <div class="row">
//   <div class="row-info">1</div>
//   <div class="row-data">
//   <div class="cell" contenteditable="true">1</div>
//   <div class="cell" contenteditable="true">2</div>
//   <div class="cell" contenteditable="true">3</div>
//   </div>
//   </div>