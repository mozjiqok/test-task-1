import React from 'react';
import { connect } from 'react-redux';
import GoodsTable from './GoodsTable';
import CategList from './CategList';
import AddCategForm from './AddCategForm';
import { addCateg, delCateg } from '../actions/categActions';

class App extends React.Component {
	
	componentWillMount(){
		this.setState({
			showAddCateg:false,
			showAddGood:false
		});
	}
	
	showAddCateg(action){
		this.setState({showAddCateg:action});
	}
	
	addCategClick(){
		this.showAddCateg(true);
	}
	
  render() {
		const { goods, categs, addCateg, delCateg } = this.props;
		const { showAddCateg } = this.state;
		
		const addCategForm = showAddCateg ?
			<AddCategForm showAddCateg={this.showAddCateg.bind(this)}
				addCateg={addCateg} />
			: [];
		
    return (
      <div className="container">
				{addCategForm}
				<div className="appTop">
					<div className="appLogo">
						My-app
					</div>
					<div className="appTopButtons">
						<button>Добавить товар</button>
						<button onClick={this.addCategClick.bind(this)}>Добавить категорию</button>
					</div>
				</div>
				<div className="appBottom">
					<div className="appCategList">
						<CategList categs={categs} delCateg={delCateg} />
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
	categs: React.PropTypes.array.isRequired,
	addCateg: React.PropTypes.func.isRequired,
	delCateg: React.PropTypes.func.isRequired
}

function mapOrdersToProps(store) {
	return {
		goods: store.goods,
		categs: store.categs
	}
}

export default connect(mapOrdersToProps, { addCateg, delCateg })(App);