import React, { useRef, useState } from 'react';
import {
  View,
  Dimensions,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput, Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import {Auth} from 'aws-amplify';
import Background from '~/components/Background';
import { TouchableOpacity } from 'react-native-gesture-handler';
import standards from '~/config/standards';
import * as AuthActions from '~/redux/actions/auth';
// import {signInUser} from '~/services/authApi';

export default function SignIn({ navigation }) {
  // const isAuthenticated = useSelector(state => state.auth.authenticated);
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  userHasAuthenticated = auth => {
    dispatch(AuthActions.authenticated(auth));
  };

  onSignIn = async () => {
    Keyboard.dismiss();
    if (!email) {
      setLoading(false);
      setError('Informar seu E-mail');
      return;
    }
    if (!password) {
      setLoading(false);
      setError('Informar sua senha');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signInUser(email, password);
      userHasAuthenticated(true);
      navigation.navigate('Books');

      setLoading(false);
      setError(null);
    } catch (err) {
      switch (err.name) {
        case 'NotAuthorizedException':
          setError('Usuário não autorizado.');
          setLoading(false);
          break;
        case 'UserNotFoundException':
          setLoading(false);
          setError('Email ou senha inválidos');
          break;
        case 'UserNotConfirmedException':
          setLoading(false);
          setError(null);
          setPassword('');
          navigation.navigate('ConfirmUser', { email });
          break;
        default:
          setLoading(false);
          setError('Erro de conexão. ' + err.name);
      }
    }
  };

  return (
    <Background>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        keyboardVerticalOffset={Platform.select({ ios: 70 })}
        contentContainerStyle={{ height: '95%' }}
        enabled>
        <View style={styles.form}>
          {loading ? <ActivityIndicator size='large' color='#9EFD63' /> : null}
          <TextInput
            style={{ marginTop: 25 }}
            autoCorrect={false}
            autoCapitalize='none'
            mode='outlined'
            returnKeyType='next'
            onSubmitEditing={() => passwordRef.current.focus()}
            label='Digite o seu e-mail'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            autoCorrect={false}
            mode='outlined'
            secureTextEntry
            icon='lock-outline'
            autoCapitalize='none'
            returnKeyType='send'
            label='Sua senha'
            ref={passwordRef}
            style={{ marginTop: 7 }}
            onSubmitEditing={() => this.onSignIn(email, password)}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={{ paddingTop: 20 }}
            onPress={() => this.onSignIn(email, password)}>
            <Button
              mode='contained'
              loading={loading}
              accessibilityLabel='Clique para entrar no sistema'
              style={{ height: 44, justifyContent: 'center' }}
              onPress={() => this.onSignIn(email, password)}>
              Entrar
            </Button>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              flexDirection: 'row'
            }}
            onPress={() => navigation.navigate('SignUp')}>
            <Text size={15} style={{ marginTop: 15 }} color='#fff'>
              Criar conta gratuita
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Background>
  );
}
SignIn.navigationOptions = () => ({
  title: 'Entrar no App',
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#2b1348'
  },
  tabBarIcon: ({ tintColor }) => (
    <Icon name='book' size={20} color={tintColor} />
  )
});
const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    marginHorizontal: 15
  }
});
