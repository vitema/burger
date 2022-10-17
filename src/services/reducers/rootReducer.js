import { combineReducers } from 'redux';


const allIngredients = (state=[], action) => { return state}

const constructorIngredients = (state =[], action) => { return state}

const ingredient = (state = null, action) => { return state }

const order = (state = null, action) => { return state }

export const rootReducer = combineReducers({
    allIngredients,
    constructorIngredients,
    ingredient,
    order
}) 