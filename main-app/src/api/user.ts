import request from '@/utils/request'

export const apiLogin = (data:any)=>
  request({
    url:'/api/login',
    method:'post',
    data
  })

export const apiGetMenus=()=> {
  console.log('apiGetMenus...')
  return request({
    url: '/api/menus',
    method: 'get'
  })
}

export const apiGetApps=()=>{
  console.log('apiGetApps...');
  return request({
    url:'/api/apps',
    method:'get'
  })
}
