import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AnalyticsProvider } from './firebase/analytics';

ReactDOM.render(
  <Provider store={store}>
    <AnalyticsProvider>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </AnalyticsProvider>
  </Provider>,
  document.getElementById('root')
);
