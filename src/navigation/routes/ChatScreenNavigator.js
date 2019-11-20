import { createStackNavigator } from 'react-navigation-stack';

import Chat from '~/pages/Chat';

const ChatScreenNavigator = createStackNavigator(
  {
    Chat: {
      screen: Chat
    }
  },
  {
    cardStyle: { backgroundColor: '#48285b' }
  }
);

export default ChatScreenNavigator;
