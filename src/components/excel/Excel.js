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

    this.components.forEach(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      $el.html(component.toHTML());
      $root.append($el);
    })

    return $root
  }

  render() {
    // console.log(this.$el);
    // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`);
    this.$el.append(this.getRoot());
  }
}


// const $root = document.createElement('div');
// $root.classList.add('excel');
//
// this.components.forEach(Component => {
//
// })
// return $root;


// const $el = document.createElement('div') // create div
// $el.classList.add(Component.className); // add class to element
// const component = new Component($el); // component from element
// $el.innerHTML = component.toHTML(); // html from component
// $root.append($el); // add element to render