class Dom {
  constructor(selector) {
    // this.$$listeners = {};
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text
      return this
    }

    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.textContent.trim()
    }
    return this.$el.textContent.trim()
  }

  on(eventType, callback) {
    // this.$$listeners[eventType] = callback;
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
  }

  clear() {
    this.html('')
    return this
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  get data() {
    return this.$el.dataset
  }

  id(parse) {
    if (parse) {
      const arrayOfdigits = this.data.id.split(':')
      const obj = {
        row: +arrayOfdigits[0],
        column: +arrayOfdigits[1],
      }
      return obj
    }
    return this.data.id
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  find(selector) {
    return this.$el.querySelector(selector)
  }

  css(styles = {}) {
    Object.keys(styles)
        .forEach(key => {
          this.$el.style[key] = styles[key]
        })
  }

  getStyles(styles = []) {
    return styles.reduce((selectedCellAsAnObject, style) => {
      selectedCellAsAnObject[style] = this.$el.style[style]
      return selectedCellAsAnObject
    }, {})
  }

  focus() {
    this.$el.focus()
    return this
  }

  addClasses(className) {
    this.$el.classList.add(className);
    return this
  }

  removeClasses(className) {
    this.$el.classList.remove(className);
    return this
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tag, classes = '') => {
  const el = document.createElement('div');
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
