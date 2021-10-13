import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  loginReducer,
  requestForgotPasswordReducer,
} from './reducers/authReducer';
import { ordersReducer } from './reducers/ordersReducer';
import { userReducer } from './reducers/userReducer';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

console.log({ userInfoFromStorage });

const reducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  requestForgotPassword: requestForgotPasswordReducer,
  orders: ordersReducer,
});

const initialState = {
  user: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
