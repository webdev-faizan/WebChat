import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./routes/Routes";
import DirectionSnackbar from "./components/Snackbar";

function App() {
  return (
    <>
      <Routes />
      <ToastContainer />
      <DirectionSnackbar />
    </>
  );
}

export default App;
