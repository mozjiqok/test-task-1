import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';

class NavigationBar extends React.Component {
	
	componentWillMount(){
		this.setState({collapsed:true});
	}
	
	toggleMenu(){
		this.setState({collapsed:!this.state.collapsed});
	}
	
	hideMenu(){
		this.setState({collapsed:true});
	}
	
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { authenticated, info } = this.props.user;
		const { collapsed } = this.state;
		
		const navClass = collapsed ? '' : ' in';

    const userLinks = (
			<div onClick={this.hideMenu.bind(this)} className={"navbar-collapse collapse" + navClass}>
				<ul className="nav navbar-nav navbar-right">
					<li>
						<Link to="/profile">{info.email} <span className="glyphicon glyphicon-user"></span></Link>
					</li>
					<li>
						<a href="#" onClick={this.logout.bind(this)}>Выйти <span className="glyphicon glyphicon-log-out"></span></a>
					</li>
				</ul>
			</div>
    );

    const guestLinks = (
			<div onClick={this.hideMenu.bind(this)} className={"navbar-collapse collapse " + navClass}>
				<ul className="nav navbar-nav navbar-right">
					<li>
						<Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Войти</Link>
					</li>
					<li>
						<Link to="/reg"><span className="glyphicon glyphicon-registration-mark"></span> Регистрация</Link>
					</li>
				</ul>
			</div>
    );

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
					<div className="navbar-header">
						<Link to="/" className="navbar-brand">Главная</Link>
						<button type="button" className="navbar-toggle" onClick={this.toggleMenu.bind(this)}>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>                        
						</button>
					</div>
            { authenticated ? userLinks : guestLinks }
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  logout: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
