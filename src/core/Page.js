export class Page {
  constructor(params) {
    this.params = params
  }

  getRoot() {
    throw new Error('root should be added')
  }

  afterRender() {}

  destroy() {}
}