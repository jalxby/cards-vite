import { getErrorMessage } from "@/common/utils/getErrorMessage.ts";
import { notifications } from "@mantine/notifications";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as string | null,
    isLoading: false,
    isAppInitialized: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.endsWith("/pending");
        },
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith("/rejected");
        },
        (state, { payload: { error } }) => {
          state.isLoading = false;
          const errorMessage = getErrorMessage(error);
          notifications.show({
            message: errorMessage,
            color: "red",
            sx: { backgroundColor: "red" },
            loading: false,
          });
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith("/fulfilled");
        },
        (state, action) => {
          state.isLoading = false;
        }
      );
  },
});

export const appReducer = slice.reducer;
export const {} = slice.actions;
