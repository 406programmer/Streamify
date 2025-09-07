import { Navigate, Route, Routes } from "react-router";
import "./index.css";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import OnBoardingPage from "./pages/OnBoardingPage";
import NotificationsPage from "./pages/NotificationsPage";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/UseAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

function App() {
  const { authUser, isLoading } = useAuthUser();
  const { theme } = useThemeStore();
  if (isLoading) return <PageLoader />;
  // console.log("authUser from App.jsx : ", authUser);

  const isAuthenticated = !!authUser; //convert value to boolean
  // console.log("isAuthenticated : ", isAuthenticated);

  const isOnBoarded = authUser?.isOnBoarded;
  // console.log("isonboarded : ",isOnBoarded);

  if (isLoading) <PageLoader />;

  return (
    <>
      <ReactQueryDevtools />
      <div className="h-screen" data-theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                isOnBoarded ? (
                  <Layout showSidebar={true}>
                    <HomePage />
                  </Layout>
                ) : (
                  <Navigate to="/onboarding" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginPage />
              ) : (
                <Navigate to={isOnBoarded ? "/" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <SignUpPage />
              ) : (
                <Navigate to={isOnBoarded ? "/" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/onboarding"
            element={
              isAuthenticated ? (
                !isOnBoarded ? (
                  <OnBoardingPage />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/notifications"
            element={
              isAuthenticated ? (
                isOnBoarded ? (
                  <Layout showSidebar={true}>
                    <NotificationsPage />
                  </Layout>
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/chat/:id"
            element={
              isAuthenticated ? (
                isOnBoarded ? (
                  <Layout showSidebar={false}>
                    <ChatPage />
                  </Layout>
                ) : (
                  <Navigate to="/onboarding" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/call/:id"
            element={isAuthenticated ? (isOnBoarded? <CallPage /> : <Navigate to="/boarding"/>) : <Navigate to="/login" />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
