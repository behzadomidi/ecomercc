import { composeWithDevTools } from "@redux-devtools/extension";
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import user from "./reducers/user";
import cart from "./reducers/cart";
import address from "./reducers/address";

const rootReducers = combineReducers({user,cart,address});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','cart','address']
}
const middleWare = [thunk];
const initialState = {};
const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export const persistor = persistStore(store);
export default store;
