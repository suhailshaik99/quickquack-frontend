// Library Imports
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Local Imports
import AppLayout from "./UI/AppLayout";
import FeedPage from "./pages/FeedPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/AppOverviewPage";
import SignupPage from "./pages/SignupPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./features/Feed/Settings";
import MessagesPage from "./pages/MessagesPage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import NotificationsPage from "./pages/NotificationsPage";

function App() {
  const isAuth = true;
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
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
        <Routes>
          {/* <Route index element={<Home />} /> */}
          <Route path="/" element={isAuth ? <AppLayout /> : <Home />}>
            <Route path="/" element={<FeedPage />} />
            <Route path="settings" element={<Settings />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
