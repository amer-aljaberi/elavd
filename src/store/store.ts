import { create, StoreApi } from "zustand";
import { SearchSlice, SearchState } from "./slices/searchSlice";
import { UserStore, UserState } from "./slices/userSlice";
import { LayoutSlice, LayoutState } from "./slices/layoutSlice";

export interface AppState extends SearchState, UserState, LayoutState {}

const useAppStore = create<AppState>((set, get, store: StoreApi<AppState>) => ({
  ...SearchSlice(set, get, store),
  ...UserStore(set, get, store),
  ...LayoutSlice(set, get, store as any),
}));

export default useAppStore;
