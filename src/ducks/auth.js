import {Map, Record, OrderedMap} from 'immutable'
import axios from 'axios'
import {arrToImmObj} from '../helpers'

//constants
export const AUTH_GET_REQUEST = 'test-project/auth/AUTH_GET_REQUEST'
export const AUTH_GET_SUCCESS = 'test-project/auth/AUTH_GET_SUCCESS'
export const AUTH_GET_FAIL = 'test-project/auth/AUTH_GET_FAIL'
export const AUTH_POST_REQUEST = 'test-project/auth/AUTH_POST_REQUEST'
export const AUTH_POST_SUCCESS = 'test-project/auth/AUTH_POST_SUCCESS'
export const AUTH_POST_FAIL = 'test-project/auth/AUTH_POST_FAIL'

const AuthRecord = Record({
    entities: [],
    loaded: null,
    loading: null,
    auth: null
})

const initialState = new AuthRecord()


//reducer
export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case AUTH_GET_REQUEST:
            return state
                .set('loaded', false)
                .set('loading', true)

        case AUTH_GET_SUCCESS:
            return state
                .set('entities', payload.response)
                .set('loading', false)
                .set('loaded', true)

        case AUTH_POST_SUCCESS:
            return state
                .set('auth', payload)

        case AUTH_POST_FAIL:
            return state
                .set('auth', false)

        default:
            return state
    }
}

//actions
export const getAuth = () => async dispatch => {
    dispatch({
        type: AUTH_GET_REQUEST
    })
    try {
        await axios.get('https://api.testing.geesys.ru/v1/auth')
        const {data} = axios.get('https://api.testing.geesys.ru/v1/forms/post/user/authentication')
        dispatch({
            type: AUTH_GET_SUCCESS,
            payload: {
                response: data.authentication
            }
        })
        console.log('get auth success---', data)
    } catch (error) {
        dispatch({
            type: AUTH_GET_FAIL,
            payload: error
        })
        console.log('get auth error---', error)
    }
}

export const postAuth = ({login, password}) => async dispatch => {
    const authentication = {login, password}
    dispatch({
        type: AUTH_POST_REQUEST
    })
    try {
        const {data} = await axios({
            url: 'https://api.testing.geesys.ru/v1/user/authentication',
            method: 'post',
            data: {authentication}
        })
        console.log('post auth success---', data)
        dispatch({
            type: AUTH_POST_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log('post auth error---', error)
        dispatch({
            type: AUTH_POST_FAIL,
            payload: error
        })
    }
}