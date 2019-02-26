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
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)//, Commented redux dev tools to make app woking on mobile browser
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
  )
);
export default store;
