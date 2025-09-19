import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Authentication/Login/Login";
import PrivateRoute from "./Protected/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    // errorElement:<Error></Error>,
    children: [
        {
            path:"/",
            element:<Home/>
        },                            
        
    ]
  },
  {
    path: "/auth",
    element:<Login/>
  },
]);