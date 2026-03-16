import "./App.css";

import Navbar from "./components/navbar";
import AppRoutes from "./routes/approutes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}

export default App;
