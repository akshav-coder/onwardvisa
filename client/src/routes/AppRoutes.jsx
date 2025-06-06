import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import CheckoutPage from "../components/common/CheckoutPage";
import ThankYouPage from "../pages/ThankYouPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
    </Routes>
  );
};

export default AppRoutes;
