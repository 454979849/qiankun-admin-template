import {lazy} from "react";
import {RouteObject, Navigate} from "react-router-dom";
import NotFound from "@/pages/404";
import NotAuth from "@/pages/401";
//使用lazy后，qiankun报错，暂时不适用lazy，后续优化
// const LayoutCom = lazy(() => import('@/layout/index'));
// const Menu1 = lazy(() => import('@/pages/Menu1'));
// const Menu2 = lazy(() => import('@/pages/Menu2'));
// const Level1 = lazy(() => import('@/pages/Menu2/Level1'));
// const Level2 = lazy(() => import('@/pages/Menu2/Level2'));
// const PrivateRoute = lazy(()=>import('@/router/PrivateRoute'))
import LayoutCom from '@/layout/index';
import Menu1 from '@/pages/Menu1';
import Menu2 from '@/pages/Menu2';
import Level1 from '@/pages/Menu2/Level1';
import Level2 from '@/pages/Menu2/Level2';
import PrivateRoute from '@/router/PrivateRoute';

const routerConfig: RouteObject[] = [
  {path: "/", element: <Navigate to="/menu1" replace />},
  {
    path: "/", element: <PrivateRoute component={LayoutCom} />,
    children: [
      {path: 'menu1', element: <Menu1 />},
      {
        path: 'menu2', element: <Menu2 />,
        children: [
          {path: 'level1', element: <Level1 />},
          {path: 'level2', element: <Level2 />},
        ]
      },
    ]
  },
  {path: "/401", element: <NotAuth />},
  {path: "*", element: <NotFound />},
]
export default routerConfig

