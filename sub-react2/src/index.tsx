import './public-path'
import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,BrowserRouter} from 'react-router-dom'
import './index.less';
import App from './App';
import Loading from "@/components/Loading";
import reportWebVitals from './reportWebVitals';
import {checkLogin} from "@/check-login";
import './mock/index'
import store from "./store";

checkLogin();

function render(props?:any){
  const container:any = props?.container;
  ReactDOM.render(
    // <BrowserRouter basename={(window as any).__POWERED_BY_QIANKUN__ ? '/sub-react' : '/'}>
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </HashRouter>,
    container ? container.querySelector('#root') : document.querySelector('#root')
  );
}



if (!(window as any).__POWERED_BY_QIANKUN__) {
  render();
}
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('sub-react222 bootstraped');
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props:any) {
  console.log('sub-react2 收到基座下发的能力：', props);
  props.actions.onGlobalStateChange((state:any, prev:any) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('sub-react2 子应用监听到共享状态改变了：',state, prev);
    const {subAppMenuList} = state;
    store.dispatch({type:'user/changeMenus',payload:subAppMenuList});
  },true);  //重点在于第二个参数 true
  // 可通过 props.getGlobalState() 获取基座下发的数据

  // props.setGlobalState({user: {name: ''}}) 改变全局的数据

  // props.onGlobalStateChange 监听全局数据的变化
  render(props);
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props:any) {
  console.log('sub-react222 unmount props',props);

  const { container } = props

  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'))
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props:any) {
  console.log('update props', props);
}



reportWebVitals();
