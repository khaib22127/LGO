import LandingPage1 from "./LandingPage1";
import LandingPage2 from "./LandingPage2";
import LandingPage3 from "./LandingPage3";

import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page-container" >
      <div>
        <LandingPage1 />
      </div>
      <div>
        <LandingPage2 />
      </div>
      <div>

      <LandingPage3 />
      </div>
    </div>
  );
};

export default LandingPage;
