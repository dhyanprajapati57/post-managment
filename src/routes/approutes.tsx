import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/signup";
import PostDetails from "../pages/postdetails";
import MyPosts from "../pages/mypost";
import PostForm from "../pages/postfrom";
import ProtectedRoute from "./protectedroutes";

const AppRoutes = () => {
  return (
   <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/posts/:id" element={<PostDetails />} />

  {/* Protected route for create & edit */}
  <Route
    path="/post-form"
    element={
      <ProtectedRoute>
        <PostForm />
      </ProtectedRoute>
    }
  />
  <Route
    path="/post-form/:id"
    element={
      <ProtectedRoute>
        <PostForm />
      </ProtectedRoute>
    }
  />

  {/* My Posts */}
  <Route
    path="/my-post"
    element={
      <ProtectedRoute>
        <MyPosts />
      </ProtectedRoute>
    }
  />
</Routes>
  );
};

export default AppRoutes;