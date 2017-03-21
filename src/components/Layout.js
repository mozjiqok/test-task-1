import React from 'react'
import NavigationBar from './NavigationBar'

class Layout extends React.Component {
  render() {
    return (
      <div className="container">
        <NavigationBar />
        {this.props.children}
      </div>
    );
  }
}
export default Layout;