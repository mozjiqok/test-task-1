import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import { connect } from 'react-redux';
import { updateInfo, changePass, fetchUser, setAuthToken } from '../actions/userActions';
import isEmpty from 'lodash/isEmpty';

function validateInputPass(data) {
  var errors = {};
	if (("" + data.newp).length < 8) {
		errors.newp = 'Пароль должен быть минимум 8 символов';
	}
	else if (data.oldp === data.newp) {
    errors.newp = 'Пароль не изменился';
  }
  if (data.conf !== data.newp) {
    errors.conf = 'Пароль не совпадает с подтверждением';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}

function validateInputInfo(data,oData) {
  var errors = {};
	const fname = oData.fname ? oData.fname : '';
	const lname = oData.lname ? oData.lname : '';
	if ((fname === data.fname) && (lname === data.lname)) {
    errors.form = 'Информация не изменилась';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}

class UserProfilePage extends React.Component {
	
	componentWillMount(){
		this.props.fetchUser(this.setState.bind(this));
    this.setState({
			fname: (this.props.info.fname ? this.props.info.fname : ''),
			lname: (this.props.info.lname ? this.props.info.lname : ''),
      oldp: '',
      newp: '',
      conf: '',
      errors: {},
      success: 'Загрузка данных...',
      isLoading: false
    });
	}
	
	componentWillReceiveProps(newProps){
		this.setState({
			fname: (newProps.info.fname ? newProps.info.fname : ''),
			lname: (newProps.info.lname ? newProps.info.lname : '')
		});
	}

  isValidPass() {
    const { errors, isValid } = validateInputPass(this.state);
    if (!isValid) {
      this.setState({ errors, success: '' });
    }
    return isValid;
  }

  isValidInfo() {
    const { errors, isValid } = validateInputInfo(this.state, this.props.info);
    if (!isValid) {
      this.setState({ errors, success: '' });
    }
    return isValid;
  }

  onSubmitInfo(e) {
    e.preventDefault();
    if (this.isValidInfo()) {
			this.setState({ errors: {}, success: '', isLoading: true });
			const { fname, lname } = this.state;
			const { email } = this.props.info;
			this.props.updateInfo({email, fname, lname}, this.setState.bind(this));
		}
  }

  onSubmitPass(e) {
    e.preventDefault();
    if (this.isValidPass()) {
			this.setState({ errors: {}, success: '', isLoading: true });
			const { oldp, newp, conf } = this.state;
			const { email } = this.props.info;
			this.props.changePass({email, oldp, newp, conf}).then(
				(res) => {
					this.setState({
						success: res.data.success,
						isLoading: false,
						oldp: '',
						newp: '',
						conf: ''
					});
					setAuthToken({authToken:res.data.authToken,email});
				},
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
				<form onSubmit={this.onSubmitInfo.bind(this)}>
					<h1>Информация пользователя</h1>

					{ errors.form && <div className="alert alert-danger">{errors.form}</div> }
					{ success && <div className="alert alert-success">{success}</div> }

					<TextFieldGroup
						autoFocus={true}
						field="fname"
						label="Имя"
						value={fname}
						error={errors.fname}
						onChange={this.onChange.bind(this)}
					/>

					<TextFieldGroup
						field="lname"
						label="Фамилия"
						value={lname}
						error={errors.lname}
						onChange={this.onChange.bind(this)}
					/>

					<div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Сохранить</button></div>
					
				</form>
				<form onSubmit={this.onSubmitPass.bind(this)}>
				
					<h1>Сменить пароль</h1>

					<TextFieldGroup
						field="oldp"
						label="Старый пароль"
						value={oldp}
						error={errors.oldp}
						onChange={this.onChange.bind(this)}
						type="password"
					/>

					<TextFieldGroup
						field="newp"
						label="Новый пароль"
						value={newp}
						error={errors.newp}
						onChange={this.onChange.bind(this)}
						type="password"
					/>

					<TextFieldGroup
						field="conf"
						label="Новый пароль еще раз"
						value={conf}
						error={errors.conf}
						onChange={this.onChange.bind(this)}
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
  changePass: React.PropTypes.func.isRequired,
  fetchUser: React.PropTypes.func.isRequired
}

UserProfilePage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    info: state.user.info
  };
}

export default connect(mapStateToProps, { updateInfo, changePass, fetchUser })(UserProfilePage);
