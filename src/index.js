import {Header} from '@/components/header/Header';
import {Formula} from '@/components/formula/Formula';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Excel} from '@/components/excel/Excel'
import {Table} from '@/components/table/Table';
import './scss/index.scss'

// eslint-disable-next-line no-undef
const excel = new Excel('#app', {
  // eslint-disable-next-line no-undef
  components: [Header, Toolbar, Formula, Table],
});

excel.render();
