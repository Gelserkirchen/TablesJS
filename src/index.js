import {Header} from '@/components/header/Header';
import {Formula} from '@/components/formula/Formula';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Excel} from '@/components/excel/Excel'
import {Table} from '@/components/table/Table';
import './scss/index.scss'
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {excelStorage, debounce} from '@core/utils';
import {initialState} from '@/redux/initialState';
import {applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk, logger),
);

const store = createStore(rootReducer, initialState, enhancer)

const stateListener = debounce(state => {
  console.log('index.js, state: ', state)
  excelStorage('excel', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
