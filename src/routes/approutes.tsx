import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import ProtectedRoute from "./protectedroutes";
import Loader from "../components/loader";

// Lazy loaded pages
const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/login"));
const Signup = lazy(() => import("../pages/signup"));
const PostDetails = lazy(() => import("../pages/postdetails"));
const MyPosts = lazy(() => import("../pages/mypost"));
const PostForm = lazy(() => import("../pages/postfrom"));
const NotFound = lazy(() => import("../pages/notfound"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="*" element={<NotFound />} />

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
    </Suspense>
  );
};

export default AppRoutes;