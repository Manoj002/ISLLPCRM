import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import CustomerDetailReducer from './CustomerDetailReducer';

export default combineReducers({
    auth: AuthReducers,
    customer: CustomerDetailReducer
});