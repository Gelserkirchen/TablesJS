import {Header} from '@/components/header/Header';
import {Formula} from '@/components/formula/Formula';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Excel} from '@/components/excel/Excel'
import {Table} from '@/components/table/Table';
import './scss/index.scss'
import {createState} from '@core/createState';
import {rootReducer} from '@/redux/rootReducer';

const state = createState(rootReducer)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  state,
});

excel.render();
