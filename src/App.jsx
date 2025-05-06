import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Home from "./pages/Home";
import AppLayout from "./UI/AppLayout";
import FeedPage from "./pages/FeedPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PageNotFound from "./pages/PageNotFound";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
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
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<AppLayout />}>
            <Route path="feed" element={<FeedPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
