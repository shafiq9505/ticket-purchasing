import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
const initialState = {
  creditCardList: [],
  selectedCreditCard: {
    id: "",
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  },
};

const caterCreditCardList = createSlice({
  name: "caterCreditCardList",
  initialState,
  reducers: {
    addCreditCardList: (state, data) => {
      state.creditCardList.push(data.payload);
    },
    editCreditCardList: (state, data) => {
      _.forEach(state.creditCardList, (x, index) => {
        if (x.id === data.payload.id) {
          state.creditCardList[index] = data.payload;
        }
      });
      console.warn(state.creditCardList);
    },
    deleteCreditCardList: (state, data) => {
      state.creditCardList.splice(data.payload);
    },
    getSelectedCreditCard: (state, data) => {
      state.selectedCreditCard = data.payload;
    },
    clearSelectedCreditCard: (state) => {
      state.selectedCreditCard = initialState.selectedCreditCard;
    },
  },
});

const { reducer, actions } = caterCreditCardList;

export const {
  addCreditCardList,
  editCreditCardList,
  deleteCreditCardList,
  getSelectedCreditCard,
  clearSelectedCreditCard,
} = actions;

export default reducer;
