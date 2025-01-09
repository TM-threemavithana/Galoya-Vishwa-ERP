import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./layout/Navbar";
import { fetchUser } from "./store/slices/userSlice";

// Pages
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserProfile from "./pages/UserProfile";
import HeroSection from "./pages/Home";
import MainHomePage from "./pages/MainHomePage";
import Delivery from "./pages/Delivery";
import StockManagement from "./pages/StockManagement";
import ResourceManagement from "./pages/ResourceManagement";
import Vehicle from "./pages/Vehicle";
import Footer1 from "./components/Footer";
import Machine from "./pages/Machine";
import Sidebar from "./components/Sidebar";
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";
import ManageProducts from "./pages/ManageProducts";
import ManageSales from "./pages/ManageSales";
import { ProductProvider } from "./context/ProductContext";
import Productions from "./pages/Productions";
import InventorySidebar from "./pages/inventoryManagement/InventorySidebar";
import InventoryDashboard from "./pages/inventoryManagement/InventoryDashboard";
import AddInventories from "./pages/inventoryManagement/InventoryManagementassets/AddInventories";
import DailyDistribution from "./pages/inventoryManagement/InventoryManagementassets/DailyDistribution";
import DailyStockReduce from "./pages/inventoryManagement/InventoryManagementassets/DailyStockReduce";
import InventoryManagement from "./pages/InventoryManagement";

import CalcDashbord from "./pages/DailyBussinesCalc/CalcDashbord";
import Calculator from "./pages/DailyBussinesCalc/Calculator";
import DistributedList from "./pages/DailyBussinesCalc/DistributedList";
import CreditSale from "./pages/DailyBussinesCalc/CreditSale";
import BusinessRecords from "./pages/DailyBussinesCalc/BusinessRecords";
import CalcSidebar from "./pages/DailyBussinesCalc/CalcSidebar";
import CalcReports from "./pages/DailyBussinesCalc/ShopDetails";



import PendingCalculations from "./pages/DailyBussinesCalc/PendingCalculations";

import MachineDashbord from "./pages/MachineMaintanance/MachineDashbord";
import MachineSidebar from "./pages/MachineMaintanance/MachineSidebar";
import MachineRepair from "./pages/MachineMaintanance/MachineRepair";
import MachineDetails from "./pages/MachineMaintanance/MachineDetails";
import MachineReports from "./pages/MachineMaintanance/MachineReports";

import VehicleSidebar from "./pages/VehicleManagement/VehicleSidebar";
import VehicleDetails from "./pages/VehicleManagement/VehicleDetails";
import VehicleRepair from "./pages/VehicleManagement/VehicleRepair";
import VehicleReports from "./pages/VehicleManagement/VehicleReports";
import VehicleMaintenance from "./pages/VehicleManagement/VehicleMaintenance";

const App = () => {
  const dispatch = useDispatch();

  // Fetch user details on app load
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Router>
      <ProductProvider>
        <MainAppContent />
      </ProductProvider>
    </Router>
  );
};

