import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.functions';
import {isCell} from '@/components/table/table.functions';
import {TableSelector} from '@/components/table/TableSelector';
import {range} from '@core/utils';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mouseup', 'keydown'],
    });
  }

  prepare() {
    this.selector = new TableSelector()
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const target = $target.id(true);
        const current = this.selector.current.id(true);
        const cols = range(current, target);
        const $cells = cols.map(el => {
          return $(this.$root.find(`[data-id="${el}"]`))
        })
        console.log($cells)
        this.selector.selectGroup($cells)
      } else {
        this.selector.select($target)
      }
    }
  }

  init() {
    super.init();
    const $cell = $(this.$root.find('[data-id="0:0"]'))
    this.selector.select($cell)
  }

  onMouseup(event) {
  }

  onKeydown(event) {
    const KeydownEvents = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Enter',
    ]

    const currentCell = this.selector.current.id(true)
    const key = event.key
    if (KeydownEvents.includes(key) && !event.shiftKey) {
      const $nextCell = $(this.$root
          .find(this.keydownEventHandler(key, currentCell)))
      this.selector.select($nextCell)
    }
  }

  keydownEventHandler(key, {row, column}) {
    const MIN_VALUE = 0

    switch (key) {
      case 'ArrowDown':
      case 'Enter':
        row++
        break
      case 'ArrowRight':
      case 'Tab':
        column++
        break
      case 'ArrowUp':
        row != MIN_VALUE ? row-- : row
        break
      case 'ArrowLeft':
        column != MIN_VALUE ? column-- : column
        break
    }

    return `[data-id="${row}:${column}"]`
  }

  toHTML() {
    return createTable();
  }
}
