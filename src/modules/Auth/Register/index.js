import React, {Component} from 'react';

import {View} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SignUp from '~/modules/Auth/ForgotPassword/Register/node_modules/~/modules/SignUp';
import ConfirmCode from '~/modules/Auth/ForgotPassword/Register/node_modules/~/modules/ConfirmCode';
// import { Container } from './styles';

class Register extends Component {
  render() {
    return newUser === null ? <SignUp /> : <ConfirmCode />;
  }
}

const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Register);
