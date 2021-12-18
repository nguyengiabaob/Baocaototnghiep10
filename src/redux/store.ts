/* eslint-disable prettier/prettier */
import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import authslice from './reducer/authslice';


export const store = configureStore({
    reducer: {
        auth : authslice,

    },
});
export type AppDispatch= typeof store.dispatch;
export type Rootstate = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  Rootstate,
  unknown,
  Action<string>
>;
