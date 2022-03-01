import {RegistrableApp,ObjectType} from 'qiankun'
import actions from '@/store/qiankun'

let microApps:RegistrableApp<any>[] = [
  {
    name: 'sub-react',
    entry: process.env.REACT_APP_SUB_REACT as string,
    activeRule: '/sub-react',
    container: '#sub-app-container',
  },
  {
    name: 'sub-react2',
    entry: process.env.REACT_APP_SUB_REACT2 as string,
    activeRule: '/sub-react2',
    container: '#sub-app-container',
  },
]

let apps = microApps.map(item => {
  return {
    ...item,
    props:{
      actions
    }
    // props: {
    //   routerBase: item.activeRule,
    //   getGlobalState: store.getGlobalState,
    // }
  }
})

export default apps
