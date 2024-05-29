import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../Store/Reducers/authReducer'


export const store= configureStore({
reducer:{
    clinica: authReducer
}

})
export default store;