import {lazy} from "react";
import {RouteObject, Navigate} from "react-router-dom";
import {NotFound} from "@/pages/404";
import {NotAuth} from "@/pages/401";
// const LayoutCom = lazy(() => import('@/layout/index'));
// const Login = lazy(() => import('@/pages/Login'));
// const Home = lazy(() => import('@/pages/Home'));
// const System = lazy(() => import('@/pages/System'));
// const User = lazy(() => import('@/pages/System/User'));
// const Role = lazy(() => import('@/pages/System/Role'));
// const PrivateRoute = lazy(()=>import('@/router/PrivateRoute/index'))
// const MicroRoute = lazy(()=>import('@/router/MicroRoute/index'))

import LayoutCom from "@/layout";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import System from "@/pages/System";
import User from "@/pages/System/User";
import Role from "@/pages/System/Role";
import PrivateRoute from "@/router/PrivateRoute/index";
import MicroRoute from "@/router/MicroRoute/index";

const routerConfig: RouteObject[] = [
  {path: "/", element: <Navigate to="/home" replace/>},
  {
    path: "/", element: <PrivateRoute component={LayoutCom} />,
    children: [
      {path: 'home', element: <Home/>},
      {
        path: 'system', element: <System/>,
        children: [
          {path: 'user', element: <User/>},
          {path: 'role', element: <Role/>},
        ]
      },
      {path:'*',element:<MicroRoute />}
    ]
  },
  {path: "/login", element: <Login/>},
  {path: "/401", element: <NotAuth/>},
  {path: "*", element: <NotFound />},
]
export default routerConfig

