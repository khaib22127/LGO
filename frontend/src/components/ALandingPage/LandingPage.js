import splashImage from "../AHelper/splash-page-cover.jpeg";
import "./LandingPage.css";
import { useHistory } from "react-router-dom";


const LandingPage = () => {
  const myStyle = {
    backgroundImage: `url(${splashImage})`,
    height: "100vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const history = useHistory();

  const btn1click = (e) => {
    history.push("/category");
  };

  return (
    <div className="landing-page-container" style={myStyle}>
      <div className="welcome_banner">
        <h1 id="h1_welcome-text">WELCOME TO LGO!</h1>
      </div>
      <div className="inner_page-Btn">
        <div className="inner_page-Btn_fishing">
          <button id="enter_btn" onClick={() => btn1click()}>
            Fishing Spot!
          </button>
        </div>
        <div className="inner_page-Btn_hiking">
          <button id="enter_btn" onClick={() => window.alert("coming soon")}>
            Hiking Spot!
          </button>
        </div>
        <div className="inner_page-Btn_biking">
          <button id="enter_btn" onClick={() => window.alert("coming soon")}>
            Biking Spot!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
