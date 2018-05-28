import React from 'react'
import ReactDOM from 'react-dom'
import FileContainer from './container/File.jsx'

require('./css/index.styl')

const appInterface = {
  name: 'File',
  isRendered: false,
  renderApp: data => {
    return ReactDOM.render(
      <FileContainer data={data} />
      , document.getElementById(data.config.domContainer)
    )
  },
  hideApp: domId => {
    return ReactDOM.unmountComponentAtNode(document.getElementById(domId)) // returns bool
  }
}

module.exports = appInterface
