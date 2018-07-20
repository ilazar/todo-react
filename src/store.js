import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { reducers as itemReducers } from './items';

const rootReducer = combineReducers({ ...itemReducers });

export default createStore(rootReducer, {}, applyMiddleware(thunk));
