// Library Imports
import { Toaster } from "react-hot-toast";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Local Imports
import AppLayout from "./UI/AppLayout";
// import FeedPage from "./pages/FeedPage";
const FeedPage = lazy(() => import("./pages/FeedPage"));
// import LoginPage from "./pages/LoginPage";
const LoginPage = lazy(() => import("./pages/LoginPage"));
// import Home from "./pages/AppOverviewPage";
const Home = lazy(() => import("./pages/AppOverviewPage"));
// import SignupPage from "./pages/SignupPage";
const SignupPage = lazy(() => import("./pages/SignupPage"));
// import SearchPage from "./pages/SearchPage";
const SearchPage = lazy(() => import("./pages/SearchPage"));
// import ProfilePage from "./pages/ProfilePage";
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
import DuckLoader from "./spinners/DuckLoader";
// import PageNotFound from "./pages/PageNotFound";
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
// import MessagesPage from "./pages/MessagesPage";
const MessagesPage = lazy(() => import("./pages/MessagesPage"));
import Settings from "./features/Feed/Settings";
// import ForgotPassword from "./pages/ForgotPasswordPage";
const ForgotPassword = lazy(() => import("./pages/ForgotPasswordPage"));
// import UsersProfilePage from "./pages/UsersProfilePage";
const UsersProfilePage = lazy(() => import("./pages/UsersProfilePage"));
// import NotificationsPage from "./pages/NotificationsPage";
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
import { SocketProvider } from "./contexts/socketContext";
import { verifyUserAuthentication } from "./services/FormSubmitAPI";

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
                <Route path="settings" element={<Settings />} />
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
