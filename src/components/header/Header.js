import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    }
    );
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    console.log('TITLE in HEADER', this.store)
    return `
        <input type="text" class="input" value="${title}">
        <div>
            <div class="button">
                <i class="material-icons">exit_to_app</i>
                <i class="material-icons">delete</i>
            </div>
        </div>`
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target))
  }
}