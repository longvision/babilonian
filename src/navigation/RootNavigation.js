import React, { useEffect, useState } from 'react';
import TabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';
import { useSelector, useDispatch } from 'react-redux';
import * as AuthActions from '~/redux/actions/auth';
// import {Auth} from 'aws-amplify';

//Navegador principal simplificado pois autenticação não está habilitada.
//Seria importante caso usuário precisasse fazer login para ver certas telas.

export default function RootNavigation() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const [isAuthenticating, setIsAuthenticating] = useState(true);

  userHasAuthenticated = auth => {
    // dispatch(AuthActions.authenticated(auth));
  };

  async function getSession() {
    try {
      // await Auth.currentSession();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  }
  useEffect(() => {
    getSession();
    setIsAuthenticating(false);
  }, []);

  return !isAuthenticating && !isAuthenticated ? (
    <AuthNavigator />
  ) : (
    // return
    <TabNavigator />
  );
}
