import {$} from '@core/Dom';

export class TableSelector {
  static selection = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($cell) {
    this.clearSelection()
    this.group.push($cell)
    this.current = $cell
    $cell.addClasses(TableSelector.selection)
    // $cell.classList.add(TableSelector.selection)
  }

  selectGroup(rangeArray) {
    this.clearSelection()
    rangeArray.map(el => {
      const $cellOfRange = $(document.querySelector(`[data-id="${el}"]`))
      $cellOfRange.addClasses(TableSelector.selection)
      this.group.push($cellOfRange)
    })
  }

  clearSelection() {
    // debugger
    this.group.forEach($el => $el.removeClasses(TableSelector.selection))
    this.group = []
  }
}