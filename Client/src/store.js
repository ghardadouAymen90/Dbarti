import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage';
import rootReducer from "./reducers";
import { persistReducer } from 'redux-persist'
const initialState = {};
const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['recipe']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  initialState,
  persistedReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
  )
);
export default store;
