import {
  loginService,
  forgetPassReqService,
} from '../../services/authServices';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_REQUEST_SUCCESS,
  FORGET_PASSWORD_REQUEST_FAIL,
} from '../constants/authConstants';
import { CLEAR_USER_DETAILS, GET_USER_DETAILS_SUCCESS } from '../constants/userConstants';

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
        type: GET_USER_DETAILS_SUCCESS,
        payload: data.user,
      });

      dispatch({
        type: LOGIN_SUCCESS,
      });

      localStorage.setItem('token', JSON.stringify(data.token));
      localStorage.setItem('userInfo', JSON.stringify(data.user));
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
  dispatch({
    type: CLEAR_USER_DETAILS,
  });
};
