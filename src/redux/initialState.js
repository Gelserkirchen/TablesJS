import {excelStorage} from '@core/utils';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
}

export const initialState = excelStorage('excel')
                          ? excelStorage('excel')
                          : defaultState