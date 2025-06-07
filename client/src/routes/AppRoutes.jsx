import { useRoutes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import CheckoutPage from "../components/common/CheckoutPage";
import ThankYouPage from "../pages/ThankYouPage";
import TermsOfService from "../components/common/TermsOfService";
import PublicLayout from "../layouts/PublicLayout";

const AppRoutes = () => {
  const routes = [
    { path: "/", element: <MainPage /> },
    {
      element: <PublicLayout />, // Header and Footer for common pages
      children: [
        { path: "checkout", element: <CheckoutPage /> },
        { path: "thank-you", element: <ThankYouPage /> },
        { path: "terms-condition", element: <TermsOfService /> },
      ],
    },
  ];
  return useRoutes(routes);
};

export default AppRoutes;
