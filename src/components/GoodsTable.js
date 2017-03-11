import React from 'react';
import GoodsItem from './GoodsItem';

class GoodsTable extends React.Component {
	
  render() {
		const { goods } = this.props;
		const goodsList = goods.map((el)=>{
			return (
				<GoodsItem key={el.id} good={el} />
			);
		});
		
    return (
      <div>
				<table className="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Название товара</th>
							<th>Цена/закуп</th>
							<th>Цена</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{goodsList}
					</tbody>
				</table>
      </div>
    );
  }
	
}

GoodsTable.propTypes = {
	goods: React.PropTypes.array.isRequired
}

export default GoodsTable;