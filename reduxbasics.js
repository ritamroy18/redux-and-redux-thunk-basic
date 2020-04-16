// Redux Basic with single REDUCER
const redux = require('redux');
const createStore = redux.createStore

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

const initialState = {        //state 
    numberOfCakes : 10,
    numberOfIcecreams : 20
}

//If action case is BUY_CAKE return object
//spread operator use for copy of the state and only update numberOfCakes
 /* Single Reducer */
 
const reducer = (state = initialState,action) =>{ 
    
    switch(action.type){
        case BUY_CAKE : return {
            ...state,                
            numberOfCakes : state.numberOfCakes - 1
        }
        case BUY_ICECREAM : return {
            ...state,                
            numberOfIcecreams : state.numberOfIcecreams - 1
        }
        default : return state;
    }

}

//Reducer controls how state transition happens .It Holds application store
const store = createStore(reducer)   
console.log('Initial State',store.getState());
const unsubscribe = store.subscribe(()=> console.log('Updated State' ,store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()