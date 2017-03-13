import React from 'react';
import GoodsItem from './GoodsItem';

class GoodsTable extends React.Component {
	
  render() {
		const { goods, editGood, delGood, categs, filter } = this.props;
		var fltrGoods = goods;
		
		if(filter === -1){
			const categIds = categs.map((el) => {
				return el.id;
			});
			fltrGoods = goods.filter((el) => {
				return categIds.indexOf(el.categ) === -1;
			});
		}
		else{
			fltrGoods = goods.filter((el) => {
				if(filter === 0){
					return true;
				}
				return el.categ === filter;
			});
		}
		const goodsList = fltrGoods.map((el)=>{
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