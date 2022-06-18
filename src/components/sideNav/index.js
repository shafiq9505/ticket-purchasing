import React from "react";
import { push as Menu } from "react-burger-menu";
import { Accordion } from "react-bootstrap";
import downArrow from "../../assets/images/down-arrow.svg";
import Home from "../../assets/images/home.svg";
import "./index.scss";

export default function SideNavToggle({ setCurrentPage }) {
  const styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "20px",
      height: "20px",
      left: "10px",
      top: "30px",
      marginLeft: "40px",
    },
    bmBurgerBars: {
      background: "black",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      background: "#800000",
      padding: "2.5em 1.5em 0",
      fontSize: "1.15em",
      cursor: "pointer",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#020202",
      padding: "0.8em",
    },
    bmItem: {
      display: "block",
      padding: "10px",
      borderBottom: "1px solid #E9E9EA",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };

  const sideNavMenu = [
    {
      menu: {
        description: "Home",
        image: Home,
        url: "home",
      },
      sideMenu: [],
    },
  ];

  const handlePageShown = (url) => {
    setCurrentPage(url);
  };

  return (
    <div className="side-nav-header">
      <Menu customCrossIcon={false} styles={styles}>
        {sideNavMenu.map((item) => {
          return (
            <div
              key={item.menu.description}
              className="menu-item side-nav-container"
              onClick={() => {
                handlePageShown(item.menu.url);
              }}
            >
              <span className="side-nav-image">
                <img src={item.menu.image} alt="home" />
              </span>
              <span className="side-nav-text">{item.menu.description}</span>

              {item.sideMenu.length !== 0 && (
                <Accordion>
                  <Accordion.Toggle className="side-nav-arrow" eventKey="0">
                    <img src={downArrow}></img>
                  </Accordion.Toggle>
                </Accordion>
              )}
            </div>
          );
        })}
      </Menu>
    </div>
  );
}
