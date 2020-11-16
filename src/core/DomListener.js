// eslint-disable-next-line no-unused-vars
import {capitalize} from '@core/utils';

// eslint-disable-next-line require-jsdoc
export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('There is no $root')
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = addEventName(listener);
      if (!this[method]) {
        throw new Error(
            `Method ${method} has no exist in ${this.$root.$el.className}`)
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = addEventName(listener)
      this.$root.off(method, this[method])
    })
  }
}

function addEventName(string) {
  return 'on' + capitalize(string)
}