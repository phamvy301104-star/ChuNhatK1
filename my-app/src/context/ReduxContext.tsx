import React, { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";

// Create context for Redux hooks
const ReduxContext = createContext<{
  dispatch: AppDispatch;
  useAppDispatch: () => AppDispatch;
  useAppSelector: TypedUseSelectorHook<RootState>;
} | null>(null);

// Provider component
export const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const useAppDispatch = () => dispatch;
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  return (
    <ReduxContext.Provider value={{ dispatch, useAppDispatch: () => useAppDispatch(), useAppSelector }}>
      {children}
    </ReduxContext.Provider>
  );
};

// Custom hook để sử dụng Redux context
export const useReduxContext = () => {
  const context = useContext(ReduxContext);
  if (!context) {
    throw new Error("useReduxContext must be used within ReduxProvider");
  }
  return context;
};

// Export hooks từ redux
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
