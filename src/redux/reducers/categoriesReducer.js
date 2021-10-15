import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
} from '../constants/categoriesConstants';

export const categoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case DELETE_CATEGORY_REQUEST:
      return { ...state, deleting: true, deleteError: null, deleted: false };
    case DELETE_CATEGORY_SUCCESS: {
      let stateCopy = [...state.categories];
      let deleteIndex = stateCopy.findIndex(
        state => state.id === action.payload
      );
      stateCopy.splice(deleteIndex, 1);

      return {
        ...state,
        deleting: false,
        deleted: true,
        data: stateCopy,
      };
    }
    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        deleting: false,
        deleteError: action.payload,
        deleted: false,
      };
    default:
      return state;
  }
};
