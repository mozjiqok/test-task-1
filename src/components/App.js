import React from 'react';
import { connect } from 'react-redux';
import GoodsTable from './GoodsTable';

class App extends React.Component {
	
  render() {
		const { goods } = this.props;
    return (
      <div className="container">
				<div className="appTop">
					<div className="appLogo">
						My-app
					</div>
					<div className="appTopButtons">
						<button>Добавить товар</button>
						<button>Добавить категорию</button>
					</div>
				</div>
				<div className="appBottom">
					<div className="appCatList">
						Список категорий
					</div>
					<div className="appGoods">
						<GoodsTable goods={goods} />
					</div>
				</div>
      </div>
    );
  }
	
}

App.propTypes = {
	goods: React.PropTypes.array.isRequired
}

function mapOrdersToProps(store) {
	return {
		goods: store.goods
	}
}

export default connect(mapOrdersToProps)(App);