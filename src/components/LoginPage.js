import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import { connect } from 'react-redux';
import { login } from '../actions/userActions';
import isEmpty from 'lodash/isEmpty';

function validateInput(data) {
  var errors = {};
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(data.login)) {
    errors.login = 'Неверный формат';
  }

  if (("" + data.pass).length < 1) {
    errors.pass = 'Это обязательное поле';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      pass: '',
      errors: {},
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
			const { login, pass } = this.state;
      this.props.login(login, pass).then(
        (res) => this.context.router.push('/app'),
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, login, pass, isLoading } = this.state;

    return (
			<div className="col-md-offset-4 col-md-4">
				<form onSubmit={this.onSubmit}>
					<h1>Вход в систему</h1>

					{ errors.form && <div className="alert alert-danger">{errors.form}</div> }

					<TextFieldGroup
						autoFocus={true}
						field="login"
						label="Email"
						value={login}
						error={errors.login}
						onChange={this.onChange}
					/>

					<TextFieldGroup
						field="pass"
						label="Пароль"
						value={pass}
						error={errors.pass}
						onChange={this.onChange}
						type="password"
					/>

					<div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Войти</button></div>
				</form>
			</div>
    );
  }
}

LoginPage.propTypes = {
  login: React.PropTypes.func.isRequired
}

LoginPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(LoginPage);
