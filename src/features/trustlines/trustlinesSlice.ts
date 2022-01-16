import { createSlice } from "@reduxjs/toolkit";
import { TrustlineRequestsNormalized } from "./types";

type TrustlinesState = {
  data: TrustlineRequestsNormalized;
  fetching: boolean;
  error: boolean;
};

const initialState: TrustlinesState = {
  data: {},
  fetching: false,
  error: false,
};

export const trustlinesSlice = createSlice({
  name: "trustlines",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
