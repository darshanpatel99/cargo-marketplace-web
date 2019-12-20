import { combineReducers } from "redux";
import auth from "./auth";
import checkoutuser from './checkoutuser';


export default combineReducers({ auth, number: checkoutuser });
