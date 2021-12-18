/* eslint-disable prettier/prettier */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, Rootstate } from './store';
export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector;
export const useAppDispatch = ()=> useDispatch<AppDispatch>();
