import splashImage from "../AHelper/splash-page-cover.jpeg";
import { useHistory } from "react-router-dom";
import LoginFormModal from "../LoginFormModal/LoginForm";
import { useModal } from "../../context/Modal";
import "./LandingPage2.css"

const LandingPage1 = () => {
   const { setModalContent } = useModal();
  const history = useHistory();
  const myStyle = {
    backgroundImage: `url(${splashImage})`,
    height: "100vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const btn1click = (e) => {
    history.push("/category");
  };

const logIn = (e) => {
  e.preventDefault();
  setModalContent(<LoginFormModal/>)

}

  return (
    <div className="landing-page-container-1" style={myStyle}>
      <div className="welcome_banner">
        <h1 id="h1_welcome-text">WELCOME TO LGO!</h1>
      </div>
      <div className="title_text_1">
        <p id="id_title_text_">"Enjoy the Outdoor!"</p>
        <p id="id_title_text_">"Let's Go Outside!"</p>
      </div>

      <div className="splash-page-log_in-btn">
        <button id="log_in-splash-page-btn" onClick={logIn}>
          LOGIN
        </button>
      </div>
      <div className="inner_page-Btn_fishing">
        <button id="enter_btn" onClick={() => btn1click()}>
          Fishing Spot!
        </button>
      </div>
    </div>
  );
};

export default LandingPage1;