const MainAppContent = () => {
  const location = useLocation();

  // Centralized route configuration
  const routes = [
    { path: "/", element: <HeroSection /> },
    { path: "/sign-up", element: <SignUp /> },
    { path: "/login", element: <Login /> },
    { path: "/how-it-works-info", element: <HowItWorks /> },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <Contact /> },
    { path: "/me", element: <UserProfile /> },
    { path: "/mainhomepage", element: <MainHomePage /> },
    { path: "/delivery", element: <Delivery /> },
    { path: "/resource", element: <ResourceManagement /> },
    { path: "/stock", element: <StockManagement />, withSidebar: true },
    { path: "/vehicle", element: <Vehicle />, withSidebar: true },
    { path: "/machine", element: <Machine />, withSidebar: true },
    { path: "/add-product", element: <AddProduct />, withSidebar: true },
    { path: "/manage-products", element: <ManageProducts /> },
    { path: "/dashboard", element: <Dashboard />, withSidebar: true },
    { path: "/manage-sales", element: <ManageSales />, withSidebar: true },
    { path: "/productions", element: <Productions />, withSidebar: true },
    { path: "/profile", element: <UserProfile />, withSidebar: true },

    { path: "/inventories", element: <AddInventories />, withInventorySidebar: true },
    { path: "/inventory-dashboard", element: <InventoryDashboard />, withInventorySidebar: true },
    { path: "/daily-distribution", element: <DailyDistribution />, withInventorySidebar: true },
    { path: "/daily-reduce", element: <DailyStockReduce />, withInventorySidebar: true },
    { path: "/inventory-record", element: <InventoryManagement />, withInventorySidebar: true },
    { path: "/products", element: <AddProduct />, withInventorySidebar: true },

    { path: "/calc-dashboard", element: <CalcDashbord />, withCalcSidebar: true },
    { path: "/pending-cal", element: <PendingCalculations />, withCalcSidebar: true },
    { path: "/calc-records", element: <BusinessRecords />, withCalcSidebar: true },
    { path: "/credit-sales", element: <CreditSale />, withCalcSidebar: true },
    { path: "/calc-reports", element: <CalcReports />, withCalcSidebar: true },
    { path: "/calculator", element: <Calculator />, withCalcSidebar: true },
    { path: "/distributed-list", element: <DistributedList />, withCalcSidebar: true },

    { path: "/machine-dashboard", element: <MachineDashbord />, withMachineSidebar: true },
    { path: "/machine-repair", element: <MachineRepair />, withMachineSidebar: true },
    { path: "/machine-details", element: <MachineDetails />, withMachineSidebar: true },
    { path: "/machine-reports", element: <MachineReports />, withMachineSidebar: true },

    { path: "/vehicle-details", element: <VehicleDetails />, withVehicleSidebar: true },
    { path: "/vehicle-repair", element: <VehicleRepair />, withVehicleSidebar: true },
    { path: "/vehicle-reports", element: <VehicleReports />, withVehicleSidebar: true },
    { path: "/vehicle-maintenance", element: <VehicleMaintenance />, withVehicleSidebar: true },
  ];

  // Pages where Footer should not appear
  const noFooterPaths = [
    "/add-product",
    "/products",
    "/adjustments",
    "/inventory",
    "/categories",
    "/suppliers",
    "/reports",
    "/profile",
    "/dashboard",
    "/vehicle",
    "/machine",
    "/manage-products",
    "/manage-sales",
    "/productions",
    "/shop-details",

    "/calculator",
    "/CalcSidebar",
    "/BusinessRecords",
    "/CreditSale",
    "/CalcReports",
    "/calc-dashboard",
    "/pending-cal",

    "/inventory-dashboard",

    "/vehicle-details",
    "/vehicle-repair",
    "/vehicle-reports",
    "/vehicle-maintenance",
    "/inventories",
    "/daily-distribution",
    "/daily-reduce",
    "/inventory-record",
    "/machine-dashboard",
    "/machine-repair",
    "/machine-dashboard",
    "/machine-details",
    "/machine-reports",
    "/inventory-dashboard",
    "/vehicle-details",
    "/vehicle-repair",
    "/vehicle-reports",
    "/vehicle-maintenance",
  ];

  const shouldShowFooter = !noFooterPaths.includes(location.pathname);

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow">
        <Routes>
          {routes.map(
            ({
              path,
              element,
              withSidebar,
              withInventorySidebar,
              withVehicleSidebar,
              withCalcSidebar,
              withMachineSidebar,
            }) => (
              <Route
                key={path}
                path={path}
                element={
                  withSidebar ? (
                    <div className="flex-center">
                      <Sidebar />
                      <div className="flex-center">{element}</div>
                    </div>
                  ) : withInventorySidebar ? (
                    <div className="flex">
                      <InventorySidebar />
                      <div className="flex-grow">{element}</div>
                    </div>
                  ) : withCalcSidebar ? (
                    <div className="flex">
                      <CalcSidebar />
                      <div className="flex-grow">{element}</div>
                    </div>
                  ) : withMachineSidebar ? (
                    <div className="flex">
                      <MachineSidebar />
                      <div className="flex-grow">{element}</div>
                    </div>
                  ) : withVehicleSidebar ? (
                    <div className="flex">
                      <VehicleSidebar />
                      <div className="flex-grow">{element}</div>
                    </div>
                  ) : (
                    element
                  )
                }
              />
            )
          )}
        </Routes>
      </main>
      {shouldShowFooter && <Footer1 />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </>
  );
};

export default App;