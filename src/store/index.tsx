import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

interface AmountState {
  selectTipAmount: number;
}

const initialState: AmountState = {
  selectTipAmount: 0,
};

//slice of global state
const amountSlice = createSlice({
  name: "amount",
  initialState,
  reducers: {
    handleTipSelector(state: any, action: PayloadAction<number>) {
      state.selectTipAmount = action.payload;
    },
    resetTipAmount(state: any) {
      state.selectTipAmount = 1;
    },
  },
});

const store = configureStore({
  reducer: { amount: amountSlice.reducer },
});

export const amountActions = amountSlice.actions;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
