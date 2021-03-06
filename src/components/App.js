import React from 'react';
import { connect } from 'react-redux';
import GoodsTable from './GoodsTable';
import CategList from './CategList';
import AddCategForm from './AddCategForm';
import AddGoodForm from './AddGoodForm';
import { addCateg, delCateg, fetchData } from '../actions/categActions';
import { addGood, delGood, editGood } from '../actions/goodActions';

class App extends React.Component {
	
	componentWillMount(){
		this.setState({
			showAddCateg:false,
			showAddGood:false,
			filter: 0,
			dbConnected: false
		});
		this.props.fetchData(this.dbConnOk.bind(this));
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
	
	setFilter(categ){
		this.setState({
			filter: parseInt(categ,10)
		});
	}
	
	dbConnOk(){
		this.setState({dbConnected:true});
	}
	
  render() {
		const { goods, categs, addCateg, addGood, delCateg, delGood, editGood, fetchingState } = this.props;
		const { showAddCateg, showAddGood, filter, dbConnected } = this.state;
		
		const addCategForm = showAddCateg ?
			<AddCategForm showAddCateg={this.showAddCateg.bind(this)}
				addCateg={addCateg} />
			: [];
		
		const addGoodForm = showAddGood ?
			<AddGoodForm showAddGood={this.showAddGood.bind(this)}
				addGood={addGood} categs={categs} />
			: [];
		
		const fetchScreen = fetchingState ?
			<div className="modal">
				<div className="modal-dialog modal-sm">
					<div className="modal-content">
						<div className="modal-body text-center">
							Сохранение...
						</div>
					</div>
				</div>
			</div>
			: [];
			
		const bottomPart = dbConnected ? 
			<div className="appBottom">
				<div className="appCategList">
					<CategList categs={categs} delCateg={delCateg}
						setFilter={this.setFilter.bind(this)}
					/>
				</div>
				<div className="appGoods">
					<GoodsTable goods={goods} delGood={delGood} editGood={editGood}
						categs={categs} filter={filter}
					/>
				</div>
			</div>
			: <div>Подключение...</div>;
		
    return (
      <div className="container">
				{fetchScreen}
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
				{bottomPart}
      </div>
    );
  }
	
}

App.propTypes = {
	goods: React.PropTypes.array.isRequired,
	categs: React.PropTypes.array.isRequired,
	fetchingState: React.PropTypes.bool.isRequired,
	addCateg: React.PropTypes.func.isRequired,
	delCateg: React.PropTypes.func.isRequired,
	addGood: React.PropTypes.func.isRequired,
	delGood: React.PropTypes.func.isRequired,
	editGood: React.PropTypes.func.isRequired,
	fetchData: React.PropTypes.func.isRequired
}

function mapStoreToProps(store) {
	return {
		goods: store.goods,
		categs: store.categs,
		fetchingState: store.fetchingState
	}
}

export default connect(mapStoreToProps, { addCateg, delCateg, addGood, delGood, editGood, fetchData })(App);