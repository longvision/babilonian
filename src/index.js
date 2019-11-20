import React, { useState, useEffect } from 'react';
import '~/config/ReactotronConfig';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { StatusBar, Button } from 'react-native';
// import Amplify, { Auth } from 'aws-amplify';

import config from '~/config/config';

import store from '~/redux';
import RootNavigation from '~/navigation/RootNavigation';

//Tema central da estilização do React-Native Paper
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.color,
    primary: '#ffdc00',
    accent: '#fee280',
    background: '#600029',
    surface: '#ffdc00',
    text: '#000',
    placeholder: '#fff'
  }
};

//Ponto de entrada da aplicação
export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar barStyle='light-content' backgroundColor='#670c85' />
        <RootNavigation />
      </PaperProvider>
    </Provider>
  );
}
