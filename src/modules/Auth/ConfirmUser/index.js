import React, { useRef, useState } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
// import {Auth} from 'aws-amplify';
import { TextInput, Text, Button } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import { getStatusBarHeight } from '~/services/getStatusBarHeight';
import Background from '~/components/Background';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as AuthActions from '~/redux/actions/auth';

export default function ConfirmUser({ navigation }) {
  // const confirm = useSelector(state => state.auth.confirm);

  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const emailRef = useRef();
  const codeRef = useRef();

  userHasAuthenticated = auth => {
    dispatch(AuthActions.authenticated(auth));
  };

  onConfirm = async (email, code) => {
    Keyboard.dismiss();

    if (!email || !code) {
      setLoading(false);
      setError('Preencher todos os campos');
      return;
    }
    if (email) {
      if (!code) {
        setLoading(false);
        setError('Preencha o código');
        return;
      }
    }
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      // await confirmUser({username: email}, code);
      await Auth.confirmSignUp(email, code);

      setLoading(false);
      setError(null);
      // navigation.popToTop();
      await Alert.alert('Código Confirmado');
      userHasAuthenticated(true);
      navigation.navigate('Books');
    } catch (err) {
      switch (err.name) {
        case 'CodeMismatchException':
          setLoading(false);
          setError('Código de confirmação inválido');
          setMessage(null);

          break;
        case 'InvalidParameterException':
          setLoading(false);
          setError('Informar email e código');
          setMessage(null);
          break;
        default:
          setLoading(false);
          setError('Erro de Conexão');
          setMessage(null);
      }
    }
  };
  onResend = async () => {
    Keyboard.dismiss();
    if (!email) {
      setLoading(false);
      setError('Informe o seu email');
      return;
    }
    try {
      // await resendCode({username: email});
      await Auth.resendSignUp(email);
      setLoading(false);
      setError(null);
      setMessage('Verifique o seu email');
      return;
    } catch (err) {
      setLoading(false);
      setError('Erro no envio de email ' + err.message);
      setMessage(null);
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
          <View>
            <Text>Entre com o código de confirmação recebido por email.</Text>
          </View>
          <View>
            <TextInput
              autoCorrect={false}
              autoCapitalize='none'
              mode='outlined'
              returnKeyType='next'
              onSubmitEditing={() => codeRef.current.focus()}
              label='Digite o seu e-mail'
              ref={emailRef}
              value={navigation.getParam('email', email)}
              onChangeText={setEmail}
            />
            <TextInput
              autoCorrect={false}
              autoCapitalize='none'
              mode='outlined'
              keyboardType={'numeric'}
              returnKeyType='next'
              label='Código recebido'
              ref={codeRef}
              value={code}
              onChangeText={setCode}
            />
            <TouchableOpacity
              style={{ paddingTop: 20 }}
              onPress={() => this.onConfirm(email, code)}>
              <Button
                mode='contained'
                icon='check'
                loading={loading}
                onPress={() => this.onConfirm(email, code)}>
                Confirmar
              </Button>
            </TouchableOpacity>
            <View>
              <Button
                mode='outlined'
                icon='refresh'
                style={{ marginTop: 15 }}
                loading={loading}
                onPress={() => onResend(email)}>
                Solicitar novo código
              </Button>
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
          </View>
        </View>
      </KeyboardAvoidingView>
    </Background>
  );
}

ConfirmUser.navigationOptions = {
  tabBarLabel: 'ConfirmUser',
  title: 'Confirmar Código',
  headerStyle: {
    backgroundColor: '#2b1348',
    marginTop: getStatusBarHeight()
  },
  headerTintColor: '#fff',
  tabBarIcon: ({ tintColor }) => (
    <Icon name='book' size={20} color={tintColor} />
  )
};

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
