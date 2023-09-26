import { combineReducers } from "redux";
import { appReducer } from "./productFilterSlice";
import cartReducer from "./cartSlice";
import { productsReducer } from "./productSlice";
import { usersReducer } from "./usersSlice";


const rootReducers = combineReducers({
    app : appReducer,
    cart : cartReducer,
    products : productsReducer,
    users : usersReducer,
})

export default rootReducers;