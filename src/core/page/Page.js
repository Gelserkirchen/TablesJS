export class Page {
  constructor(params) {
    this.params = params || Date.now().toString()
  }

  getRoot() {
    throw new Error('root should be added')
  }

  afterRender() {}

  destroy() {}
}