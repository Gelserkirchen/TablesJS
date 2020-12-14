import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
      emitter: options.emitter,
    })
  }

  toHTML() {
    return `
        <div class="info">fx</div>
        <div class="input" contenteditable="true" spellcheck="false"></div>`
  }

  onInput(event) {
    const text = event.target.textContent.trim()
    this.emitter.emit('this is working', text)
  }

  onClick() {
  }
}