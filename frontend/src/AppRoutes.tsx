import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Homepage from "./pages/HomePage";
import AuthCallBackPage from "./pages/AuthCallBackPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Homepage />
          </Layout>
        }
      />
      <Route path="/auth-callback-page" element={<AuthCallBackPage />} />
      <Route path="/user-profile" element={<span>User Profile</span>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
