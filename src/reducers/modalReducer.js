import {SHOW_MODAL, HIDE_MODAL} from '../constants/actionTypes'

const initialState = {
  modalType: null,
  modalProps: {
    open: false
  }
}
export default function modalReducer(state = {}, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalProps: action.modalProps,
        modalType: action.modalType,
        type: action.type
      }
    case HIDE_MODAL:
      return initialState
    default:
      return state
  }
}