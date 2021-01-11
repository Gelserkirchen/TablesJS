import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribers: ['currentText'],
      ...options,
    })
  }

  init() {
    super.init();
    this.$dataOfFormula = $(this.$root.find('#formula'))

    this.$on('table:select', $cell => {
      this.$dataOfFormula.text($cell.text())
    })
  }

  toHTML() {
    return `
        <div class="info">fx</div>
        <div 
            id="formula" 
            class="input" 
            contenteditable="true" 
            spellcheck="false">
        </div>`
  }

  storeChanged({currentText}) {
    this.$dataOfFormula.text(currentText)
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}