import {excelStorage} from '@core/utils';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  realState: '',
}

export const initialState = excelStorage('excel')
                          ? excelStorage('excel')
                          : defaultState