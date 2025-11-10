/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router";
import Layout from "../layout/dashboard/Layout";
import { useSelector } from "react-redux";
import { login, selectCurrentUser } from "../pages/auth/authSlice";
import { useAppDispatch } from "../app/hooks";
import Dashboard from "@/pages/dashboard/Dashboard";
// Landing page routes

// Dashboard routes

type ProtectedRoute = {
  user: any;
  children?: any;
};

const ProtectedRoute = ({ user, children }: ProtectedRoute) => {
  //wrapper component for protected routes
  const isAuth = !!user;

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const NoNav = () => (
  <>
    <Outlet />
  </>
);

const Router = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false); // <-- hydration state

  useEffect(() => {
    //log the user back in with local storage data
    const userString = localStorage.getItem("user");
    const access_tokenString = localStorage.getItem("access_token");
    const refresh_tokenString = localStorage.getItem("refresh_token");

    if (userString && access_tokenString && refresh_tokenString && !user) {
      const data = JSON.parse(userString) as any;
      const access_token = JSON.parse(access_tokenString) as string;
      const refresh_token = JSON.parse(refresh_tokenString) as string;

      dispatch(login({ data, access_token, refresh_token }));
    }
    setIsAuthLoaded(true); // <-- set loaded after checking localStorage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    //route the user to dashboard, if a logged in user tries to access signin page
    if (
      !!user &&
      (location.pathname === "/" || location.pathname === "/login")
    ) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  if (!isAuthLoaded) {
    // Optionally, show a spinner or nothing while loading
    return null;
  }

  return (
    <Routes>
      <Route element={<NoNav />}>
        {/* public routes that dont have the sidebar nav */}
        {/* <Route path="/" element={<Landing />} /> */}
        {/* <Route path="/login" element={<Auth />} /> */}
        <Route path="*" element={<h1>Url does not match</h1>} />
        {/*
         Landing page routing below 
         Landing page path should be '/' while login and signup should be '/login' and '/register' respectfully 
        */}
      </Route>

      <Route
        //protected pages
        element={
          <ProtectedRoute user={user}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<h1>404, page not found</h1>} />
    </Routes>
  );
};

export default Router;
