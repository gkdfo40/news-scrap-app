import storage from 'redux-persist/lib/storage'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

import modalReducer from './modalSlice'
import scrapsReducer from './scrapSlice'
import filterReducer from './filterSlice'
import articleReducer from './articleSlice'
import glocationReducer from './glocationSlice'

const persistConfig = {
  key: 'scrapStorage',
  version: 1,
  storage,
  whitelist: ['scrap'],
}

const rootReducer = combineReducers({
  scrap: scrapsReducer,
  modal: modalReducer,
  filter: filterReducer,
  article: articleReducer,
  glocation: glocationReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
