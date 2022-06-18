import {
  addCreditCardList,
  editCreditCardList,
  deleteCreditCardList,
  getSelectedCreditCard,
  clearSelectedCreditCard,
} from "./creditCardSlice";

export const addCreditCardListAction = (value) => (dispatch) => {
  dispatch(addCreditCardList(value));
};

export const editCreditCardListAction = (value) => (dispatch) => {
  dispatch(editCreditCardList(value));
};

export const deleteCreditCardListAction = (value) => (dispatch) => {
  dispatch(deleteCreditCardList(value));
};

export const getSelectedCreditCardAction = (value) => (dispatch) => {
  dispatch(getSelectedCreditCard(value));
};

export const clearSelectedCreditCardAction = () => (dispatch) => {
  dispatch(clearSelectedCreditCard());
};
