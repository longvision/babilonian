import { createStackNavigator } from 'react-navigation-stack';

// import Books from '~/pages/Books';
import Settings from '~/pages/Settings';

const SettingsScreenNavigator = createStackNavigator(
  {
    Settings: {
      screen: Settings
    }
  },
  {
    cardStyle: { backgroundColor: '#48285b' }
  }
);

export default SettingsScreenNavigator;
