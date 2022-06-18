import React, { useState } from "react";
import Home from "./pages/home";
import Ticket from "./pages/ticket";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNavMovie from "./components/sideNav";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  return (
    <div className="app">
      <SideNavMovie />
      <div className="header">
        <div className="header-text">Asia Movie Member Club</div>
      </div>
      {currentPage === "home" ? (
        <Home setCurrentPage={setCurrentPage} />
      ) : (
        <Ticket setCurrentPage={setCurrentPage} />
      )}

      <div className="footer"></div>
    </div>
  );
}

export default App;
