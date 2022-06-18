import React, { useState } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import "./index.scss";
import CreditCard from "../../components/creditCard";
import VisaImage from "../../assets/images/visa.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCreditCardListAction,
  getSelectedCreditCardAction,
  clearSelectedCreditCardAction,
} from "../../components/creditCard/creditCardAction";

export default function Ticket({ setCurrentPage }) {
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openCompleteModal, setOpenCompleteModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const { creditCardList, selectedCreditCard } = useSelector(
    (state) => state.creditCard
  );
  const { ticketData } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const addNewCard = () => {
    setIsEdit(false);
    setOpenModal(true);
  };

  const editCardDetail = (data) => {
    dispatch(getSelectedCreditCardAction(data));
    setIsEdit(true);
    setOpenModal(true);
  };

  const deleteCardDetail = (data) => {
    dispatch(getSelectedCreditCardAction(data));
    setConfirmDeleteModal(true);
  };

  const handlePermanentDelete = () => {
    dispatch(deleteCreditCardListAction(selectedCreditCard));
    dispatch(clearSelectedCreditCardAction());
    setConfirmDeleteModal(false);
  };

  const handleCheckout = () => {
    setOpenCompleteModal(true);
  };

  return (
    <div className="ticket-main-container">
      <Row>
        <Col className="receipt-container mr-3" sm={4} md={4}>
          <div className="receipt-header">Receipt</div>
          <div className="receipt-content-container mt-3">
            <div>{`Movie Name : ${ticketData.title}`}</div>
            <div>{`Number Of Person :${ticketData.totalPerson}`}</div>
            <div>{`Total Price:${ticketData.totalTicketPrice}`}</div>

            <div className="mt-4">
              Note : Please ensure the payment method is set up to proceed with
              ticket payment
            </div>
          </div>
          {creditCardList.length !== 0 && (
            <div className="receipt-button mt-2">
              <Button
                onClick={() => {
                  handleCheckout();
                }}
                variant="success"
                size="lg"
                block
              >
                Proceed Checkout
              </Button>
            </div>
          )}
        </Col>
        <Col className="payment-container" sm={7} md={7}>
          <div className="payment-header">Payment</div>
          <div className="payment-header mt-3">Use Credit/ Debit Card</div>

          {creditCardList.length === 0 ? (
            <div className="payment-header mt-2">
              Card Havent Configure Yet?
            </div>
          ) : (
            creditCardList.map((data, index) => {
              return (
                <div key={index} className="payment-debit-container mt-3 mb-3">
                  <div className="visa-image-container">
                    <img
                      className="visa-image"
                      src={VisaImage}
                      alt="visa image"
                    />
                  </div>
                  <div className="card-detail-container ml-3">
                    <div className="">
                      {`Visa - ${data.number
                        .toString()
                        .replace(" ", "")
                        .slice(-4)}`}
                    </div>
                    <div>{`${data.name} | ${data.expiry}`}</div>
                    <div className="card-detail-button mt-2">
                      <Button
                        onClick={() => {
                          editCardDetail(data);
                        }}
                        className="mr-2"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          deleteCardDetail(data);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          <div className="mt-4">
            <Button
              onClick={() => {
                addNewCard();
              }}
              variant="success"
              size="lg"
              block
            >
              Add New Card
            </Button>
          </div>
        </Col>
      </Row>

      {/* Completed Modal */}

      <Modal show={openCompleteModal} centered>
        <Modal.Header>
          <Modal.Title>Booking Completed!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          We will email you all the details of your booking details
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              setCurrentPage("home");
              setOpenCompleteModal(false);
            }}
          >
            Okay
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Set Credit Card Modal */}
      <Modal
        show={openModal}
        onHide={() => {
          dispatch(clearSelectedCreditCardAction());
          setOpenModal(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Set Credit/Debit Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreditCard isEdit={isEdit} setOpenModal={setOpenModal} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        show={confirmDeleteModal}
        onHide={() => {
          dispatch(clearSelectedCreditCardAction());
          setConfirmDeleteModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Credit Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Are you sure you want to delete credit card ending with ${selectedCreditCard.number
            .replace(" ", "")
            .slice(-4)}`}{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              dispatch(clearSelectedCreditCardAction());
              setConfirmDeleteModal(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handlePermanentDelete();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
