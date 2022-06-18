import { assignTicketData } from "./homeSlice";

export const assignTicketDataAction = (value) => (dispatch) => {
  dispatch(assignTicketData(value));
};
