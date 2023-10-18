import {
  combineReducers,
  createStore
} from "redux";
import customerReducer from "./features/customers/customerSlice";
import accountReducer from "./features/account/accountSlice";




// ============= Redux Store =============
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
})
const store = createStore(rootReducer);
export default store;
