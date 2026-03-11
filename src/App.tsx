import "./assets/global.css";
import Navbar from "./components/navbar";
import AppRoutes from "./routes/approutes";

function App() {
  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;