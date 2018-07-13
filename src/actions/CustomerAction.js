import {
    SHOW_ANIMATION,
    SHOW_MODAL,
    LOGIN_USER_WITH_AGENTID,
} from './types';
import axios from 'axios';

export const selectCustomer = ( CustomerID ) => {
    return {
        type: SHOW_ANIMATION,
        payload: CustomerID
    }
}

export const selectModal = ( showModal ) => {
    return{
        type: SHOW_MODAL,
        payload: showModal
    }
}
