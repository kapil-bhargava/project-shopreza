import { combineReducers, legacy_createStore } from 'redux';

const cartitem = (state = 0, action) => {
    if (action.type === "INC") {
        return action.cdata;
    }
    else if (action.type === "DEC") {
        return state - 1;
    }
    else {

        return state;
    }
}
const cartVal = (state = 10, action) => {
    return state
}

const rootred = combineReducers({
    cartitem,cartVal
});

// Create Redux
const store = legacy_createStore(rootred);
export default store;