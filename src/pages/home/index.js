import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import MovieJson from "../../assets/json/movie-list.json";
import "./index.scss";
import _ from "lodash";

const MovieList = _.cloneDeep(MovieJson);

export default function Home() {
  const [selectedMovieIndex, setSelectedMovieIndex] = React.useState({});

  const handleSelectedMovie = (movie,index) => {
    setSelectedMovieIndex(index)
  };

  return (
    <div className="home-main-container">
      <Row className="home-container">
        <Col sm={12} md={12}>
          <div className="home-header">Pick Currently Showing Movie</div>
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
                handleSelectedMovie(movie,index);
              }}
              className={selectedMovieIndex === index ? "movie-list-container selected" : "movie-list-container"}
            >
              <div className="movie-list-image-container">
                <img
                  src={require(`../../assets/images/${movie.images}.jpg`)}
                  className="movie-list-image"
                ></img>
              </div>

              <div className="movie-list-title">{movie.title}</div>
            </div>
          );
        })}
      </div>

      
    </div>
  );
}
