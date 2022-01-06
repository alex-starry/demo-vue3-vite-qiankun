import { registerMicroApps, start } from 'qiankun'

registerMicroApps([
  {
    name: 'rms',
    entry: '//localhost:9001',
    container: '#container',
    activeRule: '/rms',
  }
])

// 启动 qiankun
start()