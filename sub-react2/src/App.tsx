import React from 'react';
import {Provider} from 'react-redux'
// import {Navigate, useNavigate,useLocation} from "react-router-dom";
import store from '@/store'
import Router from '@/router'


function App() {

  return <Provider store={store}>
    <Router></Router>
  </Provider>;
}

export default App;
