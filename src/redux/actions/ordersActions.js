import { getOrdersService } from '../../services/ordersServices';

import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
} from '../constants/ordersConstants';

export const getOrders = () => async dispatch => {
  try {
    dispatch({
      type: GET_ORDERS_REQUEST,
    });

    const { data } = await getOrdersService();

    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
