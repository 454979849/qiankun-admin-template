import {urlParse} from "@/utils";

export const checkLogin =():void =>{
  const paramsObj = urlParse();
  if(!localStorage.token && !paramsObj.token){
    const url = (window as any).location.href;
    const mainAppOrigin = process.env.REACT_APP_MAIN_APP_ORIGIN+'/login';
    (window as any).location.href=mainAppOrigin+'?redirect='+encodeURIComponent(url);
  }else{
    if(paramsObj.token){
      localStorage.setItem('token',paramsObj.token);
      let newUrl = '';
      const hash = window.location.hash;
      if(Object.keys(paramsObj).length===1){
        newUrl=window.location.origin+window.location.pathname+hash;
      }else{
        let search='';
        for(let key in paramsObj){
          if(search===''){
            search+=`?${key}=${paramsObj[key]}`
          }else{
            search+=`&${key}=${paramsObj[key]}`
          }
        }
        newUrl=window.location.origin+window.location.pathname+search+hash;
      }
      window.location.href=newUrl;
    }
  }

}
