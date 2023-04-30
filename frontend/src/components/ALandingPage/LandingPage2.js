import splashImage from "../AHelper/hiking-pic2.jpeg";
import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupFormModal/SignupForm";

const LandingPage2 = () => {
     const { setModalContent } = useModal();
  const myStyle = {
    backgroundImage: `url(${splashImage})`,
    height: "100vh",
    width: "60%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const signUpButton = (e) => {
      e.preventDefault();
      setModalContent(<SignupFormModal />);
  }


  return (
    <div className="landing-page-container-2">
      <div className="inner-landing-page2-left">
        <p id="page2-description-text1-left">
          " Outdoor activities is a great way to explore while experiencing
          nature and wildlife. "
        </p>
        <div className="page2-description-container-left">
          <p id="page2-description-text2-left">
            The purpose of this website is to help users locate a place and
            enjoy their favorite outdoor activities. Users can also share their
            favorite spot to help others discover and appreciate that spot.
          </p>
        </div>
        <div className="page2-sign-up-container-left">
          <p id="page2-sign-up-text">
            Sign up to get the best experience!
          </p>
          <button id="page-2_sign-up_btn" onClick={signUpButton} >Sign Up</button>
        </div>
      </div>

      <div className="inner-landing-page2-right" style={myStyle}>
        <p id="page2_quote-text-right" style={{ marginBottom: "80px" }}>
          “And into the forest I go, to lose my mind and find my soul.” — John
          Muir
        </p>
        <p id="page2_quote-text-right">
          “The journey matters more than the destination.” ― Tony Fahkry
        </p>
        <div className="inner_page-Btn-container">
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
    </div>
  );
};

export default LandingPage2;
