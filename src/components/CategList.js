import React from 'react';
import DelCategForm from './DelCategForm';

class CategList extends React.Component {
	
	componentWillMount(){
		this.setState({
			showDelCateg:false,
			toDel:-1
		});
	}
	
	showDelCateg(id){
		this.setState({
			showDelCateg:true,
			toDel:id
		});
	}
	
	hideDelCateg(){
		this.setState({
			showDelCateg:false,
			toDel:-1
		});
	}
	
  render() {
		const { categs, delCateg } = this.props;
		const { toDel, showDelCateg } = this.state;
		
		const delCategForm = showDelCateg ?
			<DelCategForm hideDelCateg={this.hideDelCateg.bind(this)}
				toDel={toDel} delCateg={delCateg} />
				: [];
		
		const categsList = categs.map((el)=>{
			return (
				<div className="row" key={el.id}>
					<div className="col-xs-2">
						<button onClick={() => {this.showDelCateg(el.id)}}>X</button>
					</div>
					<div className="col-xs-10">{el.name}</div>
				</div>
			);
		});
		
    return (
			<div>
				{delCategForm}
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
	delCateg: React.PropTypes.func.isRequired,
}

export default CategList;