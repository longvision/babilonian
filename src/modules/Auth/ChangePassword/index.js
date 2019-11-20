import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, Alert, Keyboard} from 'react-native';

import {TextInput, Button} from 'react-native-paper';
// import TextInputMask from 'react-native-text-input-mask'

import {getStatusBarHeight} from '~/services/getStatusBarHeight';
import {confirmPassword} from '~/services/authApi';
import globalStyles from '~/config/GlobalStyles';
import Colors from '~/config/Colors';
import {validCPF} from '~/services/validators';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authState: this.props.authState,
      modalShowing: false,
      loading: false,
      error: null,
      username: this.props.navigation.getParam('username', ''),
      code: '',
      password1: '',
      password2: '',
      user: null,
    };
  }

  static navigationOptions = {
    title: 'Criar nova senha',
    headerStyle: {
      backgroundColor: Colors.mainColor,
      marginTop: getStatusBarHeight(),
    },
    headerTintColor: Colors.white,
  };

  onConfirm = async () => {
    Keyboard.dismiss();
    if (
      !this.state.username ||
      !this.state.password1 ||
      !this.state.password2
    ) {
      this.setState({
        loading: false,
        error: 'Preencher todos os campos',
      });
      return;
    }
    if (this.state.username) {
      if (!validCPF(this.state.username)) {
        this.setState({
          loading: false,
          error: 'CPF inválido',
        });
        return;
      }
    }
    if (this.state.password1.length < 6) {
      this.setState({
        loading: false,
        error: 'Senha deve ter no mínimo 6 caracteres',
      });
      return;
    }
    if (this.state.password1 !== this.state.password2) {
      this.setState({
        loading: false,
        error: 'Senhas não batem. Repita a mesma senha',
      });
      return;
    }

    this.setState({loading: true, error: null});
    try {
      await confirmPassword(
        this.state.username,
        this.state.password1,
        this.state.code,
      );
      this.setState({loading: false, error: null});
      this.props.navigation.popToTop();
    } catch (err) {
      switch (err.name) {
        case 'CodeMismatchException':
          this.setState({
            loading: false,
            error: 'Código de confirmação inválido',
          });
          break;
        default:
          this.setState({loading: false, error: `Erro de conexão ${err}`});
      }
    }
  };

  render() {
    if (this.state.error !== null) {
      Alert.alert('Erro', this.state.error);
    }

    return (
      <View style={styles.container}>
        <View style={globalStyles.header}>
          <Text style={globalStyles.headerText}>
            Informe sua identificação, o código recebido e a nova senha
          </Text>
        </View>
        <View style={styles.signInForm}>
          <TextInput
            label="CPF"
            value={this.state.username}
            style={{marginBottom: 8}}
            onChangeText={text => this.setState({username: text, error: null})}
            // render={props => <TextInputMask {...props} mask='[000].[000].[000]-[00]' />}
          />
          <TextInput
            label="Código recebido"
            keyboardType={'numeric'}
            value={this.state.code}
            style={{marginBottom: 8}}
            onChangeText={text => this.setState({code: text, error: null})}
          />
          <TextInput
            label="Senha"
            value={this.state.password1}
            secureTextEntry
            style={{marginBottom: 8}}
            onChangeText={text => this.setState({password1: text, error: null})}
          />
          <TextInput
            label="Repetir a Senha"
            value={this.state.password2}
            secureTextEntry
            style={{marginBottom: 8}}
            onChangeText={text => this.setState({password2: text, error: null})}
          />
          <View style={styles.cmdContainer}>
            <Button
              mode="contained"
              icon="check"
              loading={this.state.loading}
              onPress={() =>
                this.onConfirm(
                  this.state.username,
                  this.state.password,
                  this.state.code,
                )
              }>
              Confirmar
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  cmdContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInForm: {
    marginTop: 10,
    marginLeft: '5%',
    marginRight: '5%',
  },
});

const mapStateToProps = state => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(ChangePassword);
