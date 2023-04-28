import { useHistory } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = () => {
  const history = useHistory();

  return (
    <div className="Error_page">
      <h1>ERROR PAGE</h1>
      <h2>Are you lost?</h2>
      <div>
        <button id="error-page-button" onClick={() => history.push("/")}>
          GO BACK
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
