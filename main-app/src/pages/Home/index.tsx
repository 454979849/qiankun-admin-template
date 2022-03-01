import React, {useCallback} from 'react';
import styles from './index.less'
import {useNavigate} from "react-router-dom";

const Home: React.FC = () => {
  const navigate =useNavigate();
  const showSubApp = useCallback((rule)=>{
    navigate(rule);
    // console.log('hhh',history,rule);
    // history.pushState(null,rule,rule)
  },[])
  return  <div className={styles.home}>
    <div className={styles['sub-app-card']} onClick={()=>{showSubApp('/sub-react')}}>sub-react</div>
    <div className={styles['sub-app-card']} onClick={()=>{showSubApp('/sub-react2')}}>sub-react2</div>
  </div>
};
export default Home
