import React from 'react'
import {Provider} from 'react-redux'
import store from './src/store'
import RootRouter from './src/RootRouter'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootRouter />
      </Provider>
    )
  }
}
