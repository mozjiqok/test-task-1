import React from 'react';
import EditGoodForm from './EditGoodForm';

class GoodsItem extends React.Component {
	
	componentWillMount(){
		this.setState({
			showEditGood:false
		});
	}
	
	showEditGood(action){
		this.setState({showEditGood:action});
	}
	
	editGoodClick(){
		this.showEditGood(true);
	}
	
  render() {
		const { good, editGood, categs } = this.props;
		const { showEditGood } = this.state;
		
		const editGoodForm = showEditGood ?
			<EditGoodForm showEditGood={this.showEditGood.bind(this)}
				editGood={editGood} categs={categs} good={good} />
			: [];
		
    return (
			<tr>
				<td>{editGoodForm}{good.id}</td>
				<td>{good.name}</td>
				<td>{good.cost}</td>
				<td>{good.price}</td>
				<td>
					<button className="btn btn-default">Удалить</button>
					<button className="btn btn-default"
						onClick={this.editGoodClick.bind(this)}
					>
						Изменить
					</button>
				</td>
			</tr>
    );
  }
	
}

GoodsItem.propTypes = {
	good: React.PropTypes.object.isRequired,
	editGood: React.PropTypes.func.isRequired,
	categs: React.PropTypes.array.isRequired
}

export default GoodsItem;