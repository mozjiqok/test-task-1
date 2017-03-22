import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import { connect } from 'react-redux';
import { updateInfo, changePass } from '../actions/userActions';
import isEmpty from 'lodash/isEmpty';

function validateInput(data) {
  var errors = {};

  if (("" + data.newp).length < 8) {
    errors.newp = 'Пароль должен быть минимум 8 символов';
  }

  if (data.conf !== data.newp) {
    errors.conf = 'Пароль не совпадает с подтверждением';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}


class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			fname: (props.info.fname ? props.info.fname : ''),
			lname:""+props.info.lname,
      oldp: '',
      newp: '',
      conf: '',
      errors: {},
      success: '',
      isLoading: false
    };

    this.onSubmitInfo = this.onSubmitInfo.bind(this);
    this.onSubmitPass = this.onSubmitPass.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmitInfo(e) {
    e.preventDefault();
		this.setState({ isLoading: true });
		const { fname, lname } = this.state;
		this.props.updateInfo({fname, lname}).then(
			(res) => this.setState({ success: res.data.success, isLoading: false }),
			(err) => this.setState({ errors: err.response.data.errors, isLoading: false })
		);
  }

  onSubmitPass(e) {
    e.preventDefault();
    if (this.isValid()) {
			this.setState({ errors: {}, isLoading: true });
			const { oldp, newp, conf } = this.state;
			this.props.changePass({oldp, newp, conf}).then(
				(res) => this.setState({ success: res.data.success, isLoading: false }),
				(err) => this.setState({ errors: err.response.data.errors, isLoading: false })
			);
		}
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { fname, lname, oldp, newp, conf, errors, success, isLoading } = this.state;

    return (
			<div className="col-md-offset-4 col-md-4">
				<form onSubmit={this.onSubmitInfo}>
					<h1>Информация пользователя</h1>

					{ errors.form && <div className="alert alert-danger">{errors.form}</div> }
					{ success && <div className="alert alert-success">{success}</div> }

					<TextFieldGroup
						autoFocus={true}
						field="fname"
						label="Имя"
						value={fname}
						error={errors.fname}
						onChange={this.onChange}
					/>

					<TextFieldGroup
						field="lname"
						label="Фамилия"
						value={lname}
						error={errors.lname}
						onChange={this.onChange}
					/>

					<div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Сохранить</button></div>
					
				</form>
				<form onSubmit={this.onSubmitPass}>
				
					<h1>Сменить пароль</h1>

					<TextFieldGroup
						field="oldp"
						label="Старый пароль"
						value={oldp}
						error={errors.oldp}
						onChange={this.onChange}
						type="password"
					/>

					<TextFieldGroup
						field="newp"
						label="Новый пароль"
						value={newp}
						error={errors.newp}
						onChange={this.onChange}
						type="password"
					/>

					<TextFieldGroup
						field="conf"
						label="Новый пароль еще раз"
						value={conf}
						error={errors.conf}
						onChange={this.onChange}
						type="password"
					/>

					<div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Изменить</button></div>
				</form>
			</div>
    );
  }
}

UserProfilePage.propTypes = {
  updateInfo: React.PropTypes.func.isRequired,
  changePass: React.PropTypes.func.isRequired
}

UserProfilePage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    info: state.user.info
  };
}

export default connect(mapStateToProps, { updateInfo, changePass })(UserProfilePage);
