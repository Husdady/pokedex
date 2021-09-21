import { SHOW_LOADING, HIDE_LOADING } from '@redux/types';

const initialState = true;

const loading = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return true;
    case HIDE_LOADING:
      return false;
    default:
      return state
  }
}

export default loading;
