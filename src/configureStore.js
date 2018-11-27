import { applyMiddleware, createStore, combineReducers } from "redux"
import { createLogger } from "redux-logger"
import thunk from 'redux-thunk'
import Tickets from './Reducers/Tickets'
import Match from './Reducers/Match'

const middleware = applyMiddleware(thunk, createLogger());

export default () => {
    const store = createStore(
        combineReducers({
            Tickets,
            Match
        }), middleware
    );

    return store;
}