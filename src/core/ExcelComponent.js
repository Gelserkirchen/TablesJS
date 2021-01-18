import {DomListener} from '@core/DomListener';

// eslint-disable-next-line require-jsdoc
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.prepare()
    this.emitter = options.emitter
    this.unsubscribers = []
    this.store = options.store
    this.subscribers = options.subscribers || []
    this.storeUnsubscribe = null
  }
  // Prepare before initialization
  prepare() {}

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  isWatching(key) {
    return this.subscribers.includes(key)
  }

  storeChanged() {
  }

  // return template of component
  toHTML() {
    return '';
  }

  // Add listeners
  init() {
    this.initDOMListeners();
  }

  // Remove listeners
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(elem => elem());
    // this.storeUnsubscribe.unsubscribe();
  }
}
