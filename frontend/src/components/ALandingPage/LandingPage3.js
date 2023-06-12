import splashImage from "../AHelper/hiking-pic3.jpeg";
import "./LandingPage3.css";

const LandingPage3 = () => {
  const myStyle = {
    backgroundImage: `url(${splashImage})`,
    height: "100vh",
    width: "60%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <div className="landing-page-container-3">
      <div className="page3-inner-container-left" style={myStyle}>
        <div className="page3-quotes-container-left">
          <p id="page3-quotes-1">
            “Live in the sunshine, swim in the sea, drink the wild air.” – Ralph
            Waldo Emerson
          </p>
          <p id="page3-quotes-1">
            “In all things of nature there is something of the marvellous.” –
            Aristotle
          </p>
        </div>
      </div>
      <div className="page3-inner-container-right">
        <div className="page3-linkin-info_right">
          <p id="created-by-text-page3">Created By:</p>
          <p id="my-name-text">Khai Bui</p>
          <div className="page3-github-link-container-right">
            <a href="https://github.com/khaib22127">
              <i className="fa-brands fa-github fa-3x"></i>
            </a>
            <a href="https://www.linkedin.com/in/khai-bui-60614b26b/">
              <i className="fa-brands fa-linkedin fa-3x"></i>
            </a>
          </div>
        </div>

        <div className="page3-created-with-info_right">
          <p id="created-by-text-page3">Created With</p>
          <div className="page3-icon-container">
            <i className="fa-brands fa-square-js fa-4x"></i>
            <i className="fa-brands fa-react fa-4x"></i>
            <i className="fa-brands fa-node fa-4x"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage3;
