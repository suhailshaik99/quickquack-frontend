import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Home from "./pages/Home";
import AppLayout from "./UI/AppLayout";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import SignupPage from "./pages/SignupPage";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="/" element={<AppLayout />}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
