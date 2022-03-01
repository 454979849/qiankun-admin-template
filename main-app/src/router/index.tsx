import {useRoutes} from "react-router-dom";
import routerConfig from "./router-config";
function Router (){
  let element = useRoutes(routerConfig);
  return element;
}
export default Router
