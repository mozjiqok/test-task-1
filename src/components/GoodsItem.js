import React from 'react';

class GoodsItem extends React.Component {
	
  render() {
		const { good } = this.props;
		
    return (
			<tr>
				<td>{good.id}</td>
				<td>{good.name}</td>
				<td>{good.cost}</td>
				<td>{good.price}</td>
				<td>
					<button className="btn btn-default">Удалить</button>
					<button className="btn btn-default">Изменить</button>
				</td>
			</tr>
    );
  }
	
}

GoodsItem.propTypes = {
	good: React.PropTypes.object.isRequired
}

export default GoodsItem;