import initialState from './initialState';

export default function menuReducer(state = initialState.menu, action: any) {
  let retorno = null;
  switch (action.type) {
    case 'HANDLE_MENU_CHANGE':
      retorno = { ...state, active: action.active };
      return retorno;
    default:
      return state;
  }
}
