import authSlice from "./features/authslice";
import stockSlice from "./features/stockSlice";
import strategySlice from "./features/strategySlice";
import tradeSlice from "./features/tradeSlice";
import strategyAdminSlice from "./features/strategyAdminSlice";
import customerSlice from "./features/customerSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authSlice,
    stock: stockSlice,
    strategy : strategySlice,
    trade : tradeSlice,
    strategyAll: strategyAdminSlice,
    customer : customerSlice
});

export default rootReducer;