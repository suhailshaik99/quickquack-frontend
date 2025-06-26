// Library Imports
import { Toaster } from "react-hot-toast";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Local Imports
import AppLayout from "./UI/AppLayout";
import Home from "./pages/AppOverviewPage";
import DuckLoader from "./spinners/DuckLoader";
const FeedPage = lazy(() => import("./pages/FeedPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
import { SocketProvider } from "./contexts/socketContext";
const SignupPage = lazy(() => import("./pages/SignupPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const MessagesPage = lazy(() => import("./pages/MessagesPage"));
import { verifyUserAuthentication } from "./services/FormSubmitAPI";
const ForgotPassword = lazy(() => import("./pages/ForgotPasswordPage"));
const UsersProfilePage = lazy(() => import("./pages/UsersProfilePage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, isAuthenticating } = useSelector(
    (state) => state.user,
  );

  useEffect(
    function () {
      dispatch(verifyUserAuthentication());
    },
    [dispatch],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 2000,
            },
            error: {
              duration: 4000,
            },
            style: {
              fontSize: "16px",
              // maxWidth: "500px",
              padding: "10px 18px",
              backgroundColor: "gray",
              color: "white",
            },
          }}
        />
        <BrowserRouter>
          <Suspense fallback={<DuckLoader />}>
            {isAuthenticating && <DuckLoader />}
            <Routes>
              <Route element={isAuthenticated ? <AppLayout /> : <Home />}>
                <Route path="/" element={<FeedPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route
                  path="profile/:username"
                  element={<UsersProfilePage />}
                />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </SocketProvider>
    </QueryClientProvider>
  );
}

export default App;
