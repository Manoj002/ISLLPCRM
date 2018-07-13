import {
    SHOW_ANIMATION,
    SHOW_MODAL
} from './types';

export const selectCustomer = ( CustomerID ) => {
    return {
        type: SHOW_ANIMATION,
        payload: CustomerID
    }
}

export const showModal = ( modalVisibility ) => {
    return{
        type: SHOW_MODAL,
        payload: modalVisibility
    }
}