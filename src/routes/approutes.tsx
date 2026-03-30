import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import ProtectedRoute from "./protectedroutes";
import Loader from "../components/commen/loader";

// Lazy loaded pages
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/login"));
const Signup = lazy(() => import("../pages/signup"));
const PostDetails = lazy(() => import("../pages/postdetails"));
const MyPosts = lazy(() => import("../pages/mypost"));
const PostForm = lazy(() => import("../pages/postform"));
const NotFound = lazy(() => import("../pages/notfound"));
const About = lazy(() => import("../pages/about")); // 

const AppRoutes = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        }
      />

      <Route
        path="/login"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path="/signup"
        element={
          <Suspense fallback={<Loader />}>
            <Signup />
          </Suspense>
        }
      />

      <Route
        path="/posts/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PostDetails />
          </Suspense>
        }
      />

      <Route
        path="/post-form"
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <PostForm />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path="/post-form/:id"
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <PostForm />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-post"
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MyPosts />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        }
      />
      <Route
  path="/about"
  element={
    <Suspense fallback={<Loader />}>
      <About />
    </Suspense>
  }
/>

    </Routes>
  );
};

export default AppRoutes;