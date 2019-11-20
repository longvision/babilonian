import {CONFIRM, IS_AUTHENTICATED, SIGN_OUT} from '~/redux/actions/auth';

const INITIAL_STATE = {
  isAuthenticated: false,
  confirm: false,
};

// reducers

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload.auth,
      };
    case CONFIRM:
      return {
        ...state,
        confirm: action.payload.code,
      };

    default:
      return state;
  }
}
console.tron.log(auth);

// actions
