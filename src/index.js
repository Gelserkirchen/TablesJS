// import {Header} from '@/components/header/Header';
// import {Formula} from '@/components/formula/Formula';
// import {Toolbar} from '@/components/toolbar/Toolbar';
// import {Excel} from '@/components/excel/Excel'
// import {Table} from '@/components/table/Table';
// import {createStore} from '@core/createStore';
// import {rootReducer} from '@/redux/rootReducer';
// import {excelStorage, debounce} from '@core/utils';
// import {initialState} from '@/redux/initialState';
// import {applyMiddleware, compose} from 'redux';
// import thunk from 'redux-thunk'
// import logger from 'redux-logger'
import './scss/index.scss'
import {Router} from '@core/routes/Router';
import {DashboardPage} from '@/pages/DashboardPage';
import {ExcelPage} from '@/pages/ExcelPage';

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
})

