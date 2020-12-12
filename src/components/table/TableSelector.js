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
    $cell.focus().addClasses(TableSelector.selection)
  }

  selectGroup($rangeArray = []) {
    this.clearSelection()
    this.group = $rangeArray
    $rangeArray.forEach($el => {
      $el.addClasses(TableSelector.selection)
    })
  }

  clearSelection() {
    this.group.forEach($el => $el.removeClasses(TableSelector.selection))
    this.group = []
  }
}