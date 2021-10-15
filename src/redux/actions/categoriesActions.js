import {
  getCategoriesService,
  deleteCategoryService,
} from '../../services/categoriesService';
import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
} from '../constants/categoriesConstants';

export const getCategories = () => async dispatch => {
  try {
    dispatch({
      type: GET_CATEGORIES_REQUEST,
    });

    const { data } = await getCategoriesService();

    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: data.categories,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCategory = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_CATEGORY_REQUEST,
    });

    deleteCategoryService(id).then(() => {
      dispatch({
        type: DELETE_CATEGORY_SUCCESS,
        payload: id,
      });
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
