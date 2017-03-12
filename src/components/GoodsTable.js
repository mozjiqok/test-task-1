import React from 'react';
import GoodsItem from './GoodsItem';

class GoodsTable extends React.Component {
	
  render() {
		const { goods, editGood, delGood, categs } = this.props;
		const goodsList = goods.map((el)=>{
			return (
				<GoodsItem key={el.id} good={el} editGood={editGood} delGood={delGood}
					categs={categs}
				/>
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
	goods: React.PropTypes.array.isRequired,
	editGood: React.PropTypes.func.isRequired,
	delGood: React.PropTypes.func.isRequired,
	categs: React.PropTypes.array.isRequired
}

export default GoodsTable;