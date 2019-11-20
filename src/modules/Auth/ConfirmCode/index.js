import React, {useRef, useState} from 'react';
import {View, Dimensions, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {TextInput, Text, Button} from 'react-native-paper';

import {useDispatch, useSelector} from 'react-redux';

import Background from './node_modules/~/components/Background';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as AuthActions from './node_modules/~/store/actions/auth';

import {Auth} from 'aws-amplify';

export default function ConfirmCode({navigation}) {
  const confirm = useSelector(state => state.auth.confirm);
  const passwordRef = useRef();
  const emailRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  validateConfirmationForm = () => {
    return confirmationCode.length > 0;
  };

  userHasAuthenticated = auth => {
    dispatch(AuthActions.authenticated(auth));
  };

  handleConfirmationSubmit = async () => {
    setIsLoading(true);

    try {
      await Auth.confirmSignUp(email, confirmationCode);
      await Auth.signIn(email, password);

      this.userHasAuthenticated(true);
      // navigation.navigate('Books');
    } catch (err) {
      switch (err.name) {
        case 'CodeMismatchException':
          setIsLoading(false);
          setError('Código de confirmação inválido');
          break;
        case 'InvalidParameterException':
          setIsLoading(false);
          setError('Informar email e código');
          break;
        default:
          setIsLoading(false);
          setError('Erro de conexão.');
      }
    }
  };

  onResend = async () => {
    Keyboard.dismiss();
    if (!username) {
      setIsLoading(false);
      setError('Não informou o email');
      return;
    }
    try {
      await resendCode(username);
      setIsLoading(false);
      this.setState({
        error: null,
        message: 'Verifique seu email',
      });
    } catch (err) {
      setIsLoading(false);
      this.setState({
        error: 'Erro no envio de email ' + err.message,
        message: null,
      });
    }
  };

  return (
    <Background>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        keyboardVerticalOffset={Platform.select({ios: 70})}
        contentContainerStyle={{height: '95%'}}
        enabled>
        <View style={styles.form} onSubmit={this.handleConfirmationSubmit}>
          <View>
            <Text>Por favor veja o seu email para ver se o seu código.</Text>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              autoFocus
              keyboardType="numeric"
              mode="outlined"
              returnKeyType="next"
              value={confirmationCode}
              onChange={setConfirmationCode}
              onSubmitEditing={() => emailRef.current.focus()}
              label="Digite o código de confirmação"
            />
            <TouchableOpacity
              style={{paddingTop: 20}}
              onPress={this.handleConfirmationSubmit}
              disabled={!this.validateConfirmationForm()}>
              >
              <Button
                mode="contained"
                style={{height: 44, justifyContent: 'center'}}>
                Criar conta
              </Button>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
            }}
            onPress={() => navigation.navigate('Login')}>
            <View>
              <Text size={15} style={{marginTop: 15}} color="#fff">
                Já possuo uma conta
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Background>
  );
}

ConfirmCode.navigationOptions = () => ({
  title: 'Digitar meu Código',
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#2b1348',
  },
  tabBarIcon: ({tintColor}) => <Icon name="book" size={20} color={tintColor} />,
});
const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 100,
    flexDirection: 'column',
    marginHorizontal: 15,
  },
});
