import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGIN_USER_WITH_AGENTID,
    SHOW_MODAL
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    response: {},
    error: '',
    loading: false,
    showModal: false
};

export default(state = INITIAL_STATE, action) => {

    switch(action.type) {

            //LoginForm
        case EMAIL_CHANGED:
            return { ...state, email: action.payload }; //returns a new object in which, email in state is over written
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return {...state, loading: true, error: '', password: '', email: ''}        
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, response: action.payload };
        case LOGIN_USER_FAIL: 
            return { ...state, ...INITIAL_STATE, error: 'Authentication failed!!!' }

            //CustomerList
        case SHOW_MODAL:
            return { ...state, showModal: !action.payload }
        case LOGIN_USER_WITH_AGENTID:
            return { ...state, response: action.payload }
        default:
            return state;
    }
}