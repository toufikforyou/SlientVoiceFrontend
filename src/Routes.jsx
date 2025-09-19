import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Authentication/Login/Login";
import PrivateRoute from "./Protected/PrivateRoute";
import PostDetails from "./Pages/PostDetails/PostDetails";

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
        {
          path:"/postDetails",
          element:<PostDetails/>
        }                            
        
    ]
  },
  {
    path: "/auth",
    element:<Login/>
  },
]);