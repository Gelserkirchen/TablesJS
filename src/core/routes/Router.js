import {$} from '@core/Dom';
import {ActiveRout} from '@core/routes/ActiveRout';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.$phaceholder = $(selector)
    this.routes = routes
    this.changePlaceHolder = this.changePlaceHolder.bind(this)
    this.page = null
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePlaceHolder)
  }

  changePlaceHolder() {
    this.$phaceholder.clear()
    if (this.page) {
      this.page.destroy()
    }
    const Page = ActiveRout.path.includes('excel') ?
          this.routes.excel :
          this.routes.dashboard

    this.page = new Page(ActiveRout.param)

    this.$phaceholder.append(this.page.getRoot())

    this.page.afterRender()
  }

  destroy() {
    window.addEventListener('hashchange', this.changePlaceHolder)
  }
}