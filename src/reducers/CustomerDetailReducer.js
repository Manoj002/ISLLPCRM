import {
    SHOW_ANIMATION,
    SHOW_MODAL,
    LOGIN_USER_WITH_AGENTID
} from '../actions/types';

const INITIAL_STATE = {
    CustomerID: '',
    showModal: false,
    response: ''
}

export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SHOW_ANIMATION:
            return { CustomerID: action.payload };
        case SHOW_MODAL:
            return { ...state, showModal: !action.payload }
        default:
            return state;
    }
}