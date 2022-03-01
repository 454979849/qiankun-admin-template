import { initGlobalState } from 'qiankun'
import store from "./index";
import {MicroAppStateActions} from "qiankun/es/interfaces";
import {IMenu} from "@/types";

interface IinitialState {
  subAppMenuList:IMenu[]
}

const initialState:IinitialState = {
  subAppMenuList:[]
}

const actions:any = initGlobalState(initialState);
actions.onGlobalStateChange((newState:IinitialState, prev:IinitialState) => {
  // state: 变更后的状态; prev 变更前的状态
  // console.log('main change', JSON.stringify(newState), JSON.stringify(prev))

  // for (const key in newState) {
  //   initialState[key] = newState[key]
  // }
})
// 定义一个获取state的方法下发到子应用
actions.getGlobalState = (key?:'subAppMenuList') => {
  // 有key，表示取globalState下的某个子级对象
  // 无key，表示取全部

  return key ? initialState[key] : initialState
}
export default actions
