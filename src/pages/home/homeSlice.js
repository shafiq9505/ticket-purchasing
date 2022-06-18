import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
const initialState = {
  ticketData: {
    title: "",
    totalPerson: "",
    totalTicketPrice: "",
  },
};

const home = createSlice({
  name: "homeData",
  initialState,
  reducers: {
    assignTicketData: (state, data) => {
      state.ticketData = _.cloneDeep(data.payload);
    },
  },
});

const { reducer, actions } = home;

export const { assignTicketData } = actions;

export default reducer;
