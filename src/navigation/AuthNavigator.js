import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import SignIn from '~/modules/Auth/SignIn';
import SignUp from '~/modules/Auth/SignUp';
import ConfirmUser from '~/modules/Auth/ConfirmUser';
import ForgotPassword from '~/modules/Auth/ForgotPassword';
import ChangePassword from '~/modules/Auth/ChangePassword';

const AuthNavigatior = createSwitchNavigator({
  SignIn: {
    screen: SignIn,
  },
  SignUp: {
    screen: SignUp,
  },
  ConfirmUser: {
    screen: ConfirmUser,
  },
  ForgotPassword: {
    screen: ForgotPassword,
  },
  ChangePassword: {
    screen: ChangePassword,
  },
});
const AppContainer = createAppContainer(AuthNavigatior);

export default AppContainer;
