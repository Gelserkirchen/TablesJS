export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let listeners = []

  return {
    subscribe(fn) {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners = listeners.filter(listener => listener !== fn)
        },
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach(listener => listener(state))
    },
    getState() {
      // eslint-disable-next-line max-len
      // console.log('createStore.getState():', JSON.parse(JSON.stringify(state)))
      // console.log('only state: ', state)
      return JSON.parse(JSON.stringify(state))
    },
  }
}