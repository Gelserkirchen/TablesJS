import {excelStorage} from '@core/utils';

function storageName(param) {
  console.log('param in ExcelPage:', param)
  return 'excel:' + param
}

export class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name)
  }

  save(state) {
    excelStorage(this.name, state)
    return Promise.resolve()
  }

  get() {
    return Promise.resolve(excelStorage(this.name))
  }
}