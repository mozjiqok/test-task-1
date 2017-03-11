import React from 'react';

class GoodsTable extends React.Component {
	
  render() {
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
						<tr>
							<td>Список товаров</td>
						</tr>
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