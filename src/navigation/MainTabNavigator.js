import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';

import SettingsScreenNavigator from '~/navigation/routes/SettingsScreenNavigator';
import MainScreenNavigator from '~/navigation/routes/MainScreenNavigator';
import AgendaScreenNavigator from '~/navigation/routes/AgendaScreenNavigator';
import ChatScreenNavigator from '~/navigation/routes/ChatScreenNavigator';
import ProfileScreenNavigator from '~/navigation/routes/ProfileScreenNavigator';

//3 Tabs principais da aplicação:
const TabNavigator = createMaterialBottomTabNavigator(
  {
    Main: {
      screen: MainScreenNavigator,
      navigationOptions: {
        title: 'Busque um Hotel',
        shifting: false,
        tabBarIcon: ({ focused }) => (
          <Icon
            name={'search'}
            type={'material'}
            color={focused ? '#FFE280' : '#c4c4c4'}
          />
        )
      }
    },
    Agenda: {
      screen: AgendaScreenNavigator,
      navigationOptions: {
        title: 'Minha Agenda',
        shifting: false,
        tabBarIcon: ({ focused }) => (
          <Icon
            name={'book'}
            type={'material'}
            color={focused ? '#FFE280' : '#c4c4c4'}
          />
        )
      }
    },
    Chat: {
      screen: ChatScreenNavigator,
      navigationOptions: {
        title: 'Mensagens',
        shifting: false,
        tabBarIcon: ({ focused }) => (
          <Icon
            name={'messages'}
            type={'material'}
            color={focused ? '#FFE280' : '#c4c4c4'}
          />
        )
      }
    },
    Profile: {
      screen: ProfileScreenNavigator,
      navigationOptions: {
        title: 'Meu Perfil',
        shifting: false,
        tabBarIcon: ({ focused }) => (
          <Icon
            name={'profile'}
            type={'material'}
            color={focused ? '#FFE280' : '#c4c4c4'}
          />
        )
      }
    },
    Settings: {
      screen: SettingsScreenNavigator,
      navigationOptions: {
        title: 'Ajustes',
        shifting: false,
        tabBarIcon: ({ focused }) => (
          <Icon
            name={'settings'}
            type={'material'}
            color={focused ? '#FFE280' : '#c4c4c4'}
          />
        )
      }
    }
  },
  {
    activeColor: '#FFE280',
    inactiveColor: '#c4c4c4',
    barStyle: {
      backgroundColor: '#5b2848'
    }
  }
);

export default createAppContainer(TabNavigator);
