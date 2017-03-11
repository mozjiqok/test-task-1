import React from 'react';

class CategList extends React.Component {
	
  render() {
		const { categs } = this.props;
		const categsList = categs.map((el)=>{
			return (
				<li key={el.id}>{el.name}</li>
			);
		});
		
    return (
			<ul>
				{categsList}
			</ul>
    );
  }
	
}

CategList.propTypes = {
	categs: React.PropTypes.array.isRequired
}

export default CategList;