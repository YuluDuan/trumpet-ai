"use client"

import { Provider } from 'react-redux';
import { store, RootState, AppDispatch } from './index';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
