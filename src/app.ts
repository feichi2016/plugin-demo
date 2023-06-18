import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import './app.css'

import { System } from 'nfcreader-sdk';

function App({ children }: PropsWithChildren) {

  useLaunch(() => {
    console.log('App launched.')

    // 初始化 SDK
    System.init('demo123456789');
  })

  // children 是将要会渲染的页面
  return children
}

export default App
