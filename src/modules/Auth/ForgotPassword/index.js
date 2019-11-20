import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, Alert, Keyboard} from 'react-native';

// import TextInputMask from 'react-native-text-input-mask'
import {TextInput, Button} from 'react-native-paper';

import {getStatusBarHeight} from '~/services/getStatusBarHeight';
import {forgotPassword} from '~/services/authApi';
import globalStyles from '~/config/GlobalStyles';
import Colors from '~/config/Colors';
import {validCPF} from '~/services/validators';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authState: this.props.authState,
      modalShowing: false,
      loading: false,
      error: null,
      username: this.props.username || '',
      code: '',
      user: null,
    };
  }

  static navigationOptions = {
    title: 'Esqueci a senha',
    headerStyle: {
      backgroundColor: Colors.mainColor,
      marginTop: getStatusBarHeight(),
    },
    headerTintColor: Colors.white,
  };

  onConfirm = async () => {
    Keyboard.dismiss();
    if (!this.state.username) {
      this.setState({
        loading: false,
        error: 'Preencher o CPF',
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
    this.setState({loading: true, error: null});
    try {
      await forgotPassword(this.state.username);
      this.setState({loading: false, error: null});
      this.props.navigation.navigate('ChangePassword', {
        username: this.state.username,
      });
    } catch (err) {
      this.setState({loading: false, error: `Erro de conexão ${err.message}`});
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
            Informe o e-mail da conta para receber um código de autorização para
            criar nova senha
          </Text>
        </View>
        <View style={styles.signInForm}>
          <TextInput
            label="CPF"
            value={this.state.username}
            style={{marginBottom: 8, backgroundColor: Colors.white}}
            onChangeText={text => this.setState({username: text, error: null})}
            // render={props => (
            //   <TextInputMask {...props} mask='[000].[000].[000]-[00]' />
            // )}
          />
          <View style={styles.cmdContainer}>
            <Button
              mode="contained"
              style={globalStyles.button}
              icon="mail"
              loading={this.state.loading}
              onPress={() => this.onConfirm(this.state.username)}>
              Solicitar código
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
  signInForm: {
    marginTop: 10,
    marginLeft: '5%',
    marginRight: '5%',
  },
  cmdContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(ForgotPassword);
