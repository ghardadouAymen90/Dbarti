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
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancer(applyMiddleware(...middleware))
);
export default store;
