import { createStackNavigator } from 'react-navigation-stack';

import Main from '~/pages/Main';
import Book from '~/pages/Book';

import Agenda from '~/pages/Agenda';

const MainScreenNavigator = createStackNavigator(
  {
    Main: {
      screen: Main
    },
    Book: {
      screen: Book
    },
    Agenda: {
      screen: Agenda
    }
  },
  {
    cardStyle: { backgroundColor: '#48285b' }
  }
);

export default MainScreenNavigator;
