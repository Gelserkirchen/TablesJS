class Dom {
  constructor(selector) {
    // this.$$listeners = {};
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }

    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.textContent.trim()
    }
    return this.$el.textContent.trim()
  }

  clear() {
    this.html('')
    return this
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

  focus() {
    this.$el.focus()
    return this
  }

  addClasses(className) {
    return this.$el.classList.add(className);
  }

  removeClasses(className) {
    return this.$el.classList.remove(className);
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
