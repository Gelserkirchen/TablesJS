import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/Dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mouseup'],
    });
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords();
      // console.log(coords.data)
      const col = $parent.data.col

      document.onmousemove = evt => {
        const delta = evt.pageX - coords.right
        const value = coords.width + delta
        $parent.$el.style.width = value + 'px'
        document.querySelectorAll(`[data-col="${col}"]`)
            .forEach(element => {
              element.style.width = value + 'px'
            })
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }

  onMouseup(event) {
  }


  toHTML() {
    return createTable();
  }
}
