import { updateUserDetailsService } from '../../services/userServices.js';
import {
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
} from '../constants/userConstants.js';

export const updateUserDetails = payload => async dispatch => {
  try {
    dispatch({
      type: UPDATE_USER_DETAILS_REQUEST,
    });

    const { data } = await updateUserDetailsService(payload);

    dispatch({
      type: UPDATE_USER_DETAILS_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: UPDATE_USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
