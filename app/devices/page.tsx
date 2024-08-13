import React from "react";
import ProtectedRoute from "../components/ProtectedRoutes";

type Props = {};

const DevicesPage = (props: Props) => {
  return (
    <ProtectedRoute>
      <div>DevicesPage</div>
    </ProtectedRoute>
  );
};

export default DevicesPage;
