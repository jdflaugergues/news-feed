import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import {createLogger } from 'redux-logger';

import reducers from './reducers';

const loggerMiddleware = createLogger();

export default function configureStore() {
  return createStore(
    reducers,
    applyMiddleware(
      thunkMiddleware,
      promiseMiddleware,
      loggerMiddleware
    )
  )
}
