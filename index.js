//REDUX WITH MULTIPLE REDUCER AND MIDDLEWARE
const redux = require('redux');
const reduxLogger = require('redux-logger');  //REDUX LOGGER

const createStore = redux.createStore
const combineReducers = redux.combineReducers;

const logger = reduxLogger.createLogger();  //Middleware
const applyMiddleware = redux.applyMiddleware 

const BUY_CAKE = 'BUY_CAKE'   /*TYPE OF ACTION */
const BUY_ICECREAM = 'BUY_ICECREAM'

// { 
//     type : BUY_CAKE,      /*ACTION is a objet that has type property*/
//     info : 'first redux action'
// }

 /*ACTION Creator is a function returns action */

function buyCake(){                     
    return{
        type : BUY_CAKE,     
        info : 'first redux action'
    }
}


function buyIceCream(){                     
    return{
        type : BUY_ICECREAM,     
        info : 'first redux action'
    }
}

//Reducer :Function that accepts state and action as an arguments and returns the next state of the application
// (previosState,action)=>newState

 /* Single Reducer */

// const initialState = {        //state 
//     numberOfCakes : 10,
//     numberOfIcecreams : 20
// }

//MULTIPLE REDUCER

const initialCakeState = {
    numberOfCakes : 10,
}

const initialIceCreamState = {
    numberOfIcecreams : 10,
}

 /* Multiple Reducer */

const cakeReducer = (state = initialCakeState,action) =>{ 
    
    switch(action.type){
        case BUY_CAKE : return {
            ...state,                
            numberOfCakes : state.numberOfCakes - 1
        }
        default : return state;
    }
}



const IceCreamReducer = (state = initialIceCreamState,action) =>{ 
    
    switch(action.type){
        case BUY_ICECREAM : return {
            ...state,                
            numberOfIcecreams : state.numberOfIcecreams - 1
        }
        default : return state;
    }
}


const rootReducer = combineReducers({
    cake : cakeReducer,
    iceCream : IceCreamReducer
}) 
//Reducer controls how state transition happens .It Holds application store
// const store = createStore(reducer)   //FOR SINGLE REDUCER
const store = createStore(rootReducer ,applyMiddleware(logger))   //FOR MULTIPLE REDUCER

console.log('Initial State',store.getState());
 /* Before Middleware logger */

// const unsubscribe = store.subscribe(()=> console.log('Updated State' ,store.getState()))

 /* After Middleware logger */

const unsubscribe = store.subscribe(()=> {})

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()