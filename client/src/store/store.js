import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/reducer';
import thunk from 'redux-thunk'

const logMiddleware = ({getState}) => (next) => (action) => {
    console.log(action.type, getState())
    return next(action)
}

const store = createStore(reducer, applyMiddleware(thunk, logMiddleware))

export default store