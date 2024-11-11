import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/App.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ChakraProvider } from '@chakra-ui/react'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
  <Provider store={store}>
    <ChakraProvider>
    <App />
    </ChakraProvider>
  </Provider>
  </>,
)
