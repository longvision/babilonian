import React, { useRef, useState } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
// import {Auth} from 'aws-amplify';

import { useDispatch, useSelector } from 'react-redux';

import Background from '~/components/Background';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as AuthActions from '~/redux/actions/auth';
// import {signUpUser} from '~/services/authAmplifyApi';
import { validCPF } from '~/services/validators';

export default function SignUp({ navigation }) {
  const confirm = useSelector(state => state.auth.confirm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState(null);
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [confirmationCode, setConfirmationCode] = useState('');

  const dispatch = useDispatch();

  const passwordRef = useRef();
  const emailRef = useRef();

  validateConfirmationForm = () => {
    confirmationCode.length > 0;
  };

  userHasAuthenticated = auth => {
    dispatch(AuthActions.authenticated(auth));
  };

  onSignUp = async () => {
    Keyboard.dismiss();

    if (!email || !password || !confirmPassword) {
      setLoading(false);
      setError('Preencher todos os campos');
      return;
    }
    if (email) {
      if (!password) {
        setLoading(false);
        setError('Crie uma senha!');
        return;
      }
    }
    if (password.length < 8) {
      setLoading(false);
      setError('Senha deve ter no mínimo 8 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      setLoading(false);
      setError('Senhas não batem. Repita a mesma senha');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await Auth.signUp({
        username: email,
        password: password
      });
      setLoading(false);
      setError(null);
      // navigation.popToTop();

      // Alert.alert('Usuário criado');
      navigation.navigate('ConfirmUser', { email });
    } catch (err) {
      switch (err.name) {
        case 'emailExistsException':
          setLoading(false);
          setError('Email já existe com esse email');

          break;
        case 'UsernameExistsException':
          setLoading(false);
          setError('Usuário já existe com esse email');
          navigation.navigate('SignIn');
          break;
        case 'UserNotConfirmedException':
          setLoading(false);
          setError(null);
          setPassword('');
          navigation.navigate('ConfirmUser', { email });
          break;
        default:
          setLoading(false);
          setError(`Erro de conexão: ${err.name}`);
      }
    }
  };
  error !== null && Alert.alert('Erro', error);

  return (
    <Background>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        keyboardVerticalOffset={Platform.select({ ios: 70 })}
        contentContainerStyle={{ height: '95%' }}
        enabled>
        <View style={styles.form}>
          <View>
            <TextInput
              autoCorrect={false}
              autoCapitalize='none'
              mode='outlined'
              returnKeyType='next'
              onSubmitEditing={() => emailRef.current.focus()}
              label='Digite o seu e-mail'
              value={email}
              onChangeText={text => {
                setEmail(text);
                setError(null);
              }}
            />
            <TextInput
              autoCorrect={false}
              mode='outlined'
              autoCapitalize='none'
              returnKeyType='next'
              secureTextEntry
              label='Sua senha'
              ref={emailRef}
              onSubmitEditing={() => passwordRef.current.focus()}
              style={{ marginTop: 7 }}
              value={password}
              onChangeText={text => {
                setPassword(text);
                setError(null);
              }}
            />
            <TextInput
              autoCorrect={false}
              mode='outlined'
              autoCapitalize='none'
              returnKeyType='next'
              secureTextEntry
              label='Confirme sua senha'
              ref={passwordRef}
              style={{ marginTop: 7 }}
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                setError(null);
              }}
            />
            <TouchableOpacity
              style={{ paddingTop: 20 }}
              onPress={() => onSignUp(email, password)}>
              <Button
                mode='contained'
                style={{ height: 44, justifyContent: 'center' }}
                onPress={() => onSignUp(email, password)}>
                Criar conta
              </Button>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              flexDirection: 'row'
            }}
            onPress={() => navigation.navigate('SignIn')}>
            <Text size={15} style={{ marginTop: 45 }} color='#fff'>
              Fazer Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              flexDirection: 'row'
            }}
            onPress={() => navigation.navigate('ConfirmUser')}>
            <Text size={15} style={{ marginTop: 45 }} color='#fff'>
              Já possuo um código
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Background>
  );
}

SignUp.navigationOptions = () => ({
  title: 'Sociedade do Livro - Criar Conta',
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
    // alignItems: 'center',
    paddingTop: 100,
    flexDirection: 'column',
    marginHorizontal: 15
  }
});
