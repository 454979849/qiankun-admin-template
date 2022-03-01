import React from 'react';
import { Button } from 'antd';
const Menu1: React.FC = () => {
  const toOhterApp =()=>{
    if ((window as any).__POWERED_BY_QIANKUN__){
      history.pushState(null,'/sub-react','/sub-react#/menu1')
    }else if(process.env.NODE_ENV==='production'){
      const mainAppOrigin = process.env.REACT_APP_MAIN_APP_ORIGIN;
      window.location.href = `${mainAppOrigin}/micro/sub-react#/menu1`;
    }
  }

  return <div>
    2号子应用Menu1页面
    <br/>
    <br/>
    <Button type="primary" onClick={toOhterApp}>跳转到 sub-react 子应用的首页</Button>

  </div>
};
export default Menu1
