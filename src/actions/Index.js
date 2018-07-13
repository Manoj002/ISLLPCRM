// export * from './AuthActions';
// export * from './CustomerAction';

import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGIN_USER_WITH_AGENTID
} from './types';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

export const emailChanged = (text) => {
    return {                                 //an action is an object
        type: EMAIL_CHANGED,
        payload: text
    }
}

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}

export const loginUser = ({ email, password }) => {
    return(dispatch) => { //action creator is now returning function after redux thunk
        //as access to dispatch is given and we can call dispatch in .then() or .catch()
        //and we can return an action back

        //as we have access to dispatch in a single action creator
        //we can dispatch as many actions as we want from a single action creator

        dispatch({ type: LOGIN_USER})

    fetch(`http://api.integritysoftwares.com/api/Values?EmailID=${email}&MobileNo=${password}`,{
        method: 'POST',
        mode: 'no-cors',
        headers: {
            Accept: 'application/json',
            'cache-control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
            'postman-token': '367f7507-bcf1-3afe-7a0b-0bd518adf5fc'
        }
    })
    .then(response => {
        if( !response.ok) {
            throw response
        }
        return response.json();
    })
    .then( json => {
        //if( json == null) { throw json }
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: ( json )
        })
        Actions.main();
    })
    .catch( error => {
        dispatch({
            type: LOGIN_USER_FAIL
        })
    })
    }
}

export const loginAgent = ( agentId ) => {
    return(dispatch) => {
        fetch(`http://api.integritysoftwares.com/api/Values?AgentID=${agentId}`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                Accept: 'application/json',
                'cache-control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(response => {
            return response.json()
        })
        .then(json => {
            dispatch ({
                type: LOGIN_USER_WITH_AGENTID,
                payload: json
            })
        })

    }
}
