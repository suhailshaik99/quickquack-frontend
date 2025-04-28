import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./UI/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<p>This is signup page.</p>} />
        <Route path="/" element={<AppLayout />}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
