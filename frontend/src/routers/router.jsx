import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/customer/Profile";
import OrderPage from "../pages/books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import Layout from "../pages/dashboard/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/Books/ManageBooks";
import AddBook from "../pages/dashboard/Books/AddBook";
import UpdateBook from "../pages/dashboard/Books/UpdateBook";
import RegisterCourier from "../pages/courier/RegisterCourier";
import CourierRoute from "./CourierRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/orders",
            element: <OrderPage/>
        },
        {
            path: "/about",
            element: <div>About</div>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/cart",
          element: <CartPage/>
        },
        {
          path: "/checkout",
          element: <PrivateRoute><CheckoutPage/></PrivateRoute> 
        },
        {
          path: "/books/:id",
          element: <SingleBook/>
        },
        {
          path: "/profile",
          element: <Profile/>
        },
        {
          path: "/apply-courier",
          element: <PrivateRoute><RegisterCourier/></PrivateRoute>
        }
      ]
    },
    {
      path: "/admin",
      element: <AdminLogin/>
    },
    {
      path: "/dashboard",
      element: <AdminRoute>
          <Layout/>
      </AdminRoute>,
      children: [
        {
          path: "",
          element: <AdminRoute><Dashboard/></AdminRoute>
        },
        {
          path: "add-new-book",
          element: <AdminRoute>
            <AddBook/>
          </AdminRoute>
        },
        {
          path: "edit-book/:id",
          element: <AdminRoute>
            <UpdateBook/>
          </AdminRoute>
        },
        {
          path: "manage-books",
          element: <AdminRoute>
            <ManageBooks/>
          </AdminRoute>
        }
      ]
    },
    {
      path: "/courier",
      element: <CourierRoute>
        <Layout />
      </CourierRoute>,
      children: [
        {
          path: "",
          element: <CourierRoute><Dashboard/></CourierRoute>
        },
      ]
    }
  ]);

export default router;
