import React from 'react';
import EditGoodForm from './EditGoodForm';
import DelGoodForm from './DelGoodForm';

class GoodsItem extends React.Component {
	
	componentWillMount(){
		this.setState({
			showEditGood:false,
			showDelGood:false
		});
	}
	
	showEditGood(action){
		this.setState({showEditGood:action});
	}
	
	showDelGood(action){
		this.setState({showDelGood:action});
	}
	
  render() {
		const { good, editGood, categs, delGood } = this.props;
		const { showEditGood, showDelGood } = this.state;
		
		const delGoodForm = showDelGood ?
			<DelGoodForm showDelGood={this.showDelGood.bind(this)}
				good={good} delGood={delGood} />
			: [];
		
		const editGoodForm = showEditGood ?
			<EditGoodForm showEditGood={this.showEditGood.bind(this)}
				editGood={editGood} categs={categs} good={good} />
			: [];
		
    return (
			<tr>
				<td>{delGoodForm}{editGoodForm}{good.id}</td>
				<td>{good.name}</td>
				<td>{good.cost}</td>
				<td>{good.price}</td>
				<td>
					<button className="btn btn-default"
						onClick={() => this.showDelGood(true)}
					>
						Удалить
					</button>
					<button className="btn btn-default"
						onClick={() => this.showEditGood(true)}
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
	delGood: React.PropTypes.func.isRequired,
	categs: React.PropTypes.array.isRequired
}

export default GoodsItem;