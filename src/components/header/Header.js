import {ExcelComponent} from '@core/ExcelComponent';
// import {$} from '@core/Dom';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants';
import {ActiveRout} from '@core/routes/ActiveRout';
import {$} from '@core/Dom';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    }
    );
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
        <input type="text" class="input" value="${title}">
        <div>
            <div class="button" data-button="remove">
                <i class="material-icons" data-button="remove">delete</i>
            </div>
            <div class="button" data-button="exit">
                <i class="material-icons" data-button="exit">exit_to_app</i>
            </div>
        </div>`
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'remove') {
      const decision = confirm('Do you wanna to delete this shit?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRout.param)
        ActiveRout.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRout.navigate('')
    }
  }

  onInput(event) {
    const $target = event.target
    this.$dispatch(changeTitle($target))
  }
}