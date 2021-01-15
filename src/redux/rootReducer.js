import {
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TEXT, CHANGE_TITLE,
  TABLE_RESIZE,
} from '@/redux/types';

export function rootReducer(state, action) {
  let field
  let val

  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.typeOfResize === 'col' ? 'colState' : 'rowState'
      return {...state,
        [field]: value(state, field, action)}
    case CHANGE_TEXT:
      field = 'dataState'
      return {...state,
        currentText: action.data.value,
        [field]: value(state, field, action)}
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {}
      action.data.ids.map(id => {
        val[id] = {...val[id], ...action.data.value}
      })
      return {...state,
        [field]: val,
        // currentStyles: {...state.currentStyles, title: action.data},
        currentStyles: {...state.currentStyles, ...action.data.value},
      }
    case CHANGE_TITLE:
      return {...state, title: action.data.value}
    default: return state
  }
}

function value(state, field, action) {
  // eslint-disable-next-line max-len
  const val = state[field] || {} // get all current state by key field (because we cannot mute current state)
  val[action.data.id] = action.data.value
  return val
}