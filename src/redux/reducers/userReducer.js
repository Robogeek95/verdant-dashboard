import {
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAIL,
  CLEAR_USER_DETAILS,
} from '../constants/userConstants';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_DETAILS_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        success: true,
      };
    case GET_USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case UPDATE_USER_DETAILS_REQUEST:
      return { ...state, loading: true, error: null, updated: false };
    case UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: { ...state.userInfo, ...action.payload },
        updated: true,
      };
    case UPDATE_USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        updated: false,
      };
    case CLEAR_USER_DETAILS:
      return {};

    default:
      return state;
  }
};
