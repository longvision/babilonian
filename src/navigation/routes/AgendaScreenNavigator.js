import { createStackNavigator } from 'react-navigation-stack';

import Book from '~/pages/Book';
import Main from '~/pages/Main';
import Agenda from '~/pages/Agenda';

const AgendaScreenNavigator = createStackNavigator(
  {
    Book: {
      screen: Book
    },
    Main: {
      screen: Main
    },
    Agenda: {
      screen: Agenda
    }
  },
  {
    cardStyle: { backgroundColor: '#48285b' }
  }
);

export default AgendaScreenNavigator;
