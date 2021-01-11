import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.functions';
import {isCell} from '@/components/table/table.functions';
import {TableSelector} from '@/components/table/TableSelector';
import {range} from '@core/utils';
import * as actions from '@/redux/actions';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup', 'keydown', 'input'],
      ...options,
    });
  }

  prepare() {
    this.selector = new TableSelector()
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize table error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const target = $target.id(true);
        const current = this.selector.current.id(true);
        const cols = range(current, target);
        const $cells = cols.map(el => {
          return $(this.$root.find(`[data-id="${el}"]`))
        })
        this.selector.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  init() {
    super.init();
    const $cell = $(this.$root.find('[data-id="0:0"]'))
    this.selectCell($cell)

    this.$on('formula:input',
        text => {
          this.selector.current.text(text)
          this.updateTextInStore(text)
        })

    this.$on('formula:done', () => {
      this.selector.current.focus()
    })
  }

  selectCell($cell) {
    this.selector.select($cell)
    this.$emit('table:select', $cell)
    // this.$dispatch({type: 'TEST'})
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
      this.selectCell($nextCell)
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
    return createTable(15, this.store.getState());
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selector.current.id(),
      value,
    }))
  }

  onInput(event) {
    // this.$emit('table:input', $(event.target))
    // debugger
    // console.log($(event.target).$el.textContent)
    this.updateTextInStore($(event.target).text())
  }
}
