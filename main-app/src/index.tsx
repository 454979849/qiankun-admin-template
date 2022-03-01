import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.less';
import App from './App';
import Loading from "@/components/Loading";
import reportWebVitals from './reportWebVitals';
import qiankun from './qiankun'

import './mock/index'

ReactDOM.render(
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </BrowserRouter>,
  document.getElementById('root')
);

qiankun();
reportWebVitals();
