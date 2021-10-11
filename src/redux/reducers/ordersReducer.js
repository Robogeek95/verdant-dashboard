import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
} from '../constants/ordersConstants';

export const ordersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        ordersData: action.payload,
        success: true,
      };
    case GET_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};
