import React, { useState } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import MovieJson from "../../assets/json/movie-list.json";
import "./index.scss";
import _ from "lodash";

const MovieList = _.cloneDeep(MovieJson);

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");

  const handleSelectedMovie = (movie, index) => {
    setSelectedMovie(movie);
    setSelectedMovieIndex(index);
    setOpenModal(true);
  };

  const handleTotalPerson = (type) => {
    let totalPerson = _.cloneDeep(selectedMovie.totalPerson);
    let totalTicketPrice = _.cloneDeep(selectedMovie.totalTicketPrice);
    if (type === 0 && totalPerson !== 1) {
      totalPerson = totalPerson - 1;
      totalTicketPrice = totalTicketPrice - selectedMovie.ticketPrice;
    }
    if (type === 1) {
      totalPerson = totalPerson + 1;
      totalTicketPrice = totalTicketPrice + selectedMovie.ticketPrice;
    }

    setSelectedMovie((x) => {
      let newObj = { ...x };
      newObj.totalPerson = totalPerson;
      newObj.totalTicketPrice = totalTicketPrice;
      return newObj;
    });
  };

  return (
    <div className="home-main-container">
      <Row className="home-container">
        <Col sm={12} md={12}>
          <div className="home-header">Grab Your Ticket Now</div>
          <div className="home-description">
            Movie just make your day better
          </div>
        </Col>
      </Row>

      <div className="movie-container">
        {MovieList.map((movie, index) => {
          return (
            <div
              onClick={() => {
                handleSelectedMovie(movie, index);
              }}
              className={
                selectedMovieIndex === index
                  ? "movie-list-container selected"
                  : "movie-list-container"
              }
            >
              <div className="movie-list-image-container">
                <img
                  src={require(`../../assets/images/${movie.images}.jpg`)}
                  className="movie-list-image"
                ></img>
              </div>

              <div className="movie-list-title-main">{movie.title}</div>
            </div>
          );
        })}
      </div>

      <Modal
        show={openModal}
        onHide={() => {
          setOpenModal(false);
        }}
        centered
        size="lg"
        dialogClassName="modal-90w"
      >
        <Modal.Body>
          <Row style={{ width: "100%" }}>
            <Col sm={4} md={4} className="pr-0">
              <div className="modal-container-image">
                {selectedMovie.images && (
                  <img
                    src={require(`../../assets/images/${selectedMovie.images}.jpg`)}
                    className="movie-list-image"
                  ></img>
                )}
              </div>
            </Col>
            <Col className="pl=0">
              <div className="movie-list-title"> {selectedMovie.title}</div>
              <div className="movie-list-number-person">
                <div className="pt-2">Number Of Person</div>
                <div className="movie-list-number-person-button">
                  <Button
                    onClick={() => {
                      handleTotalPerson(0);
                    }}
                    className="person-button"
                    variant="outline-secondary"
                  >
                    {" "}
                    -{" "}
                  </Button>
                  <div className="display-number-person">
                    {selectedMovie.totalPerson}
                  </div>
                  <Button
                    onClick={() => {
                      handleTotalPerson(1);
                    }}
                    className="person-button"
                    variant="outline-secondary"
                  >
                    {" "}
                    +{" "}
                  </Button>
                </div>
              </div>
              <div className="movie-list-total-price mt-2">{`RM ${selectedMovie.totalTicketPrice}`}</div>
              <div>
                <Button variant="success" className="movie-button-checkout">
                  Check Out
                </Button>
                <Button
                  onClick={() => {
                    setOpenModal(false);
                  }}
                  variant="danger"
                  className="movie-button-checkout mr-2"
                >
                  Back
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}
