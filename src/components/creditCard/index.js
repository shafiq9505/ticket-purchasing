import React from "react";
import Cards from "react-credit-cards";
import _ from "lodash";
import "./index.scss";
import { Form, Field } from "react-final-form";
import Styles from "./Styles";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../utils/cardUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  addCreditCardListAction,
  editCreditCardListAction,
} from "./creditCardAction";
import { v4 as uuidv4 } from "uuid";
export default function CreditCard({ isEdit, setOpenModal }) {
  const dispatch = useDispatch();
  const { selectedCreditCard } = useSelector((state) => state.creditCard);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values) => {
    await sleep(300);
    const tempObj = _.cloneDeep(values);
    tempObj.id = uuidv4();
    if (isEdit) {
      dispatch(editCreditCardListAction(values));
      setOpenModal(false);
      return;
    }
    dispatch(addCreditCardListAction(tempObj));
    setOpenModal(false);
  };

  return (
    <Styles>
      <div className="ml-2">
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};
            if (!values.number) {
              errors.number = "Required";
            }
            if (!values.name) {
              errors.name = "Required";
            }
            if (!values.expiry) {
              errors.expiry = "Required";
            } else if (!values.cvc) {
              errors.cvc = "Required";
            }
            return errors;
          }}
          initialValues={selectedCreditCard}
          render={({
            handleSubmit,
            form,
            submitting,
            pristine,
            values,
            active,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Cards
                  number={values.number || ""}
                  name={values.name || ""}
                  expiry={values.expiry || ""}
                  cvc={values.cvc || ""}
                  focused={active}
                />
                <div>
                  <Field
                    name="number"
                    component="input"
                    type="text"
                    pattern="[\d| ]{16,22}"
                    placeholder="Card Number"
                    format={formatCreditCardNumber}
                  />
                </div>
                <div>
                  <Field
                    name="name"
                    component="input"
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <Field
                    name="expiry"
                    component="input"
                    type="text"
                    pattern="\d\d/\d\d"
                    placeholder="Valid Thru"
                    format={formatExpirationDate}
                  />
                  <Field
                    name="cvc"
                    component="input"
                    type="text"
                    pattern="\d{3,4}"
                    placeholder="CVC"
                    format={formatCVC}
                  />
                </div>
                <div className="buttons">
                  <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </button>
                  <button className="mt-2" type="submit" disabled={submitting}>
                    {isEdit ? "Save" : "Submit"}
                  </button>
                </div>
              </form>
            );
          }}
        />
      </div>
    </Styles>
  );
}
