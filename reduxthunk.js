//Async operation with REDUX-THUNK
const redux = require('redux');
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware 
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const initialState = {
    loading : false,
    users: [],
    error : ''
}
//Type of action
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

//Action Create

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        paylaod: users
    }
}
const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload :error
    }
}

//Reducer Create

const reducer = (state = initialState,action) =>{

    switch (action.type){
        case FETCH_USERS_REQUEST : return{
            ...state,
            loading : true
        }
        case FETCH_USERS_SUCCESS: return{
            loading : false,
            users : action.paylaod,
            error : ''
        }

        case FETCH_USERS_FAILURE: return{
            loading : false,
            users : [],
            error : action.paylaod
        }
        default : return state;

    }
}

//Thunk can return function in action creators

const fetchUsers = () => {
    return function(dispatch){

        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response =>{
            //response.data  is array of users

            const users = response.data.map(user=> user.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error =>{
            //error message
            dispatch(fetchUsersFailure(error.message))
        })
    }
}

const store = createStore(reducer,applyMiddleware(thunkMiddleware))   
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers())

