import React from 'react'
import { render } from 'react-dom'

import App from './app'

render(<App userAgent={navigator.userAgent} />, document.getElementById('root'))

if (module.hot)
  module.hot.accept()