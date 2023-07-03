import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AppProvider } from "./Components/context";
import Home from "./pages/Homepage";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import CheckoutPage from "./pages/Checkout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { MenuProvider } from "./contexts/MenuContext";

const getToken = () => {
  // Replace this with your logic to retrieve the token from local storage or any other source
  return localStorage.getItem("token");
};

const App = () => {
  const token = getToken();

  return (
    <div className="app">
      <MenuProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            {token ? (
              <>
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:slug" element={<ProductDetail />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/admin_dashboard" element={<Dashboard />} />
              </>
            ) : (
              <Route path="/login" element={<Login />} />
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </MenuProvider>
    </div>
  );
};

export default App;
