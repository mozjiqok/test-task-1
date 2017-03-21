import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import { connect } from 'react-redux';
import { register } from '../actions/userActions';
import isEmpty from 'lodash/isEmpty';

function validateInput(data) {
  var errors = {};
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(data.email)) {
    errors.email = 'Неверный формат';
  }

  if (("" + data.pass).length < 8) {
    errors.pass = 'Пароль должен быть минимум 8 символов';
  }

  if (data.conf !== data.pass) {
    errors.conf = 'Пароль не совпадает с подтверждением';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}


class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      conf: '',
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
			const { email, pass, conf } = this.state;
      this.props.register({email, pass, conf}).then(
        (res) => this.context.router.push('/app'),
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, email, pass, conf, isLoading } = this.state;

    return (
			<div className="col-md-offset-4 col-md-4">
				<form onSubmit={this.onSubmit}>
					<h1>Регистрация</h1>

					{ errors.form && <div className="alert alert-danger">{errors.form}</div> }

					<TextFieldGroup
						autoFocus={true}
						field="email"
						label="Email"
						value={email}
						error={errors.email}
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

					<TextFieldGroup
						field="conf"
						label="Пароль еще раз"
						value={conf}
						error={errors.conf}
						onChange={this.onChange}
						type="password"
					/>

					<div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Отправить</button></div>
				</form>
			</div>
    );
  }
}

RegistrationPage.propTypes = {
  register: React.PropTypes.func.isRequired
}

RegistrationPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { register })(RegistrationPage);
