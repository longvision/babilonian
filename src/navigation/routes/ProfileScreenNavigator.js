import { createStackNavigator } from 'react-navigation-stack';

import AddPet from '~/pages/AddPet';
import AddHotel from '~/pages/AddHotel';
import Profile from '~/pages/Profile';

const ProfileScreenNavigator = createStackNavigator(
  {
    AddPet: {
      screen: AddPet
    },
    AddHotel: {
      screen: AddHotel
    },
    Profile: {
      screen: Profile
    }
  },
  {
    cardStyle: { backgroundColor: '#48285b' }
  }
);

export default ProfileScreenNavigator;
