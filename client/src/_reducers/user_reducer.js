import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
} from "../_actions/types";

export default function (state = { info: { isLoading: true } }, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return {
        info: action.payload.info,
        loginSuccess: action.payload.loginSuccess,
        message: action.payload.message,
      };
    case AUTH_USER:
      return { ...state, info: action.payload };
    case LOGOUT_USER:
      return { ...state };
    default:
      return state;
  }
}
