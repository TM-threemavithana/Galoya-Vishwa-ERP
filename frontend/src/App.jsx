import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import InventoryDashboard from "./pages/inventoryManagement/InventoryDashoboard";
import AddInventories from "./pages/inventoryManagement/InventoryManagementassets/AddInventories";
import DailyDistribution from "./pages/inventoryManagement/InventoryManagementassets/DailyDistribution";
import DailyStockReduce from "./pages/inventoryManagement/InventoryManagementassets/DailyStockReduce";
import InventoryManagement from "./pages/inventoryManagement/InventoryManagement";


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
    { path: "/inventory-record" , element: < InventoryManagement/>, withInventorySidebar: true },
  
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
    "/inventories",
    "/daily-distribution",
    "/daily-reduce",
    "/inventory-record" 
  ];

  const shouldShowFooter = !noFooterPaths.includes(location.pathname);

  return (
    <>
      <Navbar />
      <main className="flex flex-col ">
        <Routes>
          {routes.map(({ path, element, withSidebar, withInventorySidebar }) => (
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
                ) : (
                  element
                )
              }
            />
          ))}
        </Routes>
      </main>
      {shouldShowFooter && <Footer1 />}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
};

export default App;
