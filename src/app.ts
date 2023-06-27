import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import './app.css'

import { System } from 'nfcreader-sdk';

function App({ children }: PropsWithChildren) {

  useLaunch(() => {
    console.log('App launched.')

    // 初始化 SDK
    // ...
    // 这里填写你自己的插件ID，否则无法进行调试
    // ...
    System.init('1687707670490');
  })

  // children 是将要会渲染的页面
  return children
}

export default App
