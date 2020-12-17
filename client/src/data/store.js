import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ENVS } from 'config/constants';
import rootSaga from 'data/sagas';
import createRootReducer from 'data/reducers';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = process.env.NODE_ENV === ENVS.PRODUCTION ? null : composeWithDevTools({});

const persistConfig = {
  key: 'root',
  blacklist: ['home'],
  storage,
};
const persistedReducer = persistReducer(persistConfig, createRootReducer());

export const store = process.env.NODE_ENV === ENVS.PRODUCTION
  ? createStore(persistedReducer, applyMiddleware(sagaMiddleware))
  : createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
