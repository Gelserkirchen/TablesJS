import {Header} from '@/components/header/Header';
import {Formula} from '@/components/formula/Formula';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Excel} from '@/components/excel/Excel'
import {Table} from '@/components/table/Table';
import './scss/index.scss'
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {excelStorage} from '@core/utils';

const store = createStore(rootReducer, excelStorage('excel'))

store.subscribe(state => {
  excelStorage('excel', state)
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
