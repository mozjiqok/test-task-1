import React from 'react';

class CategList extends React.Component {
	
  render() {
		const { categs, delCateg } = this.props;
		const categsList = categs.map((el)=>{
			return (
				<div className="row" key={el.id}>
					<div className="col-xs-2">
						<button onClick={() => { delCateg(el.id) }}>X</button>
					</div>
					<div className="col-xs-10">{el.name}</div>
				</div>
			);
		});
		
    return (
			<div>
				{categsList}
				<div className="row">
					<div className="col-xs-2"></div>
					<div className="col-xs-10">Без категории</div>
				</div>
			</div>
    );
  }
	
}

CategList.propTypes = {
	categs: React.PropTypes.array.isRequired,
	delCateg: React.PropTypes.func.isRequired
}

export default CategList;