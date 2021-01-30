import {Page} from '@core/Page';
import {applyMiddleware, compose} from 'redux';
import {debounce, excelStorage} from '@core/utils';
import {createStore} from '@core/store/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {normalizeInitialState} from '@/redux/initialState';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {Excel} from '@/components/excel/Excel';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';

function storageName(param) {
  console.log('param in ExcelPage:', param)
  return 'excel:' + param
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      || compose;
    const enhancer = composeEnhancers(
        applyMiddleware(thunk, logger),
    );
    console.log('this.params', params)

    const state = excelStorage(storageName(params))
    const store = createStore(rootReducer,
        normalizeInitialState(state), enhancer)

    const stateListener = debounce(state => {
      // console.log('index.js, state: ', state)
      excelStorage(storageName(params), state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}