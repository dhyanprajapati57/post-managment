import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";

import Home from "./pages/home";

import Login from "./pages/login";

import Signup from "./pages/signup";

import PostDetails from "./pages/postdetails";



function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

       <Route path="/posts/:id" element={<PostDetails />} />

      </Routes>
    </div>
  );
}

export default App;
