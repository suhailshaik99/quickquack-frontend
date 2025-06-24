// Library Imports
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Local Imports
import AppLayout from "./UI/AppLayout";
import FeedPage from "./pages/FeedPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/AppOverviewPage";
import SignupPage from "./pages/SignupPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import DuckLoader from "./spinners/DuckLoader";
import PageNotFound from "./pages/PageNotFound";
import MessagesPage from "./pages/MessagesPage";
import Settings from "./features/Feed/Settings";
import ForgotPassword from "./pages/ForgotPasswordPage";
import UsersProfilePage from "./pages/UsersProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
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
          {isAuthenticating && <DuckLoader />}
          <Routes>
            <Route element={isAuthenticated ? <AppLayout /> : <Home />}>
              <Route path="/" element={<FeedPage />} />
              <Route path="settings" element={<Settings />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="profile/:username" element={<UsersProfilePage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </QueryClientProvider>
  );
}

export default App;
