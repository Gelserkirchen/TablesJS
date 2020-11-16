// eslint-disable-next-line require-jsdoc
// import {Options as $el} from "webpack";
import {$} from '@core/Dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || []
  }

  getRoot() {
    // eslint-disable-next-line no-undef
    const $root = $.create('div', 'excel')

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      // DEBUG
      // eslint-disable-next-line no-debugger
      // debugger
      // if (component.__proto__.constructor.name) {
      //   window['c' + component.__proto__.constructor.name] = component
      // }
      $el.html(component.toHTML());
      $root.append($el);
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach(component => {
      component.init();
    })
  }
}

