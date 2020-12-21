export function createState(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let listeners = []

  return {
    dispatch(action) {
      state = rootReducer(state, action)
      listeners = listeners.forEach(listener => listener(state))
    },
    subscribe(fn) {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners.filter(listener => listener !== fn)
        },
      }
    },
    getState() {
      return state
    },
  }
}