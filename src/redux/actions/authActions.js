import {
  loginService,
  forgetPassReqService,
} from '../../services/userServices';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_REQUEST_SUCCESS,
  FORGET_PASSWORD_REQUEST_FAIL,
} from '../constants/authConstants';

export const login =
  ({ email, password }) =>
  async dispatch => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });

      const { data } = await loginService({
        email,
        password,
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const requestForgotPassword =
  ({ email }) =>
  async dispatch => {
    try {
      dispatch({
        type: FORGET_PASSWORD_REQUEST,
      });

      const { data } = await forgetPassReqService({
        email,
      });

      dispatch({
        type: FORGET_PASSWORD_REQUEST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FORGET_PASSWORD_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => dispatch => {
  localStorage.clear();
  dispatch({
    type: LOGOUT,
  });
};
