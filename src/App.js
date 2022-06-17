import Home from "./pages/home";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNavMovie from "./components/sideNav";

function App() {
  return (
    <div className="app">
      <SideNavMovie />
      <div className="header">
        <div className="header-text">Asia Movie Member Club</div>
      </div>
      <Home />
      <div className="footer"></div>
    </div>
  );
}

export default App;
