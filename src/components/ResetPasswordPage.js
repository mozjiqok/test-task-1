import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/userActions';
import isEmpty from 'lodash/isEmpty';

function validateInput(data) {
  var errors = {};
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(data.email)) {
    errors.email = 'Неверный формат';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}


class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: {},
			success: false,
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
			const { email } = this.state;
      this.props.resetPassword({email}).then(
        (res) => this.setState({ success: true, isLoading: false }),
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, email, isLoading, success } = this.state;

    return (
			<div className="col-md-offset-4 col-md-4">
				<form onSubmit={this.onSubmit}>
					<h1>Сброс пароля</h1>

					{ errors.form && <div className="alert alert-danger">{errors.form}</div> }
					{ success && <div className="alert alert-success">Новый пароль отправлен на почту</div> }

					<TextFieldGroup
						autoFocus={true}
						field="email"
						label="Email"
						value={email}
						error={errors.email}
						onChange={this.onChange}
					/>

					<div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Сбросить пароль</button></div>
				</form>
			</div>
    );
  }
}

ResetPasswordPage.propTypes = {
  resetPassword: React.PropTypes.func.isRequired,
}

export default connect(null, { resetPassword })(ResetPasswordPage);
