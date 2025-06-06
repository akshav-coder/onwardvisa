import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import CheckoutPage from "../components/common/CheckoutPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
};

export default AppRoutes;
