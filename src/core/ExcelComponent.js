import {DomListener} from '@core/DomListener';

// eslint-disable-next-line require-jsdoc
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    // eslint-disable-next-line no-undef
    this.prepare()
    this.emitter = options.emitter
    console.log(options)
  }

  prepare() {}

  // return template of component
  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
