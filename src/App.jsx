import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import RequestPage from "./components/product-component/RequestPage";
import ResponsePage from "./components/product-component/ResponsePage";
import CustomerCreatePage from "./pages/customer/CustomerCreatePage";
import CustomerListPage from "./pages/customer/CustomerListPage";
import VehicleCreatePage from "./pages/vehicle/VehicleCreatePage";
import VehicleListPage from "./pages/vehicle/VehicleListPage"; 

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/eligible" />} />
        <Route path="/eligible" element={<RequestPage />} />
        <Route path="/response" element={<ResponsePage />} />
        <Route path="/customers" element={<CustomerCreatePage />} />
        <Route path="/customers/view" element={<CustomerListPage />} />
        < Route path="/vehicles" element={<VehicleCreatePage />} />
        < Route path="/vehicles/view" element={<VehicleListPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;