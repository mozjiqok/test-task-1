import React from 'react';
import { connect } from 'react-redux';
import GoodsTable from './GoodsTable';
import CategList from './CategList';

class App extends React.Component {
	
  render() {
		const { goods, categs } = this.props;
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
					<div className="appCategList">
						<CategList categs={categs} />
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
	goods: React.PropTypes.array.isRequired,
	categs: React.PropTypes.array.isRequired
}

function mapOrdersToProps(store) {
	return {
		goods: store.goods,
		categs: store.categs
	}
}

export default connect(mapOrdersToProps)(App);