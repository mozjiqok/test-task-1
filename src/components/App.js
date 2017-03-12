import React from 'react';
import { connect } from 'react-redux';
import GoodsTable from './GoodsTable';
import CategList from './CategList';
import AddCategForm from './AddCategForm';
import AddGoodForm from './AddGoodForm';
import { addCateg, delCateg } from '../actions/categActions';
import { addGood, delGood, editGood } from '../actions/goodActions';

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
	
	showAddGood(action){
		this.setState({showAddGood:action});
	}
	
	addCategClick(){
		this.showAddCateg(true);
	}
	
	addGoodClick(){
		this.showAddGood(true);
	}
	
  render() {
		const { goods, categs, addCateg, addGood, delCateg, delGood, editGood } = this.props;
		const { showAddCateg, showAddGood } = this.state;
		
		const addCategForm = showAddCateg ?
			<AddCategForm showAddCateg={this.showAddCateg.bind(this)}
				addCateg={addCateg} />
			: [];
		
		const addGoodForm = showAddGood ?
			<AddGoodForm showAddGood={this.showAddGood.bind(this)}
				addGood={addGood} categs={categs} />
			: [];
		
    return (
      <div className="container">
				{addCategForm}
				{addGoodForm}
				<div className="appTop">
					<div className="appLogo">
						My-app
					</div>
					<div className="appTopButtons">
						<button className="btn btn-default" onClick={this.addGoodClick.bind(this)}>Добавить товар</button>
						<button className="btn btn-default" onClick={this.addCategClick.bind(this)}>Добавить категорию</button>
					</div>
				</div>
				<div className="appBottom">
					<div className="appCategList">
						<CategList categs={categs} delCateg={delCateg} />
					</div>
					<div className="appGoods">
						<GoodsTable goods={goods} delGood={delGood} editGood={editGood}
							categs={categs}
						/>
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
	delCateg: React.PropTypes.func.isRequired,
	addGood: React.PropTypes.func.isRequired,
	delGood: React.PropTypes.func.isRequired,
	editGood: React.PropTypes.func.isRequired
}

function mapStoreToProps(store) {
	return {
		goods: store.goods,
		categs: store.categs
	}
}

export default connect(mapStoreToProps, { addCateg, delCateg, addGood, delGood, editGood })(App);