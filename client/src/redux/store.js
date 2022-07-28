import {configureStore,combineReducers} from "@reduxjs/toolkit"
import {
    persistReducer,
    persistStore,
    FLUSH,
    REGISTER,
    REHYDRATE,
    PERSIST,
    PURGE,
    PAUSE
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice"
import videoReducer from "./videoSlice"

const persistConfig={
    key:'root',
    version:1,
    storage
}

const rootReducer=combineReducers({
    user:userReducer,
    video:videoReducer
})

const persistedReducer=persistReducer(persistConfig,rootReducer);

export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>{
       return  getDefaultMiddleware({
            serializableCheck:{
                ignoreActions:[FLUSH,REHYDRATE,PAUSE,REGISTER,PURGE,PERSIST]
            }
        })
    }
})


export const persistor=persistStore(store)

