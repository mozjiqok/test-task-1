import React from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/login');
      }
    }

    render() {
			if(this.props.authenticated){
				return (
					<ComposedComponent {...this.props} />
				);
			}
			else{
				return (<div></div>);
			}
    }
  }

  Authenticate.propTypes = {
    authenticated: React.PropTypes.bool.isRequired,
  }

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.user.authenticated
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
