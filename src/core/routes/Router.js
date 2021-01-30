import {$} from '../Dom';
import {ActiveRout} from './ActiveRout';
import {Loader} from '../../components/Loader';


export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.$phaceholder = $(selector)
    this.routes = routes

    this.loader = new Loader()

    this.changePageHandler = this.changePageHandler.bind(this)
    this.page = null
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
  }

  async changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }

    this.$phaceholder.clear().append(this.loader)

    const Page = ActiveRout.path.includes('excel') ?
          this.routes.excel :
          this.routes.dashboard

    this.page = new Page(ActiveRout.param)

    const root = await this.page.getRoot()

    this.$phaceholder.clear().append(root)

    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}